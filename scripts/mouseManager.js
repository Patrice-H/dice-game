import * as THREE from 'three';
import { getSelectedObject } from './utilsfunctions.js';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export const onMouseMove = (event, scene, camera) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(mouse, camera);
  const objectsTouched = raycaster.intersectObjects(scene.children);
  const selectedObject = getSelectedObject(objectsTouched);
  if (selectedObject !== undefined) {
    document.body.style = 'cursor: pointer;';
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
    reserve.length < 5
  ) {
    return selectedObject;
  } else {
    return null;
  }
};
