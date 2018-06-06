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
    const innerListener = `BEARER_SCENARIO_ID:setup_success:BEARER_SCENARIO_ID`
    return (
      <div>
        <apizi-dropdown-button innerListener={innerListener}>
          <span slot="buttonText">Setup component</span>
          <apizi-setup scenario-id="BEARER_SCENARIO_ID" />
        </apizi-dropdown-button>
      </div>
    )
  }
}
