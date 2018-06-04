/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component } from '@stencil/core'
import '@apizi/ui'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  render() {
    return (
      <div>AttachPullRequest display component </div>
    )
  }
}
