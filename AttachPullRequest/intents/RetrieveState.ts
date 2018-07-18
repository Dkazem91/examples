import { RetrieveState } from '@bearer/intents'
import { PullRequest, ScenarioState } from './types'
import { CLIENT } from './client'

export default class RetrieveStateIntent {
  static intentName: string = 'RetrieveState'
  static intentType: any = RetrieveState

  private static pullRequestFetcher = (savedPR: PullRequest): Promise<any> =>
    CLIENT.get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`)
      .then(response => response.data)
      .catch(error => null)

  static action(_token, _params, state: ScenarioState, callback: (state: any) => void) {
    Promise.all((state.pullRequests || []).map(this.pullRequestFetcher)).then(pullRequests => {
      callback({ collection: pullRequests.filter(pr => pr) })
    })
  }
}
