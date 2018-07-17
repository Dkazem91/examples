/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  render() {
    return (
      <div>
        <bearer-navigator>
        </bearer-navigator>
      </div>
    )
  }
}
