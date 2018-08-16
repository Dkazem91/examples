import { Component, Prop } from '@bearer/core'

@Component({
  tag: 'add-event',
  styleUrl: 'addEvent.css',
  shadow: true
})
export class AddEvent {
  @Prop() calendar: any

  render() {
    return (
      <div class="root">
        <bearer-typography as="h2">
          AddEvent Component {this.calendar.id}
        </bearer-typography>
      </div>
    )
  }
}
