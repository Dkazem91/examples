/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Prop, State } from "@stencil/core";

import Bearer, { BearerState, Intent, BearerFetch } from "@apizi/core";
import "@apizi/ui";

@Component({
  tag: "attach-pull-request-display",
  styleUrl: "AttachPullRequest.css",
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() bearerId = "";
  @State()
  prs: {
    pullRequests: Array<{ id: string; name: string }>;
    pullRequestsDisplay: Array<any>;
  } = { pullRequests: [], pullRequestsDisplay: [] };
  @Intent("getPullRequest") fetcher: BearerFetch;

  async componentDidLoad() {
    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`;

    try {
      const { Item } = await BearerState.getData(referenceId);
      this.prs.pullRequests = Item.pullRequests || [];
      // const displayData = await this.fetcher({ fullName: [] });
      this.prs.pullRequestsDisplay = null;
    } catch (e) {
      console.log(e);
      this.prs = { pullRequests: [], pullRequestsDisplay: [] };
    }

    Bearer.emitter.addListener(
      referenceId,
      function(data) {
        this.prs.pullRequests = [...this.prs.pullRequests, data.pullRequest];

        BearerState.storeData(referenceId, {
          pullRequests: this.prs.pullRequests
        }).then(console.log);
      }.bind(this)
    );
  }

  handleRemoveClick(event) {
    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`;
    const { objectId } = event.target.dataset;
    this.prs.pullRequests = this.prs.pullRequests.filter(({ id }) => {
      return id != objectId;
    });

    BearerState.storeData(referenceId, {
      pullRequests: this.prs.pullRequests
    }).then(console.log);
  }

  render() {
    return (
      <ul>
        {this.prs.pullRequestsDisplay.map(({ id, name }) => {
          return (
            <div>
              <li>{name} </li>
              <span
                data-object-id={id}
                onClick={this.handleRemoveClick.bind(this)}
              >
                ✗
              </span>
            </div>
          );
        })}
      </ul>
    );
  }
}
