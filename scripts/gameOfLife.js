export const gameOfLife = (xLength, yLength) => {
  const layout = [];
  for (let i = 0; i < xLength; i++)
    layout.push(new Array(yLength).fill(false));
  
  return { layout };
}

export default gameOfLife;
