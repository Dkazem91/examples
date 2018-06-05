const { GetCollection } = require('@apizi/intents')

const axios = require('axios')

const CLIENT = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Bearer'
  }
})

function headersFor(token) {
  return {
    Authorization: `token ${token}`
  }
}

module.exports.action = (token, { fullName, ...params }, callback) =>
  CLIENT.get(`/repos/${fullName}/pulls`, {
    params: { ...params, per_page: 10 },
    headers: headersFor(token)
  })
    .then(response => {
      callback({ collection: response.data })
    })
    .catch(e => {
      console.log(e)
      callback({ collection: [] })
    })
module.exports.intentType = GetCollection
module.exports.intentName = 'listPullRequests'
