import { Component } from '@bearer/core'

@Component({
  tag: 'show-calendar',
  styleUrl: 'showCalendar.css',
  shadow: true
})
export class ShowCalendar {
  render() {
    return (
      <div class="root">
        <bearer-typography as="h2">
          ShowCalendar Component
        </bearer-typography>
      </div>
    )
  }
}
