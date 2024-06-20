const AVAILABLE_TYPES = ["buy", "sell"];

const DICTIONARY = {
  VALIDATION_ERROR: "Validation error",
  NOT_FOUND: "Not found",
  ID_NOT_FOUND: "ID not found",
  SERVER_ERROR: "Server error",
  BAD_REQUEST: "Bad request",
  NOT_ALLOWED: "Operation not allowed",
  INVALID_STRUCT_NOT_NULL: "Value must not be null",
  INVALID_STRUCT_TYPE: `Type must be either ${AVAILABLE_TYPES.join(" or ")}`,
  INVALID_USER_ID: "User id must be a number",
  INVALID_STRUCT_SHARES_MIN: "Shares must be greater than 0",
  INVALID_STRUCT_SHARES_MAX: "Shares must be less than 100",
  AN_ERROR_HAS_BEEN_REPORTED: "An error has been reported",
};

const STATUSES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  ID_NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
};

module.exports = {
  DICTIONARY,
  STATUSES,
  AVAILABLE_TYPES,
};
