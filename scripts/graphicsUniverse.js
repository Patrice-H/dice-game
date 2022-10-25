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

export const initGraphicsUniverse = () => {
  // Camera
  camera.position.set(0, 20, 45);
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

export const createGraphicGround = (scene) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x006600,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(50, 0.1, 50);
  mesh.position.set(0, -0.05, 0);
  mesh.name = 'ground';
  scene.add(mesh);
};
