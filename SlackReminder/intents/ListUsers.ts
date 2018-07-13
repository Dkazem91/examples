import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

export default class ListUsersIntent {
  static intentName: string = 'ListUsers'
  static intentType: any = GetCollection

  static action(context: TContext, params: any, callback: (params: any) => void) {
    const request = CLIENT.get('users.list', headersFor(context.accessToken))
    request
      .then(response => {
        if (response.data.ok) {
          callback({
            collection: response.data.users.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: 'Error while fetching users', data: response.data })
        }
      })
      .catch(e =>
        callback({
          error: e.toString()
        })
      )
  }
}
