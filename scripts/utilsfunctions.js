import * as THREE from 'three';
import { diceRotation } from '../data/rotation.js';

const controlRotation = (rot) => {
  if (rot === -3.14) return true;
  if (rot === -1.57) return true;
  if (rot === 0) return true;
  if (rot === 1.57) return true;
  if (rot === 3.14) return true;

  return false;
};

const getResults = (rotation) => {
  let rotX = parseFloat(rotation.x.toFixed(2));
  let rotZ = parseFloat(rotation.z.toFixed(2));
  if (!controlRotation(rotZ)) {
    rotZ = 0;
  }
  const result = diceRotation.find(
    (dice) => dice.x === rotX && dice.z === rotZ
  );

  return result.display;
};

export const displayEndGame = (scene, rigidBody_List, start) => {
  if (
    start &&
    rigidBody_List[73] &&
    rigidBody_List[74] &&
    !rigidBody_List[73].userData.physicsBody.isActive() &&
    !rigidBody_List[74].userData.physicsBody.isActive()
  ) {
    console.log('dice-1 : ', getResults(scene.children[3].rotation));
    console.log('dice-2 : ', getResults(scene.children[4].rotation));
    console.log('dice-3 : ', getResults(scene.children[5].rotation));
    console.log('dice-4 : ', getResults(scene.children[6].rotation));
    console.log('dice-5 : ', getResults(scene.children[7].rotation));
    console.log('end game !');

    return false;
  } else {
    return start;
  }
};

export const rollDice = (Ammo, rigidBody_List) => {
  const angle = new Ammo.btVector3(0, 0, -8);
  for (let i = 0; i < rigidBody_List.length; i++) {
    if (rigidBody_List[i].userData.name === 'dice') {
      if (
        rigidBody_List[i].position.y >
        rigidBody_List[i].scale.x * Math.sqrt(3)
      ) {
        rigidBody_List[i].userData.physicsBody.setAngularVelocity(angle);
      } else {
        rigidBody_List[i].userData.active = false;
      }
    }
  }
};

export const throwDice = (Ammo, rigidBody_List) => {
  for (let i = 0; i < rigidBody_List.length; i++) {
    let strenghtX = Math.round(rigidBody_List[i].position.x) * -3;
    let strenghtY = (40 - Math.round(rigidBody_List[i].position.y)) * -2;
    if (
      rigidBody_List[i].position.x < 0 &&
      rigidBody_List[i].position.y > rigidBody_List[i].scale.x * Math.sqrt(3)
    ) {
      rigidBody_List[i].userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(strenghtX, strenghtY, 0)
      );
    }
  }
};

export const getRandomPosition = () => {
  let posX = Math.floor(Math.random() * 6);
  let posY = Math.floor(Math.random() * 6);

  return new THREE.Vector3(-50 + posX, 30 + posY, 0);
};
