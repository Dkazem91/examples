const { GetCollection } = require('@apizi/intents')

module.exports.action = (token, params, callback) => {
  callback({ collection: ['Gertrude', 'Betty', 'Jeanne'] })
}
module.exports.intentType = GetCollection
module.exports.intentName = 'cowList'
