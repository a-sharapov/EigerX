var express = require("express");
var router = express.Router();
var trades = require("./trades");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<p>HTML Data</p>");
});

router.use("/trades", trades);

module.exports = router;
