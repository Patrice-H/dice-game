import * as THREE from 'three';
import { OrbitControls } from 'orbitControls';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
export const clock = new THREE.Clock();

export const initGraphicsUniverse = () => {
  // Camera
  camera.position.set(0, 30, 60);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // Lights
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(-1, 0.9, 0.4);
  scene.add(directionalLight);
};
