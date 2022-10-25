import {
  scene,
  camera,
  renderer,
  initGraphicsUniverse,
  createGraphicGround,
  createGraphicImportedMesh,
} from './graphicsUniverse.js';

// Add meshes
createGraphicGround();
createGraphicImportedMesh();

// Render scene
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// init
initGraphicsUniverse();
render();
