/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component } from '@stencil/core'
import '@apizi/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  render() {
    return (
      <apizi-popover-navigator button="Attach Pull Request" direction="right">
        <apizi-navigator-auth-screen />
        <apizi-navigator-screen renderFunc={() => <hello-world />} />
        <apizi-navigator-screen>
          🎉🎉 Last scenario screen 🎉🎉
        </apizi-navigator-screen>
      </apizi-popover-navigator>
    )
  }
}
