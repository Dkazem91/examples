/*
  The purpose of this component is to save scenario credentials.
*/

import { Component } from "@stencil/core";
import "@bearer/ui";

@Component({
  tag: "attach-pull-request-setup-display",
  shadow: true
})
export class AttachPullRequestSetupDisplay {
  render() {
    return (
      <bearer-setup-display setup-id="BEARER_SCENARIO_ID" />
    )
  }
}