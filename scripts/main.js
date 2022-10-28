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
import { rollDice, throwDice, displayEndGame } from './utilsfunctions.js';

Ammo().then((Ammo) => {
  let physicsUniverse;
  let tmpTransformation;
  let rigidBody_List = new Array();
  let start = true;

  // Render scene
  const render = () => {
    let deltaTime = clock.getDelta();
    updatePhysicsUniverse(
      physicsUniverse,
      rigidBody_List,
      tmpTransformation,
      deltaTime
    );
    rollDice(Ammo, rigidBody_List);
    throwDice(Ammo, rigidBody_List);
    start = displayEndGame(scene, rigidBody_List, start);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  // init
  tmpTransformation = new Ammo.btTransform();
  physicsUniverse = initPhysicsUniverse(Ammo);

  // Add meshes
  createDiceTrack(Ammo, physicsUniverse, rigidBody_List, scene);
  createDices(Ammo, physicsUniverse, rigidBody_List, scene);

  initGraphicsUniverse();
  render();
});
