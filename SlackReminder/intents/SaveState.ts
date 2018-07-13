import { SaveState, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

export default class SaveStateIntent {
  static intentName: string = 'SaveState'
  static intentType: any = SaveState

  static action(context, _params, { what, _who, when }: any, state: any, callback: (any) => void): void {
    const request = CLIENT.post(
      'reminders.add',
      {
        text: what,
        time: when
      },
      headersFor(context.accessToken)
    )
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
