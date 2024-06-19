import { findCommonPrefixLengths, MAX_INPUTS } from "./module";

/**
 *  λ → () : Find Common Prefix Length
 *
 * Given a string, split the string into two substrings at every possible point.
 * The rightmost substring is a suffix. The beginning of the string is the prefix.
 * Determine the lengths of the common prefix between each suffix and the original string.
 * Sum and return the lengths of the common prefixes. Return an array where each element i is the sum for string i.
 *
 * @param {string} str
 * @returns {number[]}
 *
 * @Example
 *  commonPrefix(["abcabcd", "ababaa", "aa"])
 */
export var commonPrefix = findCommonPrefixLengths(MAX_INPUTS);
