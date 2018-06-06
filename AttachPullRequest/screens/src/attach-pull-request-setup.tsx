/*
  The purpose of this component is to save scenario credentials.
*/

import { Component } from "@stencil/core";
import "@apizi/ui";

@Component({
  tag: "attach-pull-request-setup",
  shadow: true
})
export class AttachPullRequestSetup {
  render() {
    return (
      <div>
        <apizi-dropdown-button>
          <span slot="buttonText">Setup component</span>
          <apizi-setup scenario-id="BEARER_SCENARIO_ID" />
        </apizi-dropdown-button>
      </div>
    )
  }
}
