import { FetchData, TapiKeyContext, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class GetCalendarsIntent {
  static intentName: string = 'getCalendars'
  static intentType: any = FetchData

  
  static action(context: TapiKeyContext, params: any, body: any, callback: TFetchDataCallback) {
    //... your code goes here
    // use the client defined in client.ts to fetch real object like that:
    // Client(context.authAccess.accessToken).get(`/users/me/calendarList?key=${context.authAccess.apiKey}`)
    Client(context.authAccess.accessToken).get('/users/me/calendarList')
      .then(({ data }) => {
        callback({ data: data.items })
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
    // callback({ data: []})
  }
  
}

