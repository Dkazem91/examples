import { Component } from "@stencil/core";

import { BearerComponent, Intent, BearerFetch } from "@apizi/core";

@BearerComponent
@Component({
  tag: "list-pull-requests",
  styleUrl: "ListPullRequests.css",
  shadow: true
})
export class ListPullRequests {
  @Intent("listPullRequests") fetcher: BearerFetch;

  renderFunc = item => {
    return <span>{item.name}</span>;
  };
  render() {
    return (
      <div class="root">
        <h1>Hello from your first scenario</h1>
        <apizi-scrollable
          fetcher={this.fetcher}
          renderCollection={collection => (
            <apizi-navigator-collection
              data={collection}
              renderFunc={this.renderFunc}
            />
          )}
        />
      </div>
    );
  }
}
