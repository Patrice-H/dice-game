import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import { createPhysicBox } from './physicsUniverse.js';

export const createGround = (Ammo, physicsUniverse, rigidBody_List, scene) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x006600,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(50, 0.1, 50);
  mesh.position.set(0, -0.05, 0);
  mesh.name = 'ground';
  scene.add(mesh);
  createPhysicBox(Ammo, physicsUniverse, rigidBody_List, mesh, 0, null);
};

export const createImportedMesh = (
  Ammo,
  physicsUniverse,
  rigidBody_List,
  scene
) => {
  const loader = new GLTFLoader();
  loader.load(
    'assets/dice.gltf',
    (gltf) => {
      const dice = gltf.scene.children[0];
      dice.scale.set(2, 2, 2);
      dice.position.set(0, 20, 0);
      dice.name = 'dice-1';
      scene.add(dice);
      createPhysicBox(Ammo, physicsUniverse, rigidBody_List, dice, 1, null);
      return dice;
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
};
