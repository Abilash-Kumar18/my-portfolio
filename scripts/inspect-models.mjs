import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression, EXTTextureWebP, KHRMaterialsUnlit } from '@gltf-transform/extensions';
import dracoPkg from 'draco3d';
const draco3d = dracoPkg;
import { readFileSync } from 'node:fs';
import path from 'node:path';

const dir = 'public/models';
const single = process.argv[2];
const models = single
  ? [single]
  : [
      'asteroid-optimized.glb',
      'ufo-optimized.glb',
      'spaceship-transformed.glb',
      'station-transformed.glb',
      'satellite-transformed.glb',
      'planet-transformed.glb',
      'pixel_planet_1-transformed.glb',
      'pixel_planet_2.glb',
      'pixel_planet_3.glb',
    ];
const singlePath = single ? path.resolve(single) : single;

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression, EXTTextureWebP, KHRMaterialsUnlit])
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

const rows = [];

for (const name of models) {
  const file = singlePath || path.join(dir, name);
  let doc;
  try {
    doc = await io.read(file);
  } catch (e) {
    rows.push({ model: name, error: e.message });
    continue;
  }
  const root = doc.getRoot();
  let triangles = 0;
  let vertices = 0;
  let meshes = 0;
  let prims = 0;
  let maxPrimTris = 0;
  for (const mesh of root.listMeshes()) {
    meshes++;
    for (const prim of mesh.listPrimitives()) {
      prims++;
      let t = 0;
      const idx = prim.getIndices();
      if (idx) {
        t = Math.floor(idx.getCount() / 3);
      } else {
        const pos = prim.getAttribute('POSITION');
        if (pos) t = Math.floor(pos.getCount() / 3);
      }
      triangles += t;
      maxPrimTris = Math.max(maxPrimTris, t);
      const pos = prim.getAttribute('POSITION');
      if (pos) vertices = Math.max(vertices, pos.getCount());
    }
  }
  const matCount = root.listMaterials().length;
  let texCount = 0;
  let texTotal = 0;
  for (const tex of root.listTextures()) {
    texCount++;
    const img = tex.getImage();
    if (img) texTotal += img.byteLength || 0;
  }
  const animCount = root.listAnimations().length;
  const bytes = readFileSync(file).length;
  rows.push({
    model: name,
    sizeMB: (bytes / 1048576).toFixed(2),
    triangles,
    vertices,
    maxPrimTris,
    meshes,
    prims,
    materials: matCount,
    textures: texCount,
    texBytesMB: (texTotal / 1048576).toFixed(2),
    anims: animCount,
  });
}

console.table(rows);