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
  Intent
} from '@bearer/core'
import '@bearer/ui'

import { PR } from './types.d'
import BearerState, { PromisifiedStore } from './BearerStateDecorator'
import { ActionTypes } from './store'

@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() referenceId: string
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

  // componentDidLoad() {
  //   const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`
  //   Bearer.emitter.addListener(
  //     `BEARER_SCENARIO_ID:add:${this.bearerId}`,
  //     ({ pullRequest }) => {
  //       this.pullRequests = [...this.pullRequests, pullRequest]

  //       BearerState.storeData(`BEARER_SCENARIO_ID:${this.bearerId}`, {
  //         pullRequests: this.adaptedPullRequests
  //       })
  //     }
  //   )

  //   Bearer.emitter.addListener(
  //     `BEARER_SCENARIO_ID:remove:${this.bearerId}`,
  //     ({ full_name, number }) => {
  //       this.pullRequests = this.pullRequests.filter(
  //         ({ base: { repo: { full_name: fn } }, number: n }) =>
  //           fn != full_name || n != number
  //       )

  //       BearerState.storeData(referenceId, {
  //         pullRequests: this.adaptedPullRequests
  //       })
  //     }
  //   )

  //   BearerState.getData(referenceId)
  //     .then(({ Item }: { Item: any }) => {
  //       if (Item.pullRequests && Item.pullRequests.length > 0) {
  //         Promise.all(
  //           Item.pullRequests.map(item =>
  //             this.getPullRequest({
  //               fullName: item.full_name,
  //               number: item.number
  //             })
  //           )
  //         ).then(() => {
  //           this.loading = false
  //         })
  //       } else {
  //         this.loading = false
  //       }
  //     })
  //     .catch(e => {
  //       console.error('error', e)
  //       this.loading = false
  //     })
  // }

  fetchState = () => {
    ScenarioState.getData(this.referenceId)
      .then(({ Item }: { Item: any }) => {
        console.log('[BEARER]', Item)
        if (Item.pullRequests && Item.pullRequests.length > 0) {
          Promise.all(Item.pullRequests.map(this.getPullRequest)).then(
            pullRequests => {
              console.log('[BEARER]', 'state', pullRequests)
              this.pullRequestsReceived(pullRequests)
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
        detachPullRequest: pullRequest => dispatch =>
          dispatch({
            type: ActionTypes.PULL_REQUESTED_DETACHED,
            payload: { pullRequest }
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
