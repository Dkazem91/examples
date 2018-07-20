import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: 'list-repositories',
  shadow: true
})
export class ListRepositories {
  @Intent('ListRepositories') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}
