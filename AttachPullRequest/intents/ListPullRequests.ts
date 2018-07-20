import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

type TParams = {
  fullName: string
}

type TCallbackParams = {
  collection: Array<any>
}

export default class ListPullRequestsIntent {
  static intentName: string = 'ListPullRequests'
  static intentType: any = GetCollection

  static action(context: TContext, params: TParams, callback: (params: TCallbackParams) => void) {
    CLIENT.get(`/repos/${params.fullName}/pulls`, {
      params: { ...params, per_page: 10 },
      headers: headersFor(context.authAccess.accessToken)
    })
      .then(response => {
        callback({ collection: response.data })
      })
      .catch(e => {
        callback({ collection: [] })
      })
  }
}
