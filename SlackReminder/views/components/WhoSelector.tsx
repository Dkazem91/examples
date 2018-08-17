import { Component, State, Intent, Element, BearerFetch } from '@bearer/core'

@Component({
  tag: 'who-selector',
  shadow: true
})
export class WhoSelector {
  @State()
  who: { id: string; name: string }
  @Intent('ListUsers')
  usersFetch: BearerFetch
  @Element()
  el: HTMLElement

  componentDidUpdate() {
    this.el.shadowRoot.querySelector('bearer-scrollable').reset()
  }

  renderItem = ({ name }: { name: string }) => `@${name}`

  render() {
    return (
      <div class="root">
        <bearer-scrollable
          fetcher={this.usersFetch}
          renderCollection={collection => (
            <bearer-navigator-collection data={collection} renderFunc={this.renderItem} />
          )}
        />
      </div>
    )
  }
}
