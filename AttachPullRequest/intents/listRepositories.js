const { GetCollection } = require("@apizi/intents");

module.exports.action = (token, params, callback) => {
  callback({
    collection: [
      { id: "Christopher Robin id", name: "Christopher Robin" },
      { id: "Kanga id", name: "Kanga" },
      { id: "Tigger id", name: "Tigger" },
      { id: "heffalump id", name: "heffalump" },
      { id: "kessie id", name: "kessie" }
    ]
  });
};
module.exports.intentType = GetCollection;
module.exports.intentName = "listRepositories";
