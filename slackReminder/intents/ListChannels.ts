import { GetCollection, Toauth2Context } from '@bearer/intents'
import CLIENT from './client'

export default class ListChannelsIntent {
  static intentName: string = 'ListChannels'
  static intentType: any = GetCollection

  static action(context: Toauth2Context, params: any, callback: (params: any) => void) {
    const request = CLIENT(context.authAccess.accessToken).get('channels.list')
    request
      .then(response => {
        if (response.data.ok) {
          callback({
            collection: response.data.channels.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: `Error while fetching channels ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e =>
        callback({
          error: e.toString()
        })
      )
  }
}
