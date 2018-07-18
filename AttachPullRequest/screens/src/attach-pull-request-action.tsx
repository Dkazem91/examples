/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, State, Prop, Watch, SaveStateIntent } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  @SaveStateIntent() fetcher: any
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

  componentWillLoad() {
    this.context.subscribe(this)
  }

  componentDidUnload() {
    this.context.unsubscribe(this)
  }

  attachPullRequest = (data): Promise<any> => {
    return this.fetcher({ body: data }).then(
      () => (this.attachedPullRequests = [...this.attachedPullRequests, data.pullRequest])
    )
  }

  render() {
    return (
      <div>
        <bearer-navigator direction="right" btnProps={{ content: 'Attach Pull Request', kind: 'primary' }}>
          <bearer-navigator-auth-screen />
          <bearer-navigator-screen
            renderFunc={() => <list-repositories />}
            name="repository"
            navigationTitle="Pick Repository"
          />
          <bearer-navigator-screen
            renderFunc={({ data }) => <list-pull-requests {...data} />}
            name="pullRequest"
            navigationTitle={data => data.repository.full_name}
          />
          <bearer-navigator-screen
            renderFunc={({ complete, data }) => (
              <attach-pull-request-screen intent={this.attachPullRequest(data)} next={complete} />
            )}
            navigationTitle="Attaching pull request"
          />
        </bearer-navigator>
      </div>
    )
  }
}
