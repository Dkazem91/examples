import { Component } from '@bearer/core'

@Component({
  tag: 'show-calendar',
  styleUrl: 'showCalendar.css',
  shadow: true
})
export class ShowCalendar {

  getCurrentDate() {
    return new Date().toISOString().slice(0, 10)
  }

  render() {
    return (
      <div class="root">
        <bearer-typography as="h3">
          Pick a date
        </bearer-typography>
        <input type="date" name="date" class="form-control"
          value={this.getCurrentDate()}
          min={this.getCurrentDate()} max="2022-12-31" />
      </div>
    )
  }
}
