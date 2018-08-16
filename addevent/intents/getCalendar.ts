import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class GetCalendarIntent {
  static intentName: string = 'getCalendar'
  static intentType: any = FetchData

  
  static action(context: Toauth2Context, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get(`calendars/${params.id}/events`)
      .then(({ data }) => {
        console.log('=== BEING CALLED ===')
        callback({ data: data.items })
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
  }
}

