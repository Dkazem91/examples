import {
  Component,
  Prop,
  BearerComponent,
  Intent,
  BearerFetch
} from '@bearer/core'

// import { Repository } from '../types.d'

@BearerComponent
@Component({
  tag: 'list-pull-requests',
  styleUrl: 'ListPullRequests.css',
  shadow: true
})
export class ListPullRequests {
  @Intent('listPullRequests') fetcher: BearerFetch
  @Prop() repository: any

  // TODO: fix selected
  renderCollection = () => {
    const filtered = true
    return (
      <bearer-navigator-collection
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
    const fullName = this.repository.full_name
    return this.fetcher({ fullName })
  }

  render() {
    return (
      <bearer-scrollable
        fetcher={this.getPullRequests}
        renderCollection={this.renderCollection.bind(this)}
      />
    )
  }
}
