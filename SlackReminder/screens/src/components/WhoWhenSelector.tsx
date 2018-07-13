import { Component } from '@bearer/core'

@Component({
  tag: 'who-when-selector',
  styleUrl: 'WhoWhenSelector.css',
  shadow: true
})
export class WhoWhenSelector {
  render() {
    return (
      <div class="root">
        <bearer-input controlName="who" label="Person/Channel to remind" />
      </div>
    )
  }
}
