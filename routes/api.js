var express = require('express');
var router = express.Router();
const getEurTable = require('../data/table');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  const cadTable = getEurTable();
  res.json(cadTable);
});

module.exports = router;
