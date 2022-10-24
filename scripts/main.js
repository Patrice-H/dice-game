import * as THREE from 'three';
import { OrbitControls } from 'orbitControls';
import { GLTFLoader } from 'gltfLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 20, 45);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(-1, 0.9, 0.4);
scene.add(directionalLight);

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

render();
