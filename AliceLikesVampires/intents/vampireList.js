const { GetCollection } = require('@apizi/intents')

module.exports.action = (token, params, callback) => {
  callback({ collection: ['Cedric', 'Pierre', 'Radek'] })
}
module.exports.intentType = GetCollection
module.exports.intentName = 'vampireList'
