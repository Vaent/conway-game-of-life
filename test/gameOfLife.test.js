import { assert, test } from "./framework.js";
import gameOfLife from "../scripts/gameOfLife.js";

(() => {

  console.info("\n--- BEGIN TEST RUN ---\n")

  test("gameOfLife output contains a layout grid of the specified size", () => {
    const xLength = 5;
    const yLength = 4;
    const life = gameOfLife(xLength, yLength);

    assert("layout is an array", life.layout instanceof Array);
    assert("layout has the specified horizontal length", life.layout.length === xLength);

    assert("layout is a 2D array", life.layout.every(entry => entry instanceof Array));
    assert("all nested arrays have the specified vertical length", () => {
      return life.layout.every(nestedArray => nestedArray.length === yLength);
    });

    assert("layout is a 2D array of booleans", life.layout.every(nestedArray => nestedArray.every(entry => typeof entry === "boolean")));
  });

  console.info("\n--- TEST RUN COMPLETE ---\n");

})();
