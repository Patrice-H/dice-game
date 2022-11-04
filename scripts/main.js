import * as THREE from 'three';
import Ammo from './ammo.js';
import {
  scene,
  camera,
  renderer,
  clock,
  initGraphicsUniverse,
} from './graphicsUniverse.js';
import {
  initPhysicsUniverse,
  updatePhysicsUniverse,
} from './physicsUniverse.js';
import { createDiceTrack, createDices } from './meshes.js';
import {
  rollDice,
  throwDice,
  displayEndGame,
  getSelectedObject,
} from './utilsfunctions.js';

let isGameStart = false;
let areDiceCast = false;
let rigidBody_List = new Array();

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
};

const onMouseUp = () => {
  raycaster.setFromCamera(mouse, camera);
  const objectsTouched = raycaster.intersectObjects(scene.children);
  console.log(getSelectedObject(objectsTouched));
};

const launchGame = () => {
  isGameStart = true;
  if (scene.children.length > 3) {
    for (let i = 0; i < 5; i++) {
      scene.children.pop();
      rigidBody_List.pop();
    }
  }
};

Ammo().then((Ammo) => {
  let physicsUniverse;
  let tmpTransformation;

  // Render scene
  const render = () => {
    let deltaTime = clock.getDelta();
    if (isGameStart) {
      createDices(Ammo, physicsUniverse, rigidBody_List, scene);
      areDiceCast = true;
    }
    isGameStart = false;
    updatePhysicsUniverse(
      physicsUniverse,
      rigidBody_List,
      tmpTransformation,
      deltaTime
    );
    rollDice(Ammo, rigidBody_List);
    throwDice(Ammo, rigidBody_List);
    areDiceCast = displayEndGame(scene, rigidBody_List, areDiceCast);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  // init
  tmpTransformation = new Ammo.btTransform();
  physicsUniverse = initPhysicsUniverse(Ammo);

  // Add meshes
  createDiceTrack(Ammo, physicsUniverse, rigidBody_List, scene);

  initGraphicsUniverse();
  render();
});

const button = document.getElementById('launcher');
button.addEventListener('click', () => {
  launchGame();
});
document.addEventListener('mousemove', (event) => onMouseMove(event));
document.addEventListener('mouseup', onMouseUp);
