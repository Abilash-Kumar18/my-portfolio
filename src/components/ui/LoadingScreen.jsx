'use client';
// src/components/ui/LoadingScreen.jsx
//
// Replaces drei's bare <Loader> bar with an interactive, on-theme loading
// screen:
//   • Twinkling starfield (two parallax speeds)
//   • Gold progress ring that fills as assets stream in (drei useProgress)
//   • Planet + 3D orbit rings that follow your cursor
//   • CLICK the planet (or press Space) to trigger a "reactor boost"
//   • Terminal-style status line that changes as loading progresses
// Fades out and unmounts once everything is ready.

import React, { useRef, useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import styles from './LoadingScreen.module.css';

// Status messages keyed by progress threshold
const STATUS = [
  { upTo: 5, label: 'IGNITING RCS THRUSTERS...' },
  { upTo: 30, label: 'CALIBRATING NAV STARFIELD...' },
  { upTo: 50, label: 'COMPILING PERSONALITY MATRIX...' },
  { upTo: 70, label: 'CHARGING WARP CORE...' },
  { upTo: 90, label: 'SYNCING PROJECT PROTOCOLS...' },
  { upTo: 100, label: 'STABILIZING ORBIT...' },
];

// Build a random twinkle starfield via box-shadow (kept in JS so the CSS
// module stays tiny).
function useStarfield(ref, count) {
  useEffect(() => {
    if (!ref.current) return;
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 100).toFixed(2);
      const size = (Math.random() * 1.6 + 0.6).toFixed(2);
      const alpha = (Math.random() * 0.55 + 0.3).toFixed(2);
      shadows.push(`${x}vw ${y}vh 0 ${size}px rgba(255,255,255,${alpha})`);
    }
    ref.current.style.boxShadow = shadows.join(', ');
  }, [ref, count]);
}

function LoadingScreen() {
  const { active, progress } = useProgress();

  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const [boost, setBoost] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const planetRef = useRef(null);   // parallax target
  const starsRef = useRef(null);    // layer 1 (slow)
  const starsFastRef = useRef(null); // layer 2 (fast)

  const pct = Math.round(progress);

  useStarfield(starsRef, 70);
  useStarfield(starsFastRef, 45);

  // Fade out + unmount once everything has loaded
  useEffect(() => {
    if (!active && progress >= 100) {
      const t1 = setTimeout(() => setFading(true), 350);
      const t2 = setTimeout(() => setGone(true), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [active, progress]);

  // Cursor parallax — the planet leans toward your mouse
  useEffect(() => {
    const onMove = (e) => {
      const el = planetRef.current;
      if (!el) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform =
        `translate(${x * 26}px, ${y * 26}px) ` +
        `rotate3d(${-y}, ${x}, 0, ${(Math.abs(x) + Math.abs(y)) * 14}deg)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const doBoost = () => {
    if (boost) return;
    setBoost(true);
    setRippleKey((k) => k + 1);
    window.setTimeout(() => setBoost(false), 900);
  };

  // Spacebar also boosts, like a launch key. The effect intentionally binds
// once: doBoost only sets state (never reads changing values), so a fresh
// closure per keystroke is unnecessary.
  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); doBoost(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pick the status message for the current progress (no array mutation)
  let status = STATUS[0].label;
  for (const s of STATUS) if (pct >= s.upTo) status = s.label;

  if (gone) return null;

  const ringDeg = (pct / 100) * 360;
  const ringBg = `conic-gradient(#f5c542 ${ringDeg}deg, rgba(255,255,255,0.07) ${ringDeg}deg)`;

  return (
    <div className={`${styles.overlay} ${fading ? styles.overlayHidden : ''}`} onClick={doBoost}>
      <div ref={starsRef} className={styles.stars} />
      <div ref={starsFastRef} className={styles.starsFast} />

      <div className={styles.content}>
        <div ref={planetRef} className={styles.planetWrap}>
          {/* 3D orbit rings + moon */}
          <div className={`${styles.orbit} ${boost ? styles.orbitBoost : ''}`}>
            <div className={styles.orbitRing} />
            <div className={styles.moon} />
            <div className={styles.moon} style={{ background: '#ffd766', boxShadow: '0 0 10px #f5a623', width: '8px', height: '8px', marginLeft: '-4px', top: '62%' }} />
          </div>

          {/* Filling progress ring */}
          <div className={styles.progress} style={{ background: ringBg }} />

          {/* The planet itself */}
          <div className={`${styles.planet} ${boost ? styles.planetBoost : ''}`} onClick={(e) => { e.stopPropagation(); doBoost(); }}>
            <div className={styles.planetShine} />
          </div>

          {/* Boost ripple */}
          {boost && <div key={rippleKey} className={styles.ripple} />}

          {/* Boost label */}
          <div className={`${styles.boostLabel} ${boost ? styles.boostLabelOn : ''}`}>⚡ REACTOR BOOST</div>
        </div>

        <h1 className={styles.title}>ABILASH KUMAR R</h1>
        <p className={styles.subtitle}>INITIALIZING ORBIT</p>

        <div className={styles.status}>▸ {status}</div>

        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>

        <div className={styles.row}>
          <span className={styles.pct}>{pct}%</span>
          <span className={styles.hint}>click the planet / press space to boost the reactor</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;