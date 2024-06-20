const {
  respondWithMethodNotAllowed,
  createNewTrade,
  getManyTradesByParams,
  getOneTradeById,
} = require("../services/trades");
const { wrapTryCatch } = require("../assets/utils");

var createTrade = wrapTryCatch(createNewTrade);
var getAllTrades = wrapTryCatch(getManyTradesByParams);
var getTradeById = wrapTryCatch(getOneTradeById);
var updateTrade = respondWithMethodNotAllowed;
var patchTrade = respondWithMethodNotAllowed;
var deleteTrade = respondWithMethodNotAllowed;

module.exports = {
  getAllTrades,
  getTradeById,
  createTrade,
  updateTrade,
  patchTrade,
  deleteTrade,
};
