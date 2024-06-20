const { DICTIONARY, STATUSES } = require("../assets/trades");
const Trade = require("../models/trades");
const { struct } = require("../models/trades");
const {
  createStructPayload,
  ridFromUndefined,
  logError,
  determineAnswer,
} = require("../assets/utils");

var createNewTrade = async (req, res, _next) => {
  const payload = createStructPayload(Object.keys(struct), req.body);
  const newTrade = await Trade.create(payload);

  return res.status(STATUSES.CREATED).send(newTrade);
};

var getManyTradesByParams = async (req, res, next) => {
  const { type, user_id } = req.query;

  const isInvalidUserId = user_id && isNaN(user_id);
  isInvalidUserId && next(new Error(DICTIONARY.INVALID_USER_ID));

  const trades = await Trade.findAll({
    where: ridFromUndefined({
      type,
      user_id,
    }),
  });

  return res.status(STATUSES.OK).send(trades);
};

var getOneTradeById = async (req, res, next) => {
  const { id } = req.params;
  const trade = await Trade.findByPk(id);

  return trade
    ? res.status(STATUSES.OK).send(trade)
    : next(new Error("ID_NOT_FOUND"));
};

var respondWithMethodNotAllowed = (_req, _res, next) =>
  next(new Error("NOT_ALLOWED"));

var handleErrors = (err, _req, res, _next) => {
  const isKnownError =
    Object.keys(DICTIONARY).includes(err.message) ||
    err.message.includes(DICTIONARY.INVALID_STRUCT_NOT_NULL) ||
    err.message.includes(DICTIONARY.VALIDATION_ERROR);

  !isKnownError && logError(DICTIONARY.AN_ERROR_HAS_BEEN_REPORTED, err.stack);

  return res
    .status(determineAnswer(isKnownError, STATUSES, err.message))
    .send(determineAnswer(isKnownError, DICTIONARY, err.message));
};

module.exports = {
  createNewTrade,
  getManyTradesByParams,
  getOneTradeById,
  respondWithMethodNotAllowed,
  handleErrors,
};
