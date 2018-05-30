import { Component } from '@stencil/core'
import '@apizi/ui'
import { BearerComponent, Intent, BearerFetch, State } from '@apizi/core'

@BearerComponent
@Component({
  tag: 'i-prefer-cows',
  styleUrl: 'IPreferCows.css',
  shadow: true
})
export class IPreferCows {
  @Intent('cowList') getCows: BearerFetch
  @State() cows: Array<string> = []

  componentDidLoad() {
    this.getCows().then(({ items }) => {
      this.cows = items
    })
  }

  render() {
    return (
      <div>
        IPreferCows component
        <apizi-navigator>
          <apizi-navigator-auth-screen />
          <apizi-navigator-screen>
            <ul>{this.cows.map(cow => <li>{cow}</li>)}</ul>
          </apizi-navigator-screen>
        </apizi-navigator>
      </div>
    )
  }
}
