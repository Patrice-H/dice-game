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
  createPhysicTrackGround,
} from './physicsUniverse.js';
import { createDices, createGraphicDiceTrack } from './meshes.js';
import {
  rollDice,
  throwDice,
  displayEndGame,
  resetGame,
  getGlobalResults,
} from './utilsfunctions.js';
import { onMouseMove, onMouseUp } from './mouseManager.js';

let isGameRunning = false;
let isGameStart = false;
let rigidBody_List = new Array();
let gameResults;
let physicsUniverse = null;
let tmpTransformation = null;

const render = (f) => {
  renderer.render(scene, camera);
  requestAnimationFrame(f);
};

const initStaticScene = () => {
  if (scene.children.length === 0) {
    const diceTrack = createGraphicDiceTrack();
    scene.add(diceTrack);
    initGraphicsUniverse();
    //console.log(scene);
  }
  render(initStaticScene);
};

const startAmmo = () => {
  if (isGameRunning) {
    Ammo().then((Ammo) => {
      const runGame = () => {
        let deltaTime = clock.getDelta();
        if (isGameStart) {
          createDices(Ammo, physicsUniverse, rigidBody_List, scene);
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
        isGameRunning = displayEndGame(scene, rigidBody_List, 5);
        if (!isGameRunning) {
          physicsUniverse = null;
          tmpTransformation = null;
          rigidBody_List = new Array();
          gameResults = getGlobalResults(scene, 5);
          console.log(gameResults);
          button.removeAttribute('disabled');

          return;
        } else {
          render(runGame);
        }
      };

      // init
      physicsUniverse = initPhysicsUniverse(Ammo);
      tmpTransformation = new Ammo.btTransform();
      createPhysicTrackGround(
        Ammo,
        physicsUniverse,
        rigidBody_List,
        scene.children[0]
      );
      runGame();
    });
  }
};

const launchGame = () => {
  isGameRunning = true;
  isGameStart = true;
  button.setAttribute('disabled', true);
  resetGame(scene, rigidBody_List, 5);
  startAmmo();
};

render(initStaticScene);

const button = document.getElementById('launcher');
button.addEventListener('click', () => {
  launchGame();
});
document.addEventListener('mousemove', (event) => onMouseMove(event));
document.addEventListener('mouseup', () => onMouseUp(scene, camera));
