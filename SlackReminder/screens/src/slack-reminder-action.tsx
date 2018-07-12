/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'slack-reminder',
  styleUrl: 'SlackReminder.css',
  shadow: true
})
export class SlackReminderAction {
  render() {
    return (
      <div>
        <bearer-typography as="h1" kind="h3">
          SlackReminder Scenario
        </bearer-typography>
        <bearer-navigator>
          <bearer-navigator-auth-screen />
          <bearer-navigator-screen navigationTitle="Characters" renderFunc={() => <list-star-wars-characters />} />
        </bearer-navigator>
      </div>
    )
  }
}
