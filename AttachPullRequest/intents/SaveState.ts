import { SaveState, STATE_CLIENT } from '@bearer/intents'
import { PullRequest, ScenarioState } from './types'
// temporary
STATE_CLIENT.defaults.baseURL = 'https://int.bearer.sh/'

export default class SaveStateIntent {
  static intentName: string = 'SaveState'
  static intentType: any = SaveState

  static action(
    _token,
    _params,
    body: { pullRequest: PullRequest; repository: any },
    state,
    callback: (state: ScenarioState) => void
  ) {
    callback({
      ...state,
      pullRequests: [
        ...(state.pullRequests || []),
        {
          number: body.pullRequest.number,
          fullName: body.repository.full_name
        }
      ]
    })
  }
}
