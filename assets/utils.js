/**
 * Wraps a function with a try-catch block to handle any errors that may occur during its execution.
 *
 * @param {Function} fn - The function to be wrapped.
 */
var wrapTryCatch = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

/**
 * Creates a new object by filtering the properties of the given body object
 * based on the provided keys and ignoring certain properties.
 *
 * @param {Array} keys - The keys to filter the body object by.
 * @param {Object} body - The body object to filter.
 * @param {Array} [ignored=["id"]] - The properties to ignore.
 * @return {Object} - The new object with filtered properties.
 */
var createStructPayload = (keys, body, ignored = ["id"]) =>
  body
    ? Object.fromEntries(
        keys
          .map(
            (key) => key in body && !ignored.includes(key) && [key, body[key]]
          )
          .filter(Boolean)
      )
    : {};

/**
 * Filters out properties with undefined, null, or empty string values from an object and returns a new object with the remaining properties.
 *
 * @param {Object} obj - The input object to filter.
 * @return {Object} - A new object with the filtered properties.
 */
var ridFromUndefined = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

/**
 * Logs an error message along with the stack trace to the console.
 *
 * @param {string} message - The error message to log.
 * @param {string} stack - The stack trace associated with the error.
 * @return {undefined}
 */
var logError = (message, stack) =>
  console.error(`❗ [${new Date().toUTCString()}]: `, message, `\n\n`, stack);

/**
 * Determines the answer based on whether it's a known error or not.
 *
 * @param {boolean} isKnownError - Flag indicating if the error is known.
 * @param {Object} data - The data object to retrieve the message from.
 * @param {string} message - The message to retrieve from the data object.
 * @return {any} The determined answer based on the conditions.
 */
var determineAnswer = (isKnownError, data, message) =>
  isKnownError ? data[message] || data["BAD_REQUEST"] : data["SERVER_ERROR"];

module.exports = {
  createStructPayload,
  ridFromUndefined,
  logError,
  determineAnswer,
  wrapTryCatch,
};
