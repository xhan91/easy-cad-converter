var express = require('express');
var router = express.Router();
var path = require('path');

const index = path.join(__dirname, '../fe/dist/index.html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(index);
});

module.exports = router;
