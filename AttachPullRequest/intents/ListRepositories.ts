import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

export default class ListRepositoriesIntent {
  static intentName: string = 'ListRepositories'
  static intentType: any = GetCollection

  static action(context: TContext, params: any, callback: (params: any) => void) {
    CLIENT.get('user/repos', {
      params: { ...params, per_page: 10 },
      headers: headersFor(context.token)
    })
      .then(response => {
        callback({ collection: response.data })
      })
      .catch(e => {
        callback({ error: e.response.data })
      })
  }
}
