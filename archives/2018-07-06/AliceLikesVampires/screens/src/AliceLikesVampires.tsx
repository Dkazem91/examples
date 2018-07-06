import { Component } from '@stencil/core'
import '@apizi/ui'

import { BearerComponent, Intent, BearerFetch } from '@apizi/core'

@BearerComponent
@Component({
  tag: 'alice-likes-vampires',
  styleUrl: 'AliceLikesVampires.css',
  shadow: true
})
export class AliceLikesVampires {
  @Intent('vampireList') fetcher: BearerFetch

  render() {
    return (
      <div style={{ width: '400px' }}>
        Alice prefers Vampires
        <apizi-navigator>
          <apizi-navigator-auth-screen />
          <apizi-navigator-screen
            renderFunc={() => (
              <apizi-paginator
                fetcher={this.fetcher}
                renderCollection={collection => (
                  <apizi-navigator-collection
                    data={collection}
                    renderFunc={item => item}
                  />
                )}
              />
            )}
          />
          <apizi-navigator-screen renderFunc={data => <div>👍 : {data}</div>} />
        </apizi-navigator>
      </div>
    )
  }
}
