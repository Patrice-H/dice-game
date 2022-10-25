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
import { createGround, createImportedMesh } from './meshes.js';
import { rollDice } from './utilsfunctions.js';

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
    requestAnimationFrame(render);
  };

  // init
  tmpTransformation = new Ammo.btTransform();
  physicsUniverse = initPhysicsUniverse(Ammo);

  // Add meshes
  createGround(Ammo, physicsUniverse, rigidBody_List, scene);
  createImportedMesh(Ammo, physicsUniverse, rigidBody_List, scene);

  initGraphicsUniverse();
  render();
});
