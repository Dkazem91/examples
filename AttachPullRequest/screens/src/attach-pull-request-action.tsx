/* global document */
/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, Prop, State } from '@bearer/core'
import '@bearer/ui'

import BearerState, { PromisifiedStore } from './BearerStateDecorator'
import { ActionTypes } from './store'
@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  @Prop() bearerDisplayId = ''
  @BearerState store: PromisifiedStore
  @State() attachPullRequest: any

  intent = ({ pullRequest }) =>
    this.attachPullRequest(pullRequest) as Promise<any>

  componentDidLoad() {
    this.store.then(({ mapDispatchToProps }) => {
      mapDispatchToProps(this, {
        attachPullRequest: pullRequest => (dispatch, _state) =>
          new Promise((resolve, _reject) => {
            dispatch({
              type: ActionTypes.PULL_REQUEST_SELECTED,
              payload: { pullRequest }
            })
            resolve(true)
          })
      })
    })
  }

  render() {
    return (
      <bearer-popover-navigator button="Attach Pull Request" direction="right">
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen
          navigationTitle="Repositories"
          name="repository"
          renderFunc={() => <list-repositories />}
        />
        <bearer-navigator-screen
          navigationTitle={({ repository: { full_name } }) => full_name}
          name="pullRequest"
          renderFunc={({ data: { repository } }) => (
            <list-pull-requests repository={repository} />
          )}
        />
        <bearer-final-screen perform={this.intent} />
      </bearer-popover-navigator>
    )
  }
}
