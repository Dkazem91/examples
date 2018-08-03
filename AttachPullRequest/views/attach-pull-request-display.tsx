/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, BearerFetch, BearerState, State, Intent, IntentType, Watch, Prop } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() referenceId: string
  render() {
    return (
      <bearer-authorized renderAuthorized={() => <display-attached-pull-requests referenceId={this.referenceId} />} />
    )
  }
}
