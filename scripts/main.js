import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import {
  scene,
  camera,
  renderer,
  initGraphicsUniverse,
} from './graphicsUniverse.js';

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0x006600,
});
const ground = new THREE.Mesh(geometry, material);
ground.scale.set(50, 0.1, 50);
ground.position.set(0, -0.05, 0);
ground.name = 'ground';
scene.add(ground);

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
