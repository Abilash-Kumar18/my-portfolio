/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js ecosystem packages that ship ESM-only builds.
  // GLB/GLTF models live in /public/models and are fetched at runtime by
  // useGLTF, so no webpack file loader is required.
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
};

export default nextConfig;
