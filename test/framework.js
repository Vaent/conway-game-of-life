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
  if (!assertion) throw new AssertionFailError(message);
}

class AssertionFailError extends Error {}
