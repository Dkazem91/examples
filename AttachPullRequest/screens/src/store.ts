import { createStore } from 'redux'
import { State, Action, PR } from './types.d'

export enum ActionTypes {
  REPOSITORIES_RECEIVED = 'REPOSITORIES_RECEIVED',
  REPOSITORY_SELECTED = 'REPOSITORY_SELECTED',
  STATE_RECEIVED = 'STATE_RECEIVED',
  PULL_REQUESTS_RECEIVED = 'PULL_REQUESTS_RECEIVED',
  PULL_REQUEST_SELECTED = 'PULL_REQUEST_SELECTED',
  PULL_REQUESTED_DETACHED = 'PULL_REQUESTED_DETACHED'
}

// reducers/scenario.js
const initialState: State = {
  pullRequests: [],
  repositories: [],
  respository: null,
  attachedPullRequests: [
    {
      id: 'ok',
      html_url: 'ok',
      title: 'ok',
      number: 42,
      state: 'open',
      base: {
        label: 'label',
        ref: 'ref',
        repo: {
          url: 'ok',
          name: 'repo name',
          full_name: 'repo full_name'
        }
      },
      head: {
        label: 'label',
        ref: 'ref',
        repo: {
          url: 'ok',
          name: 'repo name',
          full_name: 'repo full_name'
        }
      },
      user: {
        login: 'ok'
      }
    }
  ]
}

/* Reducers */
const scenario = (state: State = initialState, { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.REPOSITORIES_RECEIVED: {
      return {
        ...state,
        repositories: payload,
        pullRequests: []
      }
    }
    case ActionTypes.REPOSITORY_SELECTED: {
      return {
        ...state,
        respository: payload
      }
    }

    case ActionTypes.PULL_REQUESTS_RECEIVED: {
      return {
        ...state,
        pullRequests: payload
      }
    }

    case ActionTypes.PULL_REQUEST_SELECTED: {
      return {
        ...state,
        attachedPullRequests: [
          ...state.attachedPullRequests,
          payload['pullRequest']
        ]
      }
    }

    case ActionTypes.PULL_REQUESTED_DETACHED: {
      return {
        ...state,
        attachedPullRequests: [
          ...state.attachedPullRequests.filter(
            pr => pr.id !== payload['pullRequest']['id']
          )
        ]
      }
    }

    case ActionTypes.STATE_RECEIVED: {
      return {
        ...state,
        attachedPullRequests: payload['pullRequests']
      }
    }

    default: {
      return state
    }
  }
}

// end reducers/scenario.js

/* Selectors */
type GlobalState = {
  scenario: State
}

export const getPullRequest = ({ scenario }: GlobalState): Array<PR> =>
  scenario.pullRequests

/* Store */
const configStore = () => {
  return createStore(
    scenario,
    undefined,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']({
        instanceId: 'BEARER_SCENARIO_ID'
      })
  )
}

export { configStore }
