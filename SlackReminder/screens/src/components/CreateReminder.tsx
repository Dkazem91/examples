import { Component, Prop, Event, EventEmitter } from '@bearer/core'
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

  componentDidLoad() {
    this.intent.then(this.next)
  }

  render() {
    return (
      <div class="root">
        <p>
          For: {this.data['who']}
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
