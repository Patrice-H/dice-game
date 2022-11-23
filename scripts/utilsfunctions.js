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

const isDiceStopMoving = (rigidBody_List, dicesInGame) => {
  let result = true;
  for (let i = 0; i < dicesInGame; i++) {
    if (
      !rigidBody_List[i + 73] ||
      rigidBody_List[i + 73].userData.physicsBody.isActive()
    ) {
      result = false;
    }
  }

  return result;
};

export const displayEndGame = (scene, rigidBody_List, dicesInGame) => {
  if (isDiceStopMoving(rigidBody_List, dicesInGame)) {
    for (let i = 0; i < dicesInGame; i++) {
      console.log(
        `${scene.children[i + 3].name} : `,
        getResults(scene.children[i + 3].rotation)
      );
    }
    console.log('end game !');
    return false;
  } else {
    return true;
  }
};

export const getGlobalResults = (scene, dicesInGame) => {
  let globalResults = new Array();
  let diceResult;
  for (let i = 0; i < dicesInGame; i++) {
    diceResult = getResults(scene.children[i + 3].rotation);
    globalResults.push(diceResult);
  }

  return globalResults;
};

export const saveResults = (scene, results) => {
  for (let i = 0; i < results.length; i++) {
    scene.children[i + 3].userData.result = results[i];
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

export const getSelectedObject = (objectsTouched) => {
  if (objectsTouched.length === 0) {
    return;
  }
  for (let i = 0; i < objectsTouched.length; i++) {
    if (objectsTouched[i].object.parent.userData.selected) {
      return objectsTouched[i].object.parent;
    }
  }

  return;
};

export const displayDiceInReserve = (dice, position) => {
  let img = document.getElementById(`dice-position-${position}`);
  let result = dice.userData.result;
  img.setAttribute('src', `../assets/dice-${result}.png`);
  img.classList.add('reserved-dice');
};

export const removeDiceOnScene = (scene, dice) => {
  let children = scene.children.filter((object) => object.uuid !== dice.uuid);
  scene.children = children;
};

export const resetGame = (scene, dicesInGame) => {
  if (scene.children.length > 3) {
    for (let i = 0; i < dicesInGame; i++) {
      scene.children.pop();
    }
  }
};

const getDicesOnScene = (scene) => {
  let dices = new Array();
  const iterator = scene.children.keys();
  for (let key of iterator) {
    if (key > 2) {
      dices.push(scene.children[key]);
    }
  }

  return dices;
};

const getOccupiedPositionOnScene = (dices) => {
  let occupiedPosition = new Array();
  dices.forEach((dice) => {
    if (dice.position.z < 5 && dice.position.z > -5) {
      occupiedPosition.push(dice.position.x);
    }
  });
  if (occupiedPosition.length > 0) {
    occupiedPosition.sort((a, b) => a - b);
  }

  return occupiedPosition;
};

const getFreeSectors = (occupiedPosition) => {
  let freeSectors = new Array();
  if (occupiedPosition.length === 0) {
    freeSectors.push([-20, 20]);
  }
  if (occupiedPosition.length === 1) {
    freeSectors.push([-20, occupiedPosition[0] - 5]);
    freeSectors.push([occupiedPosition[0] + 5, 20]);
  }
  if (occupiedPosition.length > 1) {
    for (let i = 0; i < occupiedPosition.length; i++) {
      if (i === 0) {
        freeSectors.push([-20, occupiedPosition[i] - 5]);
      } else {
        freeSectors.push([
          occupiedPosition[i - 1] + 5,
          occupiedPosition[i] - 5,
        ]);
        if (i === occupiedPosition.length - 1) {
          freeSectors.push([occupiedPosition[i] + 5, 20]);
        }
      }
    }
  }

  return freeSectors;
};

export const getFreePositionOnScene = (scene) => {
  const posY = 2.0599331855773926;
  const posZ = 0;
  let posX = 0;
  let rangeValue = 0;
  const dicesOnScene = getDicesOnScene(scene);
  const occupiedPosition = getOccupiedPositionOnScene(dicesOnScene);
  const freeSectors = getFreeSectors(occupiedPosition);
  freeSectors.forEach((sector) => {
    if (sector[1] - sector[0] > rangeValue) {
      rangeValue = sector[1] - sector[0];
      posX = (sector[0] + sector[1]) / 2;
    }
  });

  return new THREE.Vector3(posX, posY, posZ);
};
