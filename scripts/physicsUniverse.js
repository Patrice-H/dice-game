export const initPhysicsUniverse = (Ammo) => {
  const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
  const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
  const overlappingPairCache = new Ammo.btDbvtBroadphase();
  const solver = new Ammo.btSequentialImpulseConstraintSolver();
  const physicsUniverse = new Ammo.btDiscreteDynamicsWorld(
    dispatcher,
    overlappingPairCache,
    solver,
    collisionConfiguration
  );
  physicsUniverse.setGravity(new Ammo.btVector3(0, -30, 0));

  return physicsUniverse;
};

export const updatePhysicsUniverse = (
  physicsUniverse,
  rigidBody_List,
  tmpTransformation,
  deltaTime
) => {
  physicsUniverse.stepSimulation(deltaTime, 10);
  for (let i = 0; i < rigidBody_List.length; i++) {
    let Graphics_Obj = rigidBody_List[i];
    let Physics_Obj = Graphics_Obj.userData.physicsBody;
    let motionState = Physics_Obj.getMotionState();
    if (motionState) {
      motionState.getWorldTransform(tmpTransformation);
      let new_pos = tmpTransformation.getOrigin();
      let new_qua = tmpTransformation.getRotation();
      Graphics_Obj.position.set(new_pos.x(), new_pos.y(), new_pos.z());
      Graphics_Obj.quaternion.set(
        new_qua.x(),
        new_qua.y(),
        new_qua.z(),
        new_qua.w()
      );
    }
  }
};

export const createPhysicBox = (
  Ammo,
  physicsUniverse,
  rigidBody_List,
  mesh,
  mass,
  rot_quaternion
) => {
  let quaternion;
  if (rot_quaternion == null) {
    quaternion = {
      x: 0,
      y: 0,
      z: 0,
      w: 1,
    };
  } else {
    quaternion = rot_quaternion;
  }
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(
    new Ammo.btVector3(mesh.position.x, mesh.position.y, mesh.position.z)
  );
  transform.setRotation(
    new Ammo.btQuaternion(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
    )
  );
  let defaultMotionState = new Ammo.btDefaultMotionState(transform);
  let structColShape = new Ammo.btBoxShape(
    new Ammo.btVector3(
      mesh.scale.x * 0.98,
      mesh.scale.y * 0.98,
      mesh.scale.z * 0.98
    )
  );
  structColShape.setMargin(0.05);
  let localInertia = new Ammo.btVector3(0, 0, 0);
  structColShape.calculateLocalInertia(mass, localInertia);
  let RBody_Info = new Ammo.btRigidBodyConstructionInfo(
    mass,
    defaultMotionState,
    structColShape,
    localInertia
  );
  let RBody = new Ammo.btRigidBody(RBody_Info);
  physicsUniverse.addRigidBody(RBody);
  mesh.userData.physicsBody = RBody;
  rigidBody_List.push(mesh);
};
