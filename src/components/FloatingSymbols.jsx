// src/components/FloatingSymbols.jsx

import React, { useMemo } from 'react';
import { Float, Text } from '@react-three/drei';

const SYMBOLS = [
  '</>', '{}', '()', '&&', '||', '=>', 'npm', 'git', 
  'src', 'div', '#', '!!', '01', 'try', 'catch'
];

function FloatingSymbols() {
  // Generate 40 random symbols
  const items = useMemo(() => {
    return new Array(40).fill(0).map((_, i) => ({
      symbol: SYMBOLS[i % SYMBOLS.length],
      // Spread them WIDE so they don't block the center view
      x: (Math.random() - 0.5) * 50, 
      // Spread them VERTICALLY to match your scroll length
      y: (Math.random() * -40) + 5, 
      // Push them BACK into the distance
      z: (Math.random() * -10) - 5, 
      // Random rotation for "zero gravity" look
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.5 + Math.random(), // Random sizes
    }));
  }, []);

  return (
    <group>
      {items.map((item, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[item.x, item.y, item.z]}
            rotation={item.rotation}
            fontSize={item.scale}
            // Subtle Dark Grey Style
            color="#333" 
            fillOpacity={0.4} 
            // Use default font URL to prevent crashing
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf"
          >
            {item.symbol}
          </Text>
        </Float>
      ))}
    </group>
  );
}

export default FloatingSymbols;