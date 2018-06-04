/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Prop, State } from "@stencil/core";

import Bearer, { BearerState } from "@apizi/core";
import "@apizi/ui";

@Component({
  tag: "attach-pull-request-display",
  styleUrl: "AttachPullRequest.css",
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() bearerId = "";
  @State() pullRequests: Array<{ id: string; name: string }> = [];

  componentDidLoad() {
    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`;

    BearerState.getData(referenceId).then(
      function(data) {
        console.log(data);
        this.pullRequests = data.Item.pullRequests || [];
      }.bind(this)
    );

    Bearer.emitter.addListener(
      referenceId,
      function(data) {
        this.pullRequests = [...this.pullRequests, data.whatILike];

        BearerState.storeData(referenceId, {
          pullRequests: this.pullRequests
        }).then(console.log);
      }.bind(this)
    );
  }

  handleRemoveClick(event) {
    const referenceId = `BEARER_SCENARIO_ID:${this.bearerId}`;
    const { objectId } = event.target.dataset;
    this.pullRequests = this.pullRequests.filter(({ id }) => {
      return id != objectId;
    });

    BearerState.storeData(referenceId, {
      pullRequests: this.pullRequests
    }).then(console.log);
  }

  render() {
    return (
      <ul>
        {this.pullRequests.map(({ id, name }) => {
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
