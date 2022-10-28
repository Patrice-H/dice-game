export const getRandonRotation = () => {
  const data = [
    {
      x: 0,
      y: 0.707,
      z: 0,
      w: 0.707,
    },
    {
      x: -0.707,
      y: 0,
      z: 0,
      w: 0.707,
    },
    {
      x: 0.707,
      y: 0.707,
      z: 0,
      w: 0,
    },
    {
      x: -0.707,
      y: 0.707,
      z: 0,
      w: 0,
    },
    {
      x: 0.707,
      y: 0,
      z: 0,
      w: 0.707,
    },
    {
      x: 0,
      y: 0,
      z: 1,
      w: 0,
    },
  ];

  let randomNumber = Math.floor(Math.random() * 6);

  return data[randomNumber];
};
