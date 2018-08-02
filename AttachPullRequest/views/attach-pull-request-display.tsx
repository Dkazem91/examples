/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, BearerFetch, BearerState, State, Intent, IntentType, Watch } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @State() loading: boolean = true
  @Intent('RetrieveState', IntentType.RetrieveState)
  fetcher: BearerFetch

  @BearerState({
    statePropName: 'attachedPullRequests'
  })
  prs: Array<any> = []

  @Watch('referenceId')
  handler() {
    this.componentDidLoad()
  }
  componentDidLoad() {
    this.loading = true
    this.fetcher()
      .then(({ data }) => {
        if (data) {
          this.prs = data
        }
        this.loading = false
      })
      .catch(error => {
        console.error('Error while fetching', error)
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
