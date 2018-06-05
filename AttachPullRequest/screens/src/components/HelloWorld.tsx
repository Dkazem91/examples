import { Component } from '@stencil/core'

import { BearerComponent, Intent, BearerFetch } from '@apizi/core'

@BearerComponent
@Component({
  tag: 'hello-world',
  styleUrl: 'HelloWorld.css',
  shadow: true
})
export class HelloWorld {
  @Intent('getHelloWorlds') fetcher: BearerFetch

  render() {
    return (
      <div class="root">
        <h1>Hello from your first scenario</h1>
        <apizi-paginator
          fetcher={this.fetcher}
          perPage={10}
          renderCollection={ collection => (
            <apizi-navigator-collection
              data={collection}
              renderFunc={item => item}
            />
          )}
        />
      </div>
    )
  }
}
