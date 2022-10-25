import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import {
  scene,
  camera,
  renderer,
  initGraphicsUniverse,
  createGraphicGround,
} from './graphicsUniverse.js';

// Meshes
createGraphicGround(scene);

const loader = new GLTFLoader();
loader.load(
  'assets/dice.gltf',
  (gltf) => {
    const dice1 = gltf.scene.children[0];
    dice1.scale.set(2, 2, 2);
    dice1.position.set(0, 2, 0);
    dice1.name = 'dice-1';
    scene.add(dice1);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

initGraphicsUniverse();
render();
