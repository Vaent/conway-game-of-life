import Life from "../scripts/Life.js";

export const test = (name, testFunction) => {
  try {
    testFunction();
    console.log(`PASS : ${name}`);
  } catch (error) {
    if (error instanceof AssertionFailError) {
      console.warn(`FAIL : ${name}`);
      console.info(`Test failed on assertion: ${error.message}`);
      console.info(error.stack.split(/\n/)[2]);
    } else {
      console.error(`Unexpected error while running test: ${name}.`, error);
    }
  }
};

export const assert = (message, assertion) => {
  if (typeof assertion === "function") assertion = assertion();
  if (!assertion) fail(message);
}

export const assertArrayEquivalence = (message, arrayToTest, expectedArray) => {
  assert("arrays are the same length", arrayToTest.length === expectedArray.length);
  arrayToTest.forEach((element, index) => {
    const expectedElement = expectedArray[index];
    if (element instanceof Array) {
      assertArrayEquivalence(message, element, expectedElement);
    } else {
      assert(message, element === expectedElement);
    }
  });
}

/**
 * Compares two layout representations, which can be either the Array internal representation used by Life
 * or a string representation accepted by the gameOfLifeFromMultilineString convenience function.
 * String representations will be converted to Array representation before comparing the two.
 *
 * @param {string} message
 * @param {string|Array} layoutToTest
 * @param {string|Array} expectedLayout
 */
export const assertLayoutsMatch = (message, layoutToTest, expectedLayout) => {
  assertArrayEquivalence(
    message,
    layoutToTest instanceof Array ? layoutToTest : Life.fromMultilineString(layoutToTest).layout,
    expectedLayout instanceof Array ? expectedLayout : Life.fromMultilineString(expectedLayout).layout
  )
}

export const fail = (message) => {
  throw new AssertionFailError(message);
}

class AssertionFailError extends Error {}
