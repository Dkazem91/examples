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

  perform = ({ who, what, when }): Promise<any> =>
    this.intent({
      body: {
        who,
        what,
        when
      }
    })

  remindMe = (): Promise<any> =>
    this.perform({
      who: this.who,
      what: this.what,
      when: this.when
    })

  remindMeFromScreen = ({ who, what, when }): Promise<any> => {
    return this.perform({
      when,
      what,
      who: this.who || who.id
    })
  }

  render() {
    const multipleScreens = !this.who || !this.when || !this.what
    const btnProps: JSXElements.BearerButtonAttributes = { kind: 'primary', content: this.text }
    return !multipleScreens ? (
      <bearer-button onClick={this.remindMe} kind="primary" content={this.text} />
    ) : (
      <bearer-dropdown-button btnProps={btnProps} opened={true}>
        <bearer-navigator>
          <bearer-navigator-auth-screen />
          {!this.who && (
            <bearer-navigator-screen
              navigationTitle="Who to remind?"
              renderFunc={({}) => <who-selector />}
              name="who"
            />
          )}
          {!this.what && (
            <bearer-navigator-screen
              navigationTitle="What to remind?"
              renderFunc={({ next }) => <what-selector next={next} />}
              name="what"
            />
          )}
          {!this.when && (
            <bearer-navigator-screen
              navigationTitle="When to remind?"
              renderFunc={({ next }) => <when-selector next={next} />}
              name="when"
            />
          )}
          <bearer-navigator-screen
            navigationTitle="Creating reminder"
            renderFunc={({ data }) =>
              data && (
                <create-reminder
                  intent={this.remindMeFromScreen(data)}
                  data={{ who: this.who, when: this.when, what: this.what, ...data }}
                />
              )
            }
          />
        </bearer-navigator>
      </bearer-dropdown-button>
    )
  }
}
