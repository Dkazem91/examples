import { Component, Intent, BearerFetch, Element } from '@bearer/core'
import { State } from '../../node_modules/@stencil/core'

@Component({
  tag: 'who-selector',
  shadow: true
})
export class WhoWhenSelector {
  @State() who: { id: string; name: string }
  @State() kind: 'person' | 'channel' = 'person'
  @Intent('ListChannels') channelsFetch: BearerFetch
  @Intent('ListUsers') usersFetch: BearerFetch
  @Element() el: HTMLElement

  get fetcher(): BearerFetch {
    console.log('[BEARER]', 'kind', this.kind)
    return this.kind === 'person' ? this.usersFetch : this.channelsFetch
  }

  changeKind = kind => {
    this.kind = kind
  }

  componentDidUpdate() {
    this.el.shadowRoot.querySelector('bearer-scrollable').reset()
  }

  renderItem = ({ name }: { name: string }) => `${this.kind === 'person' ? '@' : '#'}${name}`

  render() {
    return (
      <div class="root">
        <button onClick={() => this.changeKind('person')}>Someone</button>
        <button onClick={() => this.changeKind('channel')}>A channel</button>
        <bearer-scrollable
          fetcher={this.fetcher}
          renderCollection={collection => (
            <bearer-navigator-collection data={collection} renderFunc={this.renderItem} />
          )}
        />
      </div>
    )
  }
}
