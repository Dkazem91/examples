import { BearerState as ScenarioState } from '@bearer/core'
import { connect } from '../BearerStateDecorator'
import { ActionTypes } from '../store'

function mapDispatchToProps() {
  return {
    pullRequestsReceived: pullRequests => dispatch =>
      dispatch({
        type: ActionTypes.STATE_RECEIVED,
        payload: { pullRequests }
      }),

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
