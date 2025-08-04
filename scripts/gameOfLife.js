import Life from "./Life.js";

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
 * @returns {{ layout: boolean[][] }} an object representing the game area's initial state.
 */
export const gameOfLife = (xLength, yLength, liveCells = []) => {
  const layout = [];
  for (let i = 0; i < yLength; i++)
    layout.push(new Array(xLength).fill(false));

  liveCells.forEach(([x, y]) => layout[y][x] = true);

  return new Life(layout);
}

/**
 * Convenience function which allows explicitly declaring the live and dead cells in initial state.
 * This enables setting up the grid in a more visual, and potentially more concise, way.
 *
 * Example usage:
 * ```
 * gameOfLifeFrom2dArray([
 *   [0,1,0,0],
 *   [0,1,1,0],
 *   [1,1,0,0]
 * ]);
 * ```
 *
 * @param {boolean[][]} layoutArray 2D array representation of the layout.
 *
 * @returns an object representing the game area's initial state, based on truthiness/falsiness of input values.
 */
export const gameOfLifeFrom2dArray = (layoutArray) => {
  const layout = layoutArray.map(row => row.map(cell => !!cell));
  return new Life(layout);
}

export const gameOfLifeFromMultilineString = (layoutString) => {
  const layoutRows = layoutString.split(/\s*?\n\s*/);
  const layout = layoutRows.map(row => row.split("")
    .map(c => parseInt(c))
    .filter(c => !isNaN(c))
    .map(c => !!c));
  return new Life(layout);
}

export default gameOfLife;
