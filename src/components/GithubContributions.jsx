// src/components/GithubContributions.jsx


import GitHubCalendar from 'react-github-calendar';


function GithubContributions() {
  return (
    
        <GitHubCalendar 
          username="Abilash-Kumar18" 
          blockSize={13}
          blockMargin={4}
          fontSize={14}
          colorScheme="dark"
          theme={{
            // Custom Gold Theme
            dark: [
              '#1a1a1a', // Empty (Dark Grey)
              '#4d3800', // Level 1 (Dark Gold)
              '#997000', // Level 2 (Medium Gold)
              '#e6a800', // Level 3 (Bright Gold)
              '#f5c542', // Level 4 (Neon Gold)
            ],
          }}
        />
    
  );
}

export default GithubContributions;