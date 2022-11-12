import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import { createPhysicBox, CreatePhysicCylinder } from './physicsUniverse.js';
import { getRandonRotation } from '../data/randomRotation.js';
import { getRandomPosition } from './utilsfunctions.js';

const createGraphicBox = (scale, position) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(scale.x, scale.y, scale.z);
  mesh.position.set(position.x, position.y, position.z);
  mesh.visible = false;

  return mesh;
};

export const createDices = (Ammo, physicsUniverse, rigidBody_List, scene) => {
  const randomPosition = getRandomPosition();
  for (let i = 0; i < 5; i++) {
    let posX, posY, posZ;
    if (i === 0) {
      posX = randomPosition.x;
      posY = randomPosition.y;
      posZ = randomPosition.z;
    }
    if (i % 2 !== 0) {
      posX = randomPosition.x + 3;
      posZ = randomPosition.z + 3;
    }
    if (i % 2 === 0 && i !== 0) {
      posX = randomPosition.x - 3;
      posZ = randomPosition.z - 3;
    }
    if (i > 2) {
      posY = randomPosition.y - 3;
    }
    if (i < 3 && i !== 0) {
      posY = randomPosition.y + 3;
    }
    const loader = new GLTFLoader();
    loader.load(
      'assets/dice.gltf',
      (gltf) => {
        const dice = gltf.scene.children[0];
        dice.scale.set(2, 2, 2);
        dice.position.set(posX, posY, posZ);
        dice.name = `dice-${i + 1}`;
        dice.userData.selected = true;
        scene.add(dice);
        const randomRotation = getRandonRotation();
        createPhysicBox(Ammo, physicsUniverse, rigidBody_List, dice, 1, {
          x: randomRotation.x,
          y: randomRotation.y,
          z: randomRotation.z,
          w: randomRotation.w,
        });
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }
};

export const createGraphicDiceTrack = () => {
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

  const trackGroundGeometry = new THREE.CylinderGeometry(26, 26, 0.1, 128);
  const trackGroundMaterial = new THREE.MeshPhongMaterial({
    color: 0x006600,
  });
  const trackGround = new THREE.Mesh(trackGroundGeometry, trackGroundMaterial);
  trackGround.position.set(0, trackGround.geometry.parameters.height / 2, 0);
  trackGround.name = 'trackGround';
  diceTrack.add(trackGround);

  const trackWallsHidden = new THREE.Group();
  trackWallsHidden.name = 'trackWallsHidden';
  for (let i = 1; i <= 72; i++) {
    let angle = Math.PI / 36;

    let wall = createGraphicBox(
      new THREE.Vector3(0.1, 5, 2),
      new THREE.Vector3(
        26 * Math.cos(angle * i),
        2.5,
        -26 * Math.sin(angle * i)
      )
    );
    wall.name = `wall-${i}`;
    trackWallsHidden.add(wall);
  }
  diceTrack.add(trackWallsHidden);

  return diceTrack;
};
