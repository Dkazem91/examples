import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

export default class ListChannelsIntent {
  static intentName: string = 'ListChannels'
  static intentType: any = GetCollection

  static action(context: TContext, params: any, callback: (params: any) => void) {
    const request = CLIENT.get('channels.list', headersFor(context.accessToken))
    request
      .then(response => {
        if (response.data.ok) {
          callback({
            collection: response.data.channels.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: 'Error while fetching channels', data: response.data })
        }
      })
      .catch(e =>
        callback({
          error: e.toString()
        })
      )
  }
}
