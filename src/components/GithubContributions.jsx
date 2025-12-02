// src/components/GithubContributions.jsx

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import styles from '../pages/Projects.module.css';

function GithubContributions() {
  return (
    <div className={styles.calendarSection}>
      <h2 className={styles.calendarTitle}>
        Days I <strong style={{ color: "#f5c542" }}>Code</strong>
      </h2>
      
      <div className={styles.calendarWrapper}>
        <GitHubCalendar
          username="Abilash-Kumar18"
          blockSize={15}
          blockMargin={5}
          fontSize={16}
          // CUSTOM THEME: Dark Grey -> Bright Gold
          theme={{
            dark: [
              '#161b22', // Empty (Darkest)
              '#4d3d14', // Dark Gold
              '#806621', // Medium Gold
              '#b38f2e', // Light Gold
              '#f5c542', // Brightest Gold (Accent Color)
            ],
          }}
        />
      </div>
    </div>
  );
}

export default GithubContributions;