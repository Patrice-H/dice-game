import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import { createPhysicBox, CreatePhysicCylinder } from './physicsUniverse.js';

export const createGround = (Ammo, physicsUniverse, rigidBody_List, scene) => {
  const geometry = new THREE.CylinderGeometry(26, 26, 0.1, 128);
  const material = new THREE.MeshPhongMaterial({
    color: 0x006600,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, mesh.geometry.parameters.height / 2, 0);
  scene.add(mesh);
  CreatePhysicCylinder(Ammo, physicsUniverse, rigidBody_List, mesh, 0, null);

  return mesh;
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
      dice.position.set(-48, 35, 0);
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
