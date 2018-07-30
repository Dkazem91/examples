import { SaveState, Toauth2Context } from '@bearer/intents'
import CLIENT from './client'
// temporary
type TBody = {
  what: string
  who?: string
  when: string
}

const ME = 'me'

export default class SaveStateIntent {
  static intentName: string = 'SaveState'
  static intentType: any = SaveState

  static action(context: Toauth2Context, _params, body: TBody, _state: any, callback: (any) => void): void {
    const { what, who = ME, when } = body
    const request = CLIENT(context.authAccess.accessToken).post('reminders.add', {
      text: what,
      time: when,
      user: who === ME ? null : who
    })
    request
      .then(response => {
        console.log('[BEARER]', 'response', response)
        callback({
          object: response.data
        })
      })
      .catch(e =>
        callback({
          object: e.response
        })
      )
  }
}
