import * as THREE from 'three';
import { displayDiceInReserve, getSelectedObject } from './utilsfunctions.js';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export const onMouseMove = (event, scene, camera) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(mouse, camera);
  const objectsTouched = raycaster.intersectObjects(scene.children);
  const selectedObject = getSelectedObject(objectsTouched);
  let dices = scene.children.filter(
    (object) => object.userData.name === 'dice'
  );
  dices.forEach((dice) => {
    if (dice.children[0].material.emissive.g !== 0) {
      dice.children[0].material.emissive.g = 0;
      dice.children[0].material.emissive.r = 0;
    }
  });
  if (selectedObject !== undefined && selectedObject.userData.selected) {
    document.body.style = 'cursor: pointer;';
    selectedObject.children[0].material.emissive.g = 0.2;
    selectedObject.children[0].material.emissive.r = 0.2;
  } else {
    document.body.style = 'cursor: default;';
  }
};

export const onMouseUp = (reserve, scene, camera) => {
  raycaster.setFromCamera(mouse, camera);
  const objectsTouched = raycaster.intersectObjects(scene.children);
  const selectedObject = getSelectedObject(objectsTouched);
  if (
    selectedObject !== undefined &&
    selectedObject.userData.result !== undefined &&
    !reserve.includes(selectedObject) &&
    reserve.length < 5
  ) {
    reserve.push(selectedObject);
    let children = scene.children.filter(
      (dice) => dice.uuid !== selectedObject.uuid
    );
    scene.children = children;
    displayDiceInReserve(selectedObject, reserve.length - 1);
  }

  return reserve;
};
