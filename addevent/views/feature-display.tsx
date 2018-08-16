/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { RootComponent, Intent, IntentType, Watch, BearerState, BearerFetch, State } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'display',
  group: 'feature'
})
export class FeatureDisplay {

  @Intent('getId', IntentType.RetrieveState)
  fetcher: BearerFetch
  @State() loading: boolean = false
  calendar: any

  @BearerState({
    statePropName: 'calendar'
  })

  @Watch('referenceId')
  handler() {
    this.componentDidLoad()
  }

  componentDidLoad() {
    this.loading = true
    this.fetcher()
      .then(({ data }) => {
        if (data) {
          this.calendar = data
        }
        this.loading = false
      })
      .catch(error => {
        console.error('Error while fetching', error)
        this.loading = false
      })
  }
  
  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    if (!this.calendar) {
      return <p>No calendar selected.</p>
    }
    return [
      <get-event calendar={this.calendar.calendar} />,
      <add-event calendar={this.calendar.calendar} />
    ]
  }
}
