import { assert, test } from "./framework.js";
import gameOfLife, { gameOfLifeFrom2dArray } from "../scripts/gameOfLife.js";

(() => {

  console.info("\n--- BEGIN TEST RUN ---\n")

  test("gameOfLife output contains a layout grid of the specified size", () => {
    const xSize = 5;
    const ySize = 4;
    const life = gameOfLife(xSize, ySize);

    assert("layout is an array", life.layout instanceof Array);
    assert("layout has the specified vertical size", life.layout.length === ySize);

    assert("layout is a 2D array", life.layout.every(entry => entry instanceof Array));
    assert("all nested arrays have the specified horizontal size", () => {
      return life.layout.every(nestedArray => nestedArray.length === xSize);
    });

    assert("layout is a 2D array of booleans", life.layout.every(nestedArray => nestedArray.every(entry => typeof entry === "boolean")));
  });

  test("specified cells are set to `true` on initialising", () => {
    const xSize = 5;
    const ySize = 4;
    const liveCells = [ [0, 2], [1, 2], [3, 3] ];
    const life = gameOfLife(xSize, ySize, liveCells);

    assert("live cells in grid contain true", liveCells.every(([x, y]) => life.layout[y][x] === true));
    assert("dead cells in grid contain false", () => {
      for (let x1 = 0; x1 < xSize; x1++) {
        for (let y1 = 0; y1 < ySize; y1++) {
          if (liveCells.find(([x, y]) => x === x1 && y === y1)) continue; // ignore live cells
          if (life.layout[y1][x1] === true) return false;
        }
      }
      return true;
    });
  });

  test("gameOfLifeFrom2dArray converts truthy/falsy values to true/false in layout", () => {
    const numberLayout = [
      [0,0,0,0,0],
      [0,1,1,0,0],
      [0,0,0,1,0],
      [0,0,0,0,0],
    ];
    const liveCells = [[1, 1], [2, 1], [3, 2]];
    const life = gameOfLifeFrom2dArray(numberLayout);

    liveCells.forEach(([x, y]) => {
      assert(`layout contains live cell [${x}, ${y}]`, life.layout[y][x] === true)
    });
    assert("dead cells in grid contain false", () => {
      for (let x1 = 0; x1 < 5; x1++) {
        for (let y1 = 0; y1 < 4; y1++) {
          if (liveCells.find(([x, y]) => x === x1 && y === y1)) continue; // ignore live cells
          if (life.layout[y1][x1] === true) return false;
        }
      }
      return true;
    });
  });

  console.info("\n--- TEST RUN COMPLETE ---\n");

})();
