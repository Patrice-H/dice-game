export const rollDice = (Ammo, rigidBody_List) => {
  const angle = new Ammo.btVector3(0, 2, -5);
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

export const throwDice = (Ammo, rigidBody_List) => {
  for (let i = 0; i < rigidBody_List.length; i++) {
    let strenghtX = Math.round(rigidBody_List[i].position.x) * -3;
    let strenghtY = (25 - Math.round(rigidBody_List[i].position.y)) * -2;
    if (rigidBody_List[i].position.x < 0 && rigidBody_List[i].position.y > 3) {
      rigidBody_List[i].userData.physicsBody.setLinearVelocity(
        new Ammo.btVector3(strenghtX, strenghtY, 0)
      );
      console.log(strenghtX, strenghtY);
      console.log(rigidBody_List[i].position.x, rigidBody_List[i].position.y);
    }
  }
};
