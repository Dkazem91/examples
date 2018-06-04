/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Prop, State } from '@stencil/core'

import Bearer, {
  BearerState,
  Intent,
  IntentType,
  BearerFetch,
  BearerComponent
} from '@apizi/core'
import '@apizi/ui'

@BearerComponent
@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() bearerId = ''
  @State() pullRequest: { id: string; name: string }

  @Intent('getPullRequest', IntentType.GetResource)
  fetcher: BearerFetch

  getPullRequest = ({ fullName, number }) => {
    this.fetcher({ fullName, id: number }).then(({ object: pullRequest }) => {
      if (pullRequest && pullRequest.id) {
        this.pullRequest = pullRequest
      }
    })
  }

  componentDidLoad() {
    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:add:${this.bearerId}`,
      ({ pullRequest }) => {
        this.pullRequest = pullRequest
      }
    )

    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:remove:${this.bearerId}`,
      () => {
        this.pullRequest = null
      }
    )

    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`
    BearerState.getData(referenceId).then(({ Item }) => {
      if (Item) {
        this.getPullRequest({ fullName: Item.fullName, number: Item.number })
      }
    })
  }

  handleRemoveClick = () => {
    const referenceId = `BEARER_SCENARIO_ID:remove:${this.bearerId}`
    Bearer.emitter.emit(referenceId)
    BearerState.removeData(`BEARER_SCENARIO_ID:${this.bearerId}`).then(
      console.log
    )
  }

  render() {
    if (!this.pullRequest) {
      return 'No PR attached yet'
    }
    return (
      <div>
        <pre>{JSON.stringify(this.pullRequest)}</pre>
        <button onClick={this.handleRemoveClick}>✗</button>
      </div>
    )
  }
}
