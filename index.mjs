import { jsGenerator } from "./jsGenerator.mjs";

const statement = [
  { yield: 4, run: (_, arg = 0) => arg + 2 },
  { yield: 4, run: (yieldVal, arg = 0) => +yieldVal + arg + 5 },
];

const generatorObject = jsGenerator(statement);
const generatorObject2 = jsGenerator(statement);
const generatorObject3 = jsGenerator(statement);
const generatorObject4 = jsGenerator(statement);

// yield for generator object 1
console.log("yield for generator object 1\n");
console.log("\nFirst yield");
console.log(generatorObject.next(2));
console.log("\nSecond yield");
console.log(generatorObject.next(6));
console.log("\nThird yield");
console.log(generatorObject.next(8));
console.log("\nForth yield");
console.log(generatorObject.next(3));
console.log("\n\n");

// yield for generator object 2
console.log("yield for generator object 2\n");
console.log("\nFirst yield");
console.log(generatorObject2.next());
console.log("\nSecond yield");
console.log(generatorObject2.next(4));
console.log("\nThird yield");
console.log(generatorObject2.next());
console.log("\nForth yield");
console.log(generatorObject2.next());
console.log("\n\n");

// yield test return for generator object 3
console.log("yield test return for generator object 3\n");
console.log("\nFirst yield");
console.log(generatorObject3.next());
console.log("\nSecond yield");
console.log(generatorObject3.return(4));
console.log("\nThird yield");
console.log(generatorObject3.next());
console.log("\nForth yield");
console.log(generatorObject3.next());
console.log("\n\n");

// yield test throw for generator object 4
console.log("yield test throw for generator object 4\n");
console.log("\nFirst yield");
console.log(generatorObject4.next());
console.log("\nSecond yield");
console.log(generatorObject4.throw("test error"));
console.log("\nThird yield");
console.log(generatorObject4.next());
console.log("\nForth yield");
console.log(generatorObject4.next());
console.log("\n\n");
