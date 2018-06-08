const { GetObject } = require("@bearer/intents");

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

module.exports.action = (token, { fullName, id, ...params }, callback) => {
  CLIENT.get(`/repos/${fullName}/pulls/${id}`, {
    params,
    headers: headersFor(token)
  })
    .then(response => {
      callback({ object: response.data });
    })
    .catch(e => {
      console.log(e);
      callback({ object: null });
    });
};
module.exports.intentType = GetObject;
module.exports.intentName = "getPullRequest";
