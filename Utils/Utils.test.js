import { commonPrefix } from ".";

const example = "abcabcd";
const sampleCase0 = "ababaa";
const sampleCase1 = "aa";

describe("Test fn: commonPrefix", () => {
  describe("Test examples", () => {
    it(`should return valid common prefix length for Example: n = 1, str = '${example}'`, () => {
      const { 0: result } = commonPrefix([example]);
      const assert = 10;

      expect(result).toEqual(assert);
    });

    it(`should return valid common prefix length for Sample Case 0: n = 1, str = '${sampleCase0}'`, () => {
      const { 0: result } = commonPrefix([sampleCase0]);
      const assert = 11;

      expect(result).toEqual(assert);
    });

    it(`should return valid common prefix length for Sample Case 1: n = 1, str = '${sampleCase1}'`, () => {
      const { 0: result } = commonPrefix([sampleCase1]);
      const assert = 3;

      expect(result).toEqual(assert);
    });
  });

  describe("Test edge cases", () => {
    it("should return valid common prefix length for Case: n = 1, str = ''", () => {
      const { 0: result } = commonPrefix([""]);
      const assert = 0;

      expect(result).toEqual(assert);
    });

    const invalidInput = "AS11jk00sadj52kjksdala213AAAls";
    it(`should return valid common prefix lengths for Case: n = 1, purposely invalid input str = '${invalidInput}'`, () => {
      const { 0: result } = commonPrefix([invalidInput]);
      const assert = 21;

      expect(result).toEqual(assert);
    });

    it(`should return valid common prefix lengths for Case: n = 3, strs = ['${example}', '${sampleCase0}', '${sampleCase1}']`, () => {
      const result = commonPrefix([example, sampleCase0, sampleCase1]);
      const assert = [10, 11, 3];

      expect(result).toEqual(assert);
    });

    it(`should return only 10 valid common prefix lengths for Case: n > 10 with any input`, () => {
      const result = commonPrefix(Array.from({ length: 15 }, () => "abcabcd"));
      const assert = Array.from({ length: 10 }, () => 10);

      expect(result).toEqual(assert);
      expect(result.length).toEqual(10);
    });
  });
});
