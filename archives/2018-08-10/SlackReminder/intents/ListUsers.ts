import { GetCollection, Toauth2Context } from '@bearer/intents'
import CLIENT from './client'

export default class ListUsersIntent {
  static intentName: string = 'ListUsers'
  static intentType: any = GetCollection

  static action(context: Toauth2Context, params: any, callback: (params: any) => void) {
    const request = CLIENT(context.authAccess.accessToken).get('users.list')
    request
      .then(response => {
        if (response.data.ok) {
          callback({
            collection: response.data.members.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: `Error while fetching users ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e => {
        console.log('[BEARER]', 'e', e)
        callback({
          error: e.toString()
        })
      })
  }
}
