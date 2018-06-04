/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, Prop } from "@stencil/core";
import "@apizi/ui";

@Component({
  tag: "attach-pull-request",
  styleUrl: "AttachPullRequest.css",
  shadow: true
})
export class AttachPullRequestAction {
  @Prop() bearerDisplayId = "";
  render() {
    return (
      <apizi-popover-navigator button="Attach Pull Request" direction="right">
        <apizi-navigator-auth-screen />
        <apizi-navigator-screen
          name="list-repositories"
          renderFunc={() => <list-repositories />}
        />
        <apizi-navigator-screen
          name="list-pull-requests"
          renderFunc={context => <list-pull-requests context={context} />}
        />
        <apizi-navigator-screen
          name="pin-pull-request"
          renderFunc={context => (
            <pin-pull-request
              context={{ ...context, bearerDisplayId: this.bearerDisplayId }}
            />
          )}
        />
      </apizi-popover-navigator>
    );
  }
}
