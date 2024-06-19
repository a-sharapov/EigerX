import { commonPrefix } from ".";

const example = "abcabcd";
let repeats = 1e5;
const testData = Array.from({ length: 10 }, () => example);

const execute = () => {
  while (repeats--) {
    void commonPrefix(testData);
  }
};

console.log(
  `Test perfomance of fn: commonPrefix for ${repeats.toLocaleString()} times and 10 str: '${example}'`
);
const start = performance.now();
execute();
const end = performance.now();

console.log(`⏳ Execution time: ${(end - start) | 0} ms.`);
