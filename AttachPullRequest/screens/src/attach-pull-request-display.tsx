/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import {
  Component,
  State,
  Prop,
  BearerState as ScenarioState,
  IntentType,
  BearerFetch,
  Intent,
  BearerComponent
} from '@bearer/core'
import '@bearer/ui'

import { PR } from './types.d'
import BearerState, { PromisifiedStore } from './BearerStateDecorator'
import { ActionTypes } from './store'

@BearerComponent
@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() bearerId: string
  @State() loading: boolean = true
  @BearerState store: PromisifiedStore
  @State() pullRequests: Array<PR> = []
  @State() pullRequestsReceived: (pullRequest) => Function
  @State() detachPullRequest: (pullRequest) => Function

  @Intent('getPullRequest', IntentType.GetResource)
  fetcher: BearerFetch

  getPullRequest = ({ fullName, number }) =>
    this.fetcher({ fullName, id: number })
      .then(({ object: pullRequest }) => pullRequest)
      .catch(e => console.log(e))

  fetchState = () => {
    ScenarioState.getData(this.bearerId)
      .then(({ Item }: { Item: any }) => {
        console.log('[BEARER]', Item)
        if (Item.pullRequests) {
          Promise.all(Item.pullRequests.map(this.getPullRequest)).then(
            pullRequests => {
              this.pullRequestsReceived(pullRequests.filter(pr => pr['id']))
              this.loading = false
            }
          )
        } else {
          this.loading = false
        }
      })
      .catch(e => {
        console.error('error', e)
        this.loading = false
      })
  }

  componentDidLoad() {
    this.store.then(({ mapStateToProps, mapDispatchToProps }) => {
      mapStateToProps(this, ({ attachedPullRequests: pullRequests }) => ({
        pullRequests
      }))
      mapDispatchToProps(this, {
        pullRequestsReceived: pullRequests => dispatch =>
          dispatch({
            type: ActionTypes.STATE_RECEIVED,
            payload: { pullRequests }
          }),
        detachPullRequest: pullRequest => (dispatch, state) =>
          ScenarioState.storeData(
            this.bearerId,
            preparePayload(
              state().attachedPullRequests.filter(
                pr => pr['id'] !== pullRequest.id
              )
            )
          ).then(() => {
            dispatch({
              type: ActionTypes.PULL_REQUESTED_DETACHED,
              payload: { pullRequest }
            })
          })
      })

      this.fetchState()
    })
  }

  handleRemoveClick = pullRequest => {
    this.detachPullRequest(pullRequest)
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    if (this.pullRequests.length === 0) {
      return 'No PR attached yet'
    }
    return this.pullRequests.map(pr => (
      <attached-pull-request-item
        pullRequest={pr}
        onRemove={this.handleRemoveClick}
      />
    ))
  }
}

function preparePayload(pullRequests) {
  return {
    pullRequests: pullRequests.map(
      ({
        number,
        base: {
          repo: { full_name }
        }
      }) => ({
        number,
        fullName: full_name
      })
    )
  }
}
