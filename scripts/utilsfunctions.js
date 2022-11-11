import * as THREE from "three";
import { diceRotation } from "../data/rotation.js";

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

const isDiceStopMoving = (rigidBody_List) => {
  let result = true;
  for (let i = 0; i < 5; i++) {
    if (
      !rigidBody_List[i + 73] ||
      rigidBody_List[i + 73].userData.physicsBody.isActive()
    ) {
      result = false;
    }
  }

  return result;
};

export const displayEndGame = (scene, rigidBody_List) => {
  if (isDiceStopMoving(rigidBody_List)) {
    for (let i = 0; i < 5; i++) {
      console.log(
        `dice-${i + 1} : `,
        getResults(scene.children[i + 3].rotation)
      );
    }
    console.log("end game !");

    return false;
  } else {
    return true;
  }
};

export const rollDice = (Ammo, rigidBody_List) => {
  const angle = new Ammo.btVector3(0, 0, -8);
  for (let i = 0; i < rigidBody_List.length; i++) {
    if (rigidBody_List[i].userData.name === "dice") {
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
    return "no object selected";
  }
  for (let i = 0; i < objectsTouched.length; i++) {
    if (objectsTouched[i].object.parent.userData.selected) {
      return objectsTouched[i].object.parent.name;
    }
  }

  return "no object selected";
};

export const resetGame = (scene, rigidBody_List, dicesInGame) => {
  if (scene.children.length > 3) {
    for (let i = 0; i < dicesInGame; i++) {
      scene.children.pop();
      rigidBody_List.pop();
    }
  }
};
