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
import { rollDice, throwDice } from './utilsfunctions.js';

Ammo().then((Ammo) => {
  let physicsUniverse;
  let tmpTransformation;
  let rigidBody_List = new Array();

  // Render scene
  const render = () => {
    let deltaTime = clock.getDelta();
    updatePhysicsUniverse(
      physicsUniverse,
      rigidBody_List,
      tmpTransformation,
      deltaTime
    );
    renderer.render(scene, camera);
    rollDice(Ammo, rigidBody_List);
    throwDice(Ammo, rigidBody_List);
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
