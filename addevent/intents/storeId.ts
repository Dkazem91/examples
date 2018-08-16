import { SaveState, Toauth2Context, TSaveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'

export default class StoreIdIntent {
  static intentName: string = 'storeId'
  static intentType: any = SaveState

  
  static action(
    _context: Toauth2Context,
    _params: any,
    body: any,
    state: any,
    callback: TSaveStateCallback
  ): void {
    callback({
      state: {
        ...state,
        calendar: body
      },
      data: body
    })
  }
  
}

