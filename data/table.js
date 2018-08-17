const request = require('request');
const key = require('./key.json').key;
let EUR_TABLE = {};
let lastUpdated = undefined;

const updateTable = () => {
  console.log(key);
  console.log("Update table at: " + (new Date()).toISOString());
  let success = true;
  const url = `http://data.fixer.io/api/latest?access_key=${key}`;
  request(url, (err, res, body) => {
    if (err) { success = false; }
    const json = JSON.parse(body);
    if (json.rates) {
      EUR_TABLE = json.rates;
    } else {
      success = false;
    }
  });
  return success;
}

const getEurTable = () => {
  const now = new Date();
  const today = now.getUTCDate();
  if (lastUpdated !== today) {
    if (updateTable()) {
      lastUpdated = today;
    }
  }
  return EUR_TABLE;
}

module.exports = getEurTable;