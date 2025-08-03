import { assert, assertArrayEquivalence, test } from "./framework.js";
import { gameOfLife, gameOfLifeFrom2dArray } from "../scripts/gameOfLife.js";

(() => {

  console.info("\n--- BEGIN TEST RUN ---\n")

  // Setting up the game object

  console.info("TESTING GAME SETUP\n")

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
    const life = gameOfLifeFrom2dArray(numberLayout);

    assertArrayEquivalence("layout contains the expected live cells",
      life.layout,
      [
        [false,false,false,false,false],
        [false,true ,true ,false,false],
        [false,false,false,true ,false],
        [false,false,false,false,false],
      ]
    );
  });

  // Progressing game state

  console.info("\nTESTING STEP FORWARD\n")

  test("a single live cell is killed when progressing", () => {
    const life = gameOfLifeFrom2dArray([
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]);

    life.stepForward();

    assert("layout contains only false values",
      life.layout.every(row => row.every(cell => cell === false))
    );
  });

  test("two adjacent live cells are killed when progressing", () => {
    const life = gameOfLifeFrom2dArray([
      [0,0,0],
      [1,1,0],
      [0,0,0],
    ]);

    life.stepForward();

    assert("layout contains only false values",
      life.layout.every(row => row.every(cell => cell === false))
    );
  });

  test("a square of live cells survives when progressing", () => {
    const life = gameOfLifeFrom2dArray([
      [1,1,0],
      [1,1,0],
      [0,0,0],
    ]);

    life.stepForward();

    assertArrayEquivalence("layout contains the expected live cells",
      life.layout,
      [
        [true ,true ,false],
        [true ,true ,false],
        [false,false,false],
      ]
    );
  });

  console.info("\n--- TEST RUN COMPLETE ---\n");

})();
