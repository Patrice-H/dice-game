export const rollDice = (Ammo, rigidBody_List) => {
  const angle = new Ammo.btVector3(0, 0, -8);
  for (let i = 0; i < rigidBody_List.length; i++) {
    if (rigidBody_List[i].userData.name === 'dice') {
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
