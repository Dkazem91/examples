import { Component, Prop } from '@bearer/core'
import { State } from '../../node_modules/@stencil/core'

@Component({
  tag: 'create-reminder',
  styleUrl: 'CreateReminder.css',
  shadow: true
})
export class CreateReminder {
  @State() loading: boolean = true
  @Prop() intent: Promise<any>
  @Prop() next: () => void
  @Prop() data: any
  @State() created: boolean = false

  componentDidLoad() {
    this.intent.then(this.next).then(() => {
      this.created = true
    })
  }

  render() {
    if (this.created) {
      return <bearer-alert kind="info">Reminder Created</bearer-alert>
    }
    return (
      <div class="root">
        <p>
          For: {this.data['who'] || 'me'}
          <br />
          What: {this.data['what']}
          <br />
          When: {this.data['when']}
        </p>
        <bearer-loading />
      </div>
    )
  }
}
