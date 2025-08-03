/**
 * Creates a representation of the game area, with each cell set to live (boolean true) or dead (false).
 * 
 * @param {number} xLength 'horizontal length' of the grid i.e. number of columns. Should be a positive integer.
 * @param {number} yLength 'vertical height' of the grid i.e. number of rows. Should be a positive integer.
 * @param {Array} liveCells a list of coordinates in the grid which should be set live in the initial state.
 * Each point should be an array containing two integers: [x, y] indicating column/row index respectively.
 * Index [0, 0] is considered to be the 'top left' cell; incrementing x moves to the right, incrementing y moves down.
 * Example: [[0, 1], [1, 1]] makes the first two cells live in the second row of the game area.
 * 
 * @returns an object representing the game area's initial state.
 */
export const gameOfLife = (xLength, yLength, liveCells = []) => {
  const layout = [];
  for (let i = 0; i < xLength; i++)
    layout.push(new Array(yLength).fill(false));

  liveCells.forEach(([x, y]) => layout[x][y] = true);

  return { layout };
}

export default gameOfLife;
