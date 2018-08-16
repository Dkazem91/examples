/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Intent, IntentType, BearerState } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Intent('storeId', IntentType.SaveState)
  fetcher: any
  @BearerState() calendar: Array<any> = []

  linkCalendar = ({ data, complete }): void => {
    console.log(data)
    this.fetcher({ body: data })
      .then(() => {
        this.calendar = data.id
        complete()
      })
      .catch(error => {
        throw error
      })
  }

  render() {
    return (
      <bearer-navigator btnProps={ { content:"Choose a calendar", kind:"primary" } } direction="right" complete={this.linkCalendar}>
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen navigationTitle="Choose a calendar">
          <get-calendars />
        </bearer-navigator-screen>
        <bearer-navigator-screen navigationTitle="Choose a date">
          <show-calendar />
        </bearer-navigator-screen>
      </bearer-navigator>
    )
  }
}
