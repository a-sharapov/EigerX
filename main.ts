import { DICTIONARY } from "./asset";
import { commonPrefix } from "./Utils";
import { MAX_INPUT_LENGTH, MAX_INPUTS } from "./Utils/module";

const STATES = {
  INIT: 0,
  ASK_FOR_ROWS: 1,
};

let state: number = STATES.INIT;
let rows: string[] = [];

// @ts-expect-error
process.stdout.write(
  DICTIONARY.GREETING_MSG(MAX_INPUTS, Number(MAX_INPUT_LENGTH).toLocaleString())
);

// @ts-expect-error
process.stdout.write(`\n${DICTIONARY.PRESS_ENTER_MSG}`);
const init = async () => {
  for await (const line of console as any) {
    switch (state) {
      case STATES.INIT:
        // @ts-expect-error
        process.stdout.write(DICTIONARY.NUM_ROWS_MSG);
        state = STATES.ASK_FOR_ROWS;
        break;
      case STATES.ASK_FOR_ROWS:
        rows = line.split(/\s/);
        let result = commonPrefix(rows as string[]);
        console.log(result.length === 1 ? result.at(0) : result);
        // @ts-expect-error
        process.exit(0);
        break;
    }
  }
};

init();
