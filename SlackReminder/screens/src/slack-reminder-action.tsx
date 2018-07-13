/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, SaveStateIntent, BearerFetch, Prop } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'slack-reminder',
  styleUrl: 'SlackReminder.css',
  shadow: true
})
export class SlackReminderAction {
  @SaveStateIntent() intent: BearerFetch
  
  @Prop() text: string
  @Prop() what?: string
  @Prop() when?: string
  @Prop() who?: string
  // @Prop() remindMe: boolean = false
  remindMe = () =>
    this.intent({
      body: {
        who: this.who,
        what: this.what,
        when: this.when
      }
    }).then(console.log)

  render() {
    const multipleScreens = !this.who || !this.when || !this.what 
    const btnProps: JSXElements.BearerButtonAttributes = { kind: 'primary', content: this.text } 
    return !multipleScreens 
        ?
          <bearer-button onClick={this.remindMe} kind="primary" content={this.text} />
        : <bearer-dropdown-button btnProps={btnProps}>
            <div>Ok</div>
          </bearer-dropdown-button>
      // <div>
      //   <bearer-typography as="h1" kind="h3">
      //     <span>SlackReminder Scenario</span>
      //   </bearer-typography>
      //   <bearer-navigator>
      //     <bearer-navigator-auth-screen />
      //     {!this.remindMe &&
      //       <bearer-navigator-screen
      //         navigationTitle="Who?"
      //         renderFunc={() => <who-when-selector intent={this.intent} />}
      //       />
      //     }
      //   </bearer-navigator>
      // </div>
    )
  }
}
