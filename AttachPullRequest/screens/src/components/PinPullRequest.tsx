import { Component, Prop, State } from "@stencil/core";

import Bearer, { BearerComponent } from "@apizi/core";

@BearerComponent
@Component({
  tag: "pin-pull-request",
  styleUrl: "PinPullRequest.css",
  shadow: true
})
export class PinPullRequest {
  @Prop() context: any;

  @State() name: string;

  componentWillLoad() {
    const whatILike = this.context.data["list-pull-requests"];
    const referenceId = this.context.bearerDisplayId;
    console.log("Pin action: ", `BEARER_SCENARIO_ID:${referenceId}`);
    this.name = whatILike.name;
    Bearer.emitter.emit(`BEARER_SCENARIO_ID:${referenceId}`, {
      referenceId,
      whatILike
    });
  }

  render() {
    return <div class="root">And the winner is: {this.name}</div>;
  }
}
