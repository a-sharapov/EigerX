const express = require("express");
const { handleErrors } = require("../services/trades");
const tradesGuard = require("../guards/trades");
const tradesController = require("../controllers/trades");

var router = express.Router();

router
  .use(tradesGuard)
  .get("/", tradesController.getAllTrades)
  .get("/:id", tradesController.getTradeById)
  .post("/", tradesController.createTrade)
  .put("/:id", tradesController.updateTrade)
  .patch("/:id", tradesController.patchTrade)
  .delete("/:id", tradesController.deleteTrade)
  .use(handleErrors);

module.exports = router;
