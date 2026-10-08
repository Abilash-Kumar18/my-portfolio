/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js ecosystem packages that ship ESM-only
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
  ],

  webpack(config) {
    // Handle GLB / GLTF 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: { loader: 'file-loader', options: { publicPath: '/_next/static/files/', outputPath: 'static/files/', name: '[name].[hash].[ext]' } },
    });

    // Handle audio files (engine-loop.mp3 served from /public, no loader needed)
    return config;
  },

  // Prevent server-side rendering errors from browser-only APIs in Three.js
  // (document.createElement, WebGL, etc.)
  experimental: {
    // Enable stable server components optimisations
  },
};

export default nextConfig;
