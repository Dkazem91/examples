import { BearerFetch, Component, Intent, Prop } from '@bearer/core'

@Component({
  tag: 'get-events',
  shadow: true
})
export class GetEvents {
  @Intent('getCalendar') fetcher: BearerFetch
  @Prop() calendar: any

  getEvents = (params = {}): Promise<any> => {
    return this.fetcher({ ...params, fullName: this.calendar.id })
  }

  render() {
    return <bearer-scrollable fetcher={this.getEvents} rendererProps={{ displayMemberProp: 'description' }} />
  }
}