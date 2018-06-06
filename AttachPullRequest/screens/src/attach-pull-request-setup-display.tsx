/*
  The purpose of this component is to save scenario credentials.
*/

import { Component } from "@stencil/core";
import "@apizi/ui";

@Component({
  tag: "attach-pull-request-setup-display",
  shadow: true
})
export class AttachPullRequestSetupDisplay {
  render() {
    return (
      <apizi-setup-display setup-id="BEARER_SCENARIO_ID" />
    )
  }
}