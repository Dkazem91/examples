import { RetrieveState } from '@bearer/intents'
import { ScenarioState } from './types'

export default class RetrieveStateIntent {
  static intentName: string = 'RetrieveState'
  static intentType: any = RetrieveState

  static action(_token, _params, state: ScenarioState, callback: (state: ScenarioState) => void) {
    callback(state)
  }
}
