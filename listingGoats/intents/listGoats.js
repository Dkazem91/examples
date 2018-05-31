const { GetCollection } = require("@apizi/intents");

module.exports.action = (token, params, callback) => {
  callback({collection: ["Lucy", "Betty", "Maggie"]})
}

module.exports.intentType = GetCollection;
module.exports.intentName = "listGoats";
