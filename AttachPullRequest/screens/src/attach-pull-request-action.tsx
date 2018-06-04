/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, Prop } from '@stencil/core'
import Bearer, { BearerState } from '@apizi/core'

import '@apizi/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  @Prop() bearerDisplayId = ''

  intent = ({ pullRequest, repository }) =>
    BearerState.storeData(`BEARER_SCENARIO_ID:${this.bearerDisplayId}`, {
      number: pullRequest.number,
      fullName: repository.full_name
    }).then(() =>
      Bearer.emitter.emit(`BEARER_SCENARIO_ID:add:${this.bearerDisplayId}`, {
        pullRequest
      })
    )

  render() {
    return (
      <apizi-popover-navigator button="Attach Pull Request" direction="right">
        <apizi-navigator-auth-screen />
        <apizi-navigator-screen
          name="repository"
          renderFunc={() => <list-repositories />}
        />
        <apizi-navigator-screen
          name="pullRequest"
          renderFunc={context => <list-pull-requests context={context} />}
        />
        <bearer-final-screen perform={this.intent} />
      </apizi-popover-navigator>
    )
  }
}

{
  /* <apizi-navigator-screen
  name="pin-pull-request"
  renderFunc={context => (
    <pin-pull-request
      context={{ ...context, bearerDisplayId: this.bearerDisplayId }}
    />
  )}
/> */
}
