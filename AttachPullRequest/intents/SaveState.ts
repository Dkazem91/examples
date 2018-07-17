import { SaveState } from '@bearer/intents'
import { PullRequest, ScenarioState } from './types'

export default class SaveStateIntent {
  static intentName: string = 'saveState'
  static intentType: any = SaveState

  static action(_token, _params, body: PullRequest, state, callback: (state: ScenarioState) => void) {
    callback({
      ...state,
      pullRequests: [...state.pullRequests, body]
    })
  }
}
