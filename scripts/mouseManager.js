import * as THREE from 'three';
import { getSelectedObject } from './utilsfunctions.js';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
};

export const onMouseUp = (scene, camera) => {
  raycaster.setFromCamera(mouse, camera);
  const objectsTouched = raycaster.intersectObjects(scene.children);
  const selectedObject = getSelectedObject(objectsTouched);
  if (selectedObject !== undefined) {
    console.log(selectedObject.name);
  }
};
