/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, RetrieveStateIntent, IntentType, BearerFetch, BearerState, Prop } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() referenceId: string
  @RetrieveStateIntent(IntentType.GetCollection) fetcher: BearerFetch

  @BearerState({
    statePropName: 'attachedPullRequests'
  })
  prs: Array<any> = []

  componentDidLoad() {
    this.fetcher().then(payload => {
      console.log('[BEARER]', 'payload', payload)
    })
  }

  get hasAttachedPullRequest(): boolean {
    return Boolean(this.prs.length)
  }

  render() {
    const hasPrs = this.hasAttachedPullRequest
    return (
      <bearer-alert kind={hasPrs ? 'info' : 'secondary'}>
        {hasPrs && <ul>{this.prs.map(pr => <li>{pr.title}</li>)}</ul>}
        {!hasPrs && 'No Pull Request attached'}
      </bearer-alert>
    )
  }
}
