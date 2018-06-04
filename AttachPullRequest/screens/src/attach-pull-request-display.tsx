/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Prop, State } from '@stencil/core'

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
  @Prop() bearerId = ''
  @State() pullRequest: PR

  @Intent('getPullRequest', IntentType.GetResource)
  fetcher: BearerFetch

  getPullRequest = ({ fullName, number }) => {
    this.fetcher({ fullName, id: number }).then(({ object: pullRequest }) => {
      if (pullRequest && pullRequest.id) {
        this.pullRequest = pullRequest
      }
    })
  }

  componentDidLoad() {
    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:add:${this.bearerId}`,
      ({ pullRequest }) => {
        this.pullRequest = pullRequest
      }
    )

    Bearer.emitter.addListener(
      `BEARER_SCENARIO_ID:remove:${this.bearerId}`,
      () => {
        this.pullRequest = null
      }
    )

    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`
    BearerState.getData(referenceId).then(({ Item }) => {
      if (Item) {
        this.getPullRequest({ fullName: Item.fullName, number: Item.number })
      }
    })
  }

  handleRemoveClick = () => {
    const referenceId = `BEARER_SCENARIO_ID:remove:${this.bearerId}`
    Bearer.emitter.emit(referenceId)
    BearerState.removeData(`BEARER_SCENARIO_ID:${this.bearerId}`).then(
      console.log
    )
  }

  render() {
    if (!this.pullRequest) {
      return 'No PR attached yet'
    }
    const { url, title, number, state, base, head, user } = this.pullRequest
    console.log({ url, title, number, state, base, head, user })
    return (
      <div class={`root ${state}`}>
        <svg
          width="1rem"
          height="1rem"
          viewBox="0 0 12 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
          />
        </svg>
        <a class="content" href={url} target="_blank">
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
            onClick={this.handleRemoveClick}
            size="sm"
          >
            X
          </apizi-button>
        </div>
      </div>
    )
  }
}
