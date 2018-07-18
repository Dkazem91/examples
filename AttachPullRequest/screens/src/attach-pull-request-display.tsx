/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, State, Prop, Watch, RetrieveStateIntent, IntentType, BearerFetch } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @RetrieveStateIntent(IntentType.GetCollection) fetcher: BearerFetch
  @Prop({ context: 'bearer' })
  context: any
  @State() attachedPullRequests: Array<any> = []

  @Watch('attachedPullRequests')
  changeRepo(newValue: any) {
    console.log('[BEARER]', 'attachedPullRequests updated')
    this.context.update('attachedPullRequests', newValue)
  }

  updateFromState = state => {
    this.attachedPullRequests = state['attachedPullRequests']
  }

  componentDidLoad() {
    this.fetcher().then(payload => {
      console.log('[BEARER]', 'payload', payload)
    })
  }

  componentWillLoad() {
    this.context.subscribe(this)
  }

  componentDidUnload() {
    this.context.unsubscribe(this)
  }

  get hasAttachedPullRequest(): boolean {
    return Boolean(this.attachedPullRequests.length)
  }

  render() {
    const hasPrs = this.hasAttachedPullRequest
    return (
      <bearer-alert kind={hasPrs ? 'info' : 'secondary'}>
        {hasPrs && <ul>{this.attachedPullRequests.map(pr => <li>{pr.title}</li>)}</ul>}
        {!hasPrs && 'No Pull Request attached'}
      </bearer-alert>
    )
  }
}
