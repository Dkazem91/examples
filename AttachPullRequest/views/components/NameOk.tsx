import { Component } from '@bearer/core'

@Component({
  tag: 'name-ok',
  styleUrl: 'NameOk.css',
  shadow: true
})
export class NameOk {
  render() {
    return (
      <div class="root">
        <bearer-typography as="h2">
          NameOk Component
        </bearer-typography>
      </div>
    )
  }
}
