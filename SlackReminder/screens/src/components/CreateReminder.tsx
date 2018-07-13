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
  @Prop() data: any

  componentDidLoad() {
    this.intent.then(console.log)
  }

  render() {
    return (
      <div class="root">
        <bearer-loading />
        {JSON.stringify(this.data)}
      </div>
    )
  }
}
