import * as THREE from 'three';

// Custom plugin extension to cleanly handle archived KHR_materials_pbrSpecularGlossiness GLTF models
export const extendGLTFLoader = (loader) => {
  if (!loader || typeof loader.register !== 'function') return;

  loader.register((_parser) => ({
    name: 'KHR_materials_pbrSpecularGlossiness',
    getMaterialType: () => THREE.MeshStandardMaterial,
    extendMaterialParams: async (_materialIndex, materialParams) => {
      materialParams.color = new THREE.Color(1, 1, 1);
      materialParams.roughness = 0.5;
      materialParams.metalness = 0.5;
      return Promise.resolve();
    }
  }));
};
