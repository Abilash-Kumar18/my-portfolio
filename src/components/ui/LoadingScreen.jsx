'use client';
// src/components/ui/LoadingScreen.jsx
//
// Modern, restrained loading screen — replaces the old drei <Loader>:
//   • Near-black canvas with two slow, blurred aurora washes
//   • Faint static starfield (barely-there)
//   • SVG progress ring with the real asset loading % in the middle
//   • Hairline progress bar + mono status line with a blinking caret
//   • Subtle interactivity: emblem drifts with the cursor; click / Space
//     fires a gentle pulse on the ring
// Fades out and unmounts once everything is ready.

import React, { useRef, useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import styles from './LoadingScreen.module.css';

const STATUS = [
  { upTo: 10, label: 'INITIALIZING' },
  { upTo: 35, label: 'LOADING SCENE' },
  { upTo: 60, label: 'CHARGING VISUALS' },
  { upTo: 85, label: 'SYNCING DATA' },
  { upTo: 100, label: 'READY' },
];

// Sparse, faint starfield via box-shadow (kept in JS so the CSS stays tiny).
function useStarfield(ref, count) {
  useEffect(() => {
    if (!ref.current) return;
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 100).toFixed(2);
      const size = (Math.random() * 1.2 + 0.5).toFixed(2);
      const alpha = (Math.random() * 0.3 + 0.12).toFixed(2);
      shadows.push(`${x}vw ${y}vh 0 ${size}px rgba(255,255,255,${alpha})`);
    }
    ref.current.style.boxShadow = shadows.join(', ');
  }, [ref, count]);
}

const RING_R = 56; // px in the 160 viewBox
const RING_C = 2 * Math.PI * RING_R;

function LoadingScreen() {
  const { active, progress } = useProgress();

  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const [pulse, setPulse] = useState(false);

  const emblemRef = useRef(null); // cursor parallax target
  const starsRef = useRef(null);

  const pct = Math.round(progress);
  const ringOffset = RING_C * (1 - progress / 100);

  useStarfield(starsRef, 70);

  // Fade out + unmount once everything has loaded
  useEffect(() => {
    if (!active && progress >= 100) {
      const t1 = setTimeout(() => setFading(true), 300);
      const t2 = setTimeout(() => setGone(true), 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [active, progress]);

  // Gentle cursor parallax on the emblem
  useEffect(() => {
    const onMove = (e) => {
      const el = emblemRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const firePulse = () => {
    if (pulse) return;
    setPulse(true);
    window.setTimeout(() => setPulse(false), 600);
  };

  // Space also pulses the emblem (binds once — firePulse only sets state)
  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); firePulse(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pick the status message for the current progress (no array mutation)
  let status = STATUS[0].label;
  for (const s of STATUS) if (pct >= s.upTo) status = s.label;

  if (gone) return null;

  return (
    <div className={`${styles.overlay} ${fading ? styles.overlayHidden : ''}`}>
      <div className={styles.auroraA} />
      <div className={styles.auroraB} />
      <div ref={starsRef} className={styles.stars} />

      <div className={styles.center} onClick={firePulse}>
        {/* Emblem: refined SVG progress ring + percentage */}
        <div ref={emblemRef} className={`${styles.emblem} ${pulse ? styles.emblemPulse : ''}`}>
          <svg viewBox="0 0 160 160" className={styles.ringSvg} aria-hidden="true">
            <circle cx="80" cy="80" r={RING_R} className={styles.ringTrack} />
            <circle
              cx="80" cy="80" r={RING_R}
              className={styles.ringProgress}
              strokeDasharray={RING_C}
              strokeDashoffset={ringOffset}
            />
          </svg>
          {/* Slow rotating dashed satellite ring */}
          <div className={styles.orbitWrap}>
            <svg viewBox="0 0 160 160" className={styles.orbitSvg} aria-hidden="true">
              <circle cx="80" cy="80" r="66" className={styles.orbitCircle} />
            </svg>
          </div>
          <div className={styles.pct}>
            {pct}
            <span className={styles.pctUnit}>%</span>
          </div>
        </div>

        <h1 className={styles.name}>ABILASH KUMAR R</h1>
        <p className={styles.statusLine}>
          <span className={styles.statusDot} />
          {status}
          <span className={styles.caret}>▍</span>
        </p>

        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;