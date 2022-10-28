import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import { createPhysicBox, CreatePhysicCylinder } from './physicsUniverse.js';

export const createDiceTrack = (
  Ammo,
  physicsUniverse,
  rigidBody_List,
  scene
) => {
  const diceTrack = new THREE.Group();
  diceTrack.name = 'diceTrack';

  const loader = new GLTFLoader();
  loader.load(
    'assets/track.gltf',
    (gltf) => {
      const trackEdge = gltf.scene.children[0];
      trackEdge.scale.set(20.5, 20.5, 20.5);
      trackEdge.name = 'trackEdge';
      trackEdge.userData.radius = 20;
      trackEdge.userData.height = 5;
      diceTrack.add(trackEdge);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
  const geometry = new THREE.CylinderGeometry(26, 26, 0.1, 128);
  const material = new THREE.MeshPhongMaterial({
    color: 0x006600,
  });
  const trackGround = new THREE.Mesh(geometry, material);
  trackGround.position.set(0, mesh.geometry.parameters.height / 2, 0);
  diceTrack.add(trackGround);
  scene.add(diceTrack);
  CreatePhysicCylinder(
    Ammo,
    physicsUniverse,
    rigidBody_List,
    trackGround,
    0,
    null
  );
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
      const mesh = gltf.scene.children[0];
      mesh.scale.set(2, 2, 2);
      mesh.position.set(-48, 35, 0);
      mesh.name = 'dice-1';
      scene.add(mesh);
      createPhysicBox(Ammo, physicsUniverse, rigidBody_List, mesh, 1, null);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
};
