import { Prop, Component } from '@bearer/core'
import { PR } from '../types.d'

@Component({
  tag: 'attached-pull-request-item'
})
export class AttachedPullRequestItem {
  @Prop() pullRequest: PR
  @Prop() onRemove: (name: string, number: number) => void

  clickHandler = _e => {
    const { base: { repo: { full_name } }, number } = this.pullRequest
    this.onRemove(full_name, number)
  }

  render() {
    const {
      html_url,
      title,
      number,
      state,
      base,
      head,
      user
    } = this.pullRequest
    return (
      <div class={`pull-request ${state}`}>
        <pull-request-icon state={state} />
        <a class="content" href={html_url} target="_blank">
          <div class="title">{title}</div>
          <div>
            <span>{base.repo.full_name}</span>{' '}
            <span class="number">#{number}</span>{' '}
            <bearer-typography as="span">
              opened by {user.login}
            </bearer-typography>
          </div>
          <div>
            merge <span class="branch">{head.ref}</span> into{' '}
            <span class="branch">{base.ref}</span>
          </div>
        </a>
        <div>
          <bearer-button kind="danger" onClick={this.clickHandler} size="sm">
            X
          </bearer-button>
        </div>
      </div>
    )
  }
}
