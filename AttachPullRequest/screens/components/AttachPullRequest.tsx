import { Component, Prop } from '@bearer/core'

@Component({
  tag: 'attach-pull-request-screen',
  shadow: true
})
export class AttachPullRequest {
  @Prop() intent: Promise<any>
  @Prop() next: () => void

  componentWillLoad() {
    this.intent.then(this.next)
  }

  render() {
    return <bearer-loading />
  }
}
