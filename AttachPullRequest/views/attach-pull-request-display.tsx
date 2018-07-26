/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, RetrieveStateIntent, IntentType, BearerFetch, BearerState, Prop, State } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @State() loading: boolean = true
  @RetrieveStateIntent(IntentType.GetCollection) fetcher: BearerFetch

  @BearerState({
    statePropName: 'attachedPullRequests'
  })
  prs: Array<any> = []

  componentDidLoad() {
    this.fetcher()
      .then(({ items }) => {
        this.loading = false
        this.prs = items
      })
      .catch(() => {
        this.loading = false
      })
  }

  get hasAttachedPullRequest(): boolean {
    return Boolean(this.prs.length)
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    const hasPrs = this.hasAttachedPullRequest
    return (
      <bearer-alert kind={hasPrs ? 'info' : 'secondary'}>
        {hasPrs && <ul>{this.prs.map(pr => <li>{pr.title}</li>)}</ul>}
        {!hasPrs && 'No Pull Request attached'}
      </bearer-alert>
    )
  }
}
