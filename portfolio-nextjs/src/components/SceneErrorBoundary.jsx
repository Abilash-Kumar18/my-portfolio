'use client';
// src/components/SceneErrorBoundary.jsx
//
// Safety net around the 3D scene. If anything inside the Canvas throws
// (missing asset, WebGL hiccup, decode failure...), the 3D scene is swapped
// for a static dark-space background INSTEAD of React unmounting the whole
// app — so the HTML sections (About / Projects / Contact / the chat widget)
// always keep working and the page never goes fully black.

import React from 'react';
import styles from './SceneErrorBoundary.module.css';

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep the error visible in the console but the site alive
    console.error('3D scene crashed — showing fallback background.', error);
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.fallbackBackground} aria-hidden="true" />;
    }
    return this.props.children;
  }
}

export default SceneErrorBoundary;
