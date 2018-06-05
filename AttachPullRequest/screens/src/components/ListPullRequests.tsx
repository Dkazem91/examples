import { Component, Prop } from '@stencil/core'

import { BearerComponent, Intent, BearerFetch } from '@apizi/core'

@BearerComponent
@Component({
  tag: 'list-pull-requests',
  styleUrl: 'ListPullRequests.css',
  shadow: true
})
export class ListPullRequests {
  @Intent('listPullRequests') fetcher: BearerFetch

  @Prop() context: any

  renderCollection = collection => {
    const display = document.querySelector('attach-pull-request-display')
    const filtered = collection.filter(item => !display.isDisplayed(item))
    return (
      <apizi-navigator-collection
        data={filtered}
        renderFunc={this.renderFunc}
      />
    )
  }

  renderFunc = item => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '4px', position: 'relative' }}>
          <pull-request-icon />
        </span>

        {item.title}
      </span>
    )
  }

  get displayComponent() {
    return
  }

  getPullRequests = () => {
    const fullName = this.context.data['repository'].full_name
    return this.fetcher({ fullName })
  }

  render() {
    return (
      <apizi-scrollable
        fetcher={this.getPullRequests}
        renderCollection={this.renderCollection.bind(this)}
      />
    )
  }
}
