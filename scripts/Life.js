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
}

export default Life;
