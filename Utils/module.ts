type PrefixLengthReducerOutput = {
  tiltable: string;
  suffix: string;
  prefix: string;
  length: number;
};

export var MAX_INPUTS = 10 as const;
export var MAX_INPUT_LENGTH = 1e5 as const; // eq: 10**5

const pipe =
  <T, U>(...fns: Array<(argument: any) => any>) =>
  (payload: T): T | unknown =>
    fns.reduce<T>(
      (arg: T | Promise<T>, fn: (arg: any) => any) =>
        arg instanceof Promise ? arg.then(fn) : fn(arg),
      payload
    ) as U | Promise<U>;

const _sanitizeInput = (str: string): string => str.replace(/[^a-z]/g, "");

const _limitInputLength =
  (max: number) =>
  (str: string): string =>
    str.length >= max ? str.slice(0, max) : str;

/*
 *  Implementation via recursion (little bit slow)
 */
const _getCommonPrefixRecursive = (
  str: string,
  suffix: string,
  i = 0
): string =>
  i >= str.length || i >= suffix.length || str[i] !== suffix[i]
    ? str.substring(0, i)
    : _getCommonPrefixRecursive(str, suffix, i + 1);

/*
 *  Implementation via interrupted loop
 */
const _getCommonPrefix = (str: string, suffix: string): string => {
  let i = 0;
  do {
    i++;
  } while (i < str.length && i < suffix.length && str[i] === suffix[i]);

  return str.substring(0, i);
};

const _findCommonPrefixLength =
  (_getCommonPrefixFn = _getCommonPrefix) =>
  (str: string): PrefixLengthReducerOutput =>
    Array.from(str, () => 0).reduce(
      (acc, _) => {
        let { tiltable, suffix, length } = acc;
        const hasCommonPrefix = str.startsWith(suffix.at(0) as string);
        const prefix = hasCommonPrefix ? _getCommonPrefixFn?.(str, suffix) : "";

        return {
          tiltable: `${tiltable}${suffix.at(0)}`,
          suffix: suffix.slice(1),
          prefix,
          length: length + prefix.length,
        };
      },
      {
        tiltable: "",
        suffix: str,
        prefix: str,
        length: 0,
      }
    );

const _extractLength = ({ length }: PrefixLengthReducerOutput): number =>
  length || 0;

export var findCommonPrefixLengths =
  (n: number) =>
  (inputs: string[]): number[] =>
    inputs
      .slice(0, n)
      .reduce<number[]>(
        (acc: number[], str: string): number[] =>
          acc.concat(
            pipe<string, number>(
              _sanitizeInput,
              _limitInputLength(MAX_INPUT_LENGTH),
              _findCommonPrefixLength(_getCommonPrefix),
              _extractLength
            )(str) as number
          ),
        []
      );
