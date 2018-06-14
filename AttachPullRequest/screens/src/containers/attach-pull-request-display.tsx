import { BearerState as ScenarioState } from '@bearer/core'
import { connect } from '../BearerStateDecorator'
import { ActionTypes } from '../store'

function mapDispatchToProps() {
  return {
    detachPullRequest: pullRequest => (dispatch, state) =>
      ScenarioState.storeData(
        this.bearerId,
        preparePayload(
          state().attachedPullRequests.filter(pr => pr['id'] !== pullRequest.id)
        )
      ).then(() => {
        dispatch({
          type: ActionTypes.PULL_REQUESTED_DETACHED,
          payload: { pullRequest }
        })
      }),
    fetchState: () => dispatch =>
      ScenarioState.getData(this.bearerId)
        .then(({ Item }: { Item: any }) => {
          if (Item.pullRequests) {
            Promise.all(Item.pullRequests.map(this.getPullRequest)).then(
              pullRequests => {
                dispatch({
                  type: ActionTypes.STATE_RECEIVED,
                  payload: { pullRequests: pullRequests.filter(pr => pr['id']) }
                })
              }
            )
          } else {
          }
        })
        .catch(e => {
          console.error('error', e)
        })
  }
}

function mapStateToProps(state) {
  return {
    pullRequests: state.attachedPullRequests
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
