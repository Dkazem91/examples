/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, SaveStateIntent, BearerFetch, Prop, State } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'slack-reminder',
  shadow: true
})
export class SlackReminderAction {
  @State() loading: boolean
  @SaveStateIntent() intent: BearerFetch
  @State() reminded: boolean = false
  @Prop() text: string
  @Prop() what?: string
  @Prop() when?: string
  @Prop() who?: string

  perform = ({ who, what, when }): Promise<any> => {
    this.loading = true
    return this.intent({
      body: {
        who,
        what,
        when
      }
    })
      .then(() => {
        this.reminded = true
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  }

  remindMe = (): Promise<any> =>
    this.perform({
      who: this.who,
      what: this.what,
      when: this.when
    })

  remindMeFromScreen = ({ who, what, when }): Promise<any> => {
    return this.perform({
      when: this.when || when,
      what: this.what || what,
      who: this.who || who.id
    })
  }

  complete = ({ data, complete }) =>
    this.remindMeFromScreen(data)
      .then(() => complete())
      .catch(console.error)

  get buttonText(): any {
    return this.text || 'Remind me'
  }

  render() {
    const multipleScreens = !this.who || !this.when || !this.what
    const btnProps: JSXElements.BearerButtonAttributes = {
      kind: this.reminded ? 'success' : 'primary',
      content: this.buttonText,
      disabled: this.loading || false
    }
    return !multipleScreens ? (
      <bearer-authorized
        renderAuthorized={() => <bearer-button onClick={this.remindMe} {...btnProps} content={this.text} />}
        renderUnauthorized={({ authenticate }) => (
          <bearer-button onClick={() => authenticate().then(() => this.remindMe())} {...btnProps} content={this.text} />
        )}
      />
    ) : (
      <bearer-navigator btnProps={btnProps} complete={this.complete}>
        <bearer-navigator-auth-screen />
        {!this.who && (
          <bearer-navigator-screen navigationTitle="Who to remind?" name="who">
            <who-selector />
          </bearer-navigator-screen>
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
      </bearer-navigator>
    )
  }
}
