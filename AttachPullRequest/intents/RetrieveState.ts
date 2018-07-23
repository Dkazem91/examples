import { RetrieveState } from '@bearer/intents'
import { PullRequest, ScenarioState } from './types'
import { CLIENT, headersFor } from './client'

export default class RetrieveStateIntent {
  static intentName: string = 'RetrieveState'
  static intentType: any = RetrieveState

  private static pullRequestFetcher = (savedPR: PullRequest): Promise<any> =>
    CLIENT.get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`)
      .then(response => response.data)
      .catch(error => null)

  static action(context, _params, state: ScenarioState, callback: (state: any) => void) {
    const pullRequestFetcher = (savedPR: PullRequest): Promise<any> =>
      CLIENT.get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`, {
        headers: headersFor(context.authAccess.accessToken)
      })
        .then(response => response.data)
        .catch(error => ({ error: error.response }))

    Promise.all((state.pullRequests || []).map(pullRequestFetcher)).then(pullRequests => {
      callback(pullRequests.filter(pr => pr.id))
    })
  }
}
