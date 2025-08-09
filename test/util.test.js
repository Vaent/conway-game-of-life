import { layoutsAreEquivalent } from "../scripts/util.js";
import { assert, test } from "./framework.js";

(() => {

  console.info("\n--- BEGIN TEST RUN ---\n")

  test("layoutsAreEquivalent identifies matching layouts", () => {
    const baseArray = [ [true, false, true], [false, true, true] ];
    const clonedArray = JSON.parse(JSON.stringify(baseArray));

    assert("base array and clone are different objects", baseArray !== clonedArray);
    assert("base array and clone are equivalent", layoutsAreEquivalent(baseArray, clonedArray));
  });

  test("layoutsAreEquivalent identifies different layouts", () => {
    const baseArray = [ [true, false, true], [false, true, true] ];
    const clonedArray = JSON.parse(JSON.stringify(baseArray));
    clonedArray[1,1] = !clonedArray[1,1];

    assert("base array and clone are different objects", baseArray !== clonedArray);
    assert("base array and clone are not equivalent", !layoutsAreEquivalent(baseArray, clonedArray));
  });

  console.info("\n--- TEST RUN COMPLETE ---\n");

})();
