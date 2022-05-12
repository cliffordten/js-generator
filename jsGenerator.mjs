import Schema from "validate";

const errorMessage =
  "Js Function generator expects a required parameter with shape [{ yield: any, run: function }]";

const statementSchema = new Schema({
  yield: {
    required: true,
    message: errorMessage,
  },
  run: {
    type: Function,
    required: true,
    message: errorMessage,
  },
});

const validateStatment = (yieldStatments) => {
  let error = false;
  if (!yieldStatments.length || typeof yieldStatments !== "object") {
    error = true;
  }

  yieldStatments.map((statement) => {
    const [error1, error2] = statementSchema.validate({ ...statement });

    if (error1 || error2) {
      error = true;
      console.log("Error in Yield Schema", statement);
    }
  });

  return error;
};

// Js Function that will Mimic the JavaScript generator function
export const jsGenerator = (yieldStatments = []) => {
  const error = validateStatment([...yieldStatments]);
  if (error) throw new Error(errorMessage);

  let yieldCount = 0;
  let result = null;

  /**
   *  Reduct the yield statements to an object.
   *  The object will contain the yield as key and function to fun before the yield is resolved
   * {yield1: run1, yield2:run2}
   */
  const reduceYieldStatments = yieldStatments.reduce(
    (prev, curr, inx) => ({
      ...prev,
      [JSON.stringify({ key: inx, val: curr.yield })]: curr.run,
    }),
    {}
  );

  return {
    next: (arg = null) => {
      const yieldValues = Object.keys(reduceYieldStatments);
      const currentYield = yieldValues[yieldCount];

      if (currentYield) {
        const func = reduceYieldStatments[currentYield];
        const value = JSON.parse(currentYield);

        result = func(result || value.val, arg);

        yieldCount++;

        return {
          value: result || value.val,
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
    return: (arg) => {
      yieldCount = -1;
      return {
        value: arg || undefined,
        done: true,
      };
    },
    throw: (err) => {
      throw new Error(err);
    },
  };
};
