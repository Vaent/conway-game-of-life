export class Life {
  constructor(layout) {
    this.layout = layout;
  }

  stepForward() {
    const nextLayout = this.layout.map((row, yIndex) =>
      row.map((cell, xIndex) => {
        let liveNeighbourCount = 0;
        [xIndex - 1, xIndex, xIndex + 1].forEach(x => {
          [yIndex - 1, yIndex, yIndex + 1].forEach(y => {
            if (x < 0 || x >= row.length
              || y < 0 || y >= this.layout.length
              || x === xIndex && y === yIndex) return;
            if (this.layout[y][x] === true) liveNeighbourCount++;
          });
        });
        return (liveNeighbourCount === 3 || (liveNeighbourCount === 2 && this.layout[yIndex][xIndex]));
      })
    );

    this.layout = nextLayout;
  }

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
  static fromCoordinates(xLength, yLength, liveCells = []) {
    const layout = [];
    for (let i = 0; i < yLength; i++)
      layout.push(new Array(xLength).fill(false));

    liveCells.forEach(([x, y]) => layout[y][x] = true);

    return new Life(layout);
  }

  /**
   * Creates the layout from a 2D array representation of live/dead cells as 1/0 respectively.
   *
   * Example usage:
   * ```
   * Life.from2dArray([
   *   [0,1,0,0],
   *   [0,1,1,0],
   *   [1,1,0,0]
   * ]);
   * ```
   *
   * @param {number[][]} layoutArray 2D array representation of the layout.
   *
   * @returns an object with initial layout based on the input layoutArray.
   */
  static from2dArray(layoutArray) {
    const layout = layoutArray.map(row => row.map(cell => !!cell));
    return new Life(layout);
  }

  /**
   * Creates the layout from a string representation of live/dead cells as 1/0 respectively.
   * Whitespace other than line breaks is ignored.
   *
   * Example usage:
   * ```
   * Life.fromMultilineString(`0 1 0 0
   *                           0 1 1 0
   *                           1 1 0 0`]);
   * ```
   *
   * @param {string} layoutString string representation of the layout.
   *
   * @returns an object with initial layout based on the input layoutString.
   */
  static fromMultilineString(layoutString) {
    const layoutRows = layoutString.split(/\s*?\n\s*/);
    const layout = layoutRows.map(row => row.split("")
      .map(c => parseInt(c))
      .filter(c => !isNaN(c))
      .map(c => !!c));
    return new Life(layout);
  }
}

export default Life;
