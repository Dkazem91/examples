/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Prop, State, Method } from '@stencil/core'

import Bearer, {
  BearerState,
  Intent,
  IntentType,
  BearerFetch,
  BearerComponent
} from '@apizi/core'
import '@apizi/ui'
import { PR } from './types.d'

@BearerComponent
@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @State() loading = true
  @Prop() bearerId = ''
  @State() pullRequests: Array<PR> = []

  @Intent('getPullRequest', IntentType.GetResource)
  fetcher: BearerFetch

  getPullRequest = ({ fullName, number }) =>
    this.fetcher({ fullName, id: number })
      .then(({ object: pullRequest }) => {
        this.pullRequests = [
          ...this.pullRequests,
          { ...pullRequest, full_name: fullName }
        ]
      })
      .catch(e => console.log(e))

  get adaptedPullRequests() {
    return this.pullRequests.map(
      ({ number, base: { repo: { full_name } } }) => {
        return { number, full_name }
      }
    )
  }

  @Method()
  isDisplayed({ number, base: { repo: { full_name } } }) {
    return this.adaptedPullRequests.find(
      ({ full_name: fn, number: n }) => fn === full_name && n === number
    )
  }

  componentDidLoad() {
    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`
    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:add:${this.bearerId}`,
      ({ pullRequest }) => {
        this.pullRequests = [...this.pullRequests, pullRequest]

        BearerState.storeData(`BEARER_SCENARIO_ID:${this.bearerId}`, {
          pullRequests: this.adaptedPullRequests
        })
      }
    )

    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:remove:${this.bearerId}`,
      ({ full_name, number }) => {
        this.pullRequests = this.pullRequests.filter(
          ({ base: { repo: { full_name: fn } }, number: n }) =>
            fn != full_name || n != number
        )

        BearerState.storeData(referenceId, {
          pullRequests: this.adaptedPullRequests
        })
      }
    )

    BearerState.getData(referenceId).then(({ Item }) => {
      if (Item.pullRequests && Item.pullRequests.length > 0) {
        Promise.all(
          Item.pullRequests.map(item =>
            this.getPullRequest({
              fullName: item.full_name,
              number: item.number
            })
          )
        ).then(() => {
          this.loading = false
        })
      } else {
        this.loading = false
      }
    })
  }

  handleRemoveClick = (full_name, number) => () => {
    console.log('Bearer ID:', this.bearerId)
    const referenceId = `BEARER_SCENARIO_ID:remove:${this.bearerId}`
    Bearer.emitter.emit(referenceId, { full_name, number })
  }

  renderPullRequest = ({
    html_url,
    title,
    number,
    state,
    base,
    head,
    user
  }) => {
    return (
      <div class={`pull-request ${state}`}>
        <pull-request-icon state={state} />
        <a class="content" href={html_url} target="_blank">
          <div class="title">{title}</div>
          <div>
            <span>{base.repo.full_name}</span>{' '}
            <span class="number">#{number}</span>{' '}
            <apizi-typography as="span">
              opened by {user.login}
            </apizi-typography>
          </div>
          <div>
            merge <span class="branch">{head.ref}</span> into{' '}
            <span class="branch">{base.ref}</span>
          </div>
        </a>
        <div>
          <apizi-button
            kind="danger"
            onClick={this.handleRemoveClick(base.repo.full_name, number)}
            size="sm"
          >
            X
          </apizi-button>
        </div>
      </div>
    )
  }
  render() {
    if (this.loading) {
      return <apizi-loading />
    }
    if (this.pullRequests.length === 0) {
      return 'No PR attached yet'
    }
    return this.pullRequests.map(this.renderPullRequest)
  }
}
