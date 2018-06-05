const { GetCollection } = require("@apizi/intents");

const axios = require("axios");

const CLIENT = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 5000,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Bearer"
  }
});

function headersFor(token) {
  return {
    Authorization: `token ${token}`
  };
}

module.exports.action = (token, params, callback) =>
  CLIENT.get("user/repos", {
    params,
    headers: headersFor(token)
  })
    .then(response => {
      callback({ collection: response.data });
    })
    .catch(e => {
      console.log(e);
      callback({ collection: [] });
    });

module.exports.intentType = GetCollection;
module.exports.intentName = "listRepositories";
