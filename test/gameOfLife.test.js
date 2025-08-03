import { assert, test } from "./framework.js";
import gameOfLife from "../scripts/gameOfLife.js";

(() => {

  console.info("\n--- BEGIN TEST RUN ---\n")

  test("gameOfLife output contains a layout grid", () => {
    const life = gameOfLife();
    assert("layout is an array", life.layout instanceof Array);
    assert("layout is a 2D array", life.layout.every(entry => entry instanceof Array));
    assert("layout is a 2D array of booleans", life.layout.every(entry => entry.every(nestedArray => typeof nestedArray === "boolean")));
    assert("all nested arrays are  the same length", () => {
      if (life.layout.length < 1) return true;
      const refLength = life.layout[0].length;
      return life.layout.every(nestedArray => nestedArray.length === refLength);
    })
  });

  console.info("\n--- TEST RUN COMPLETE ---\n");

})();
