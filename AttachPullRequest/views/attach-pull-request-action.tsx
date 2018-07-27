/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, SaveStateIntent, BearerState, Prop } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  @SaveStateIntent() fetcher: any
  @BearerState() attachedPullRequests: Array<any> = []

  attachPullRequest = ({ data, complete }): void => {
    this.fetcher({ body: data })
      .then(() => {
        this.attachedPullRequests = [...this.attachedPullRequests, data.pullRequest]
        complete()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <bearer-navigator
        direction="right"
        btnProps={{ content: 'Attach Pull Request', kind: 'primary' }}
        complete={this.attachPullRequest}
      >
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen name="repository" navigationTitle="Pick Repository">
          <list-repositories />
        </bearer-navigator-screen>
        <bearer-navigator-screen
          renderFunc={({ data }) => <list-pull-requests {...data} />}
          name="pullRequest"
          navigationTitle={data => data.repository.full_name}
        />
      </bearer-navigator>
    )
  }
}
