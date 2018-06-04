const { GetCollection } = require("@apizi/intents");

module.exports.action = (token, params, callback) => {
  callback({
    collection: [
      { id: "Christopher Robin PR id", name: "Christopher Robin PR" },
      { id: "Kanga PR id", name: "Kanga PR" },
      { id: "Tigger PR id", name: "Tigger PR" },
      { id: "heffalump PR id", name: "heffalump PR" },
      { id: "kessie PR id", name: "kessie PR" }
    ]
  });
};
module.exports.intentType = GetCollection;
module.exports.intentName = "listPullRequests";
