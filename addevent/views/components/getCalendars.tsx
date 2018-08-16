import { BearerFetch, Component, Intent } from '@bearer/core'

@Component({
  tag: 'get-calendars',
  shadow: true
})
export class GetCalendars {
  @Intent('getCalendars') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} rendererProps={{ displayMemberProp: 'id' }} />
  }
}