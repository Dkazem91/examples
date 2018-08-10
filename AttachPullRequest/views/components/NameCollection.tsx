import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: 'name-collection',
  styleUrl: 'NameCollection.css',
  shadow: true
})
export class NameCollection {
  @Intent('NameCollection') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}