import { Component } from "@stencil/core";

import { BearerComponent, Intent, BearerFetch } from "@apizi/core";

@BearerComponent
@Component({
  tag: "list-repositories",
  styleUrl: "ListRepositories.css",
  shadow: true
})
export class ListRepositories {
  @Intent("listRepositories") fetcher: BearerFetch;

  renderFunc = item => {
    return <span>{item.name}</span>;
  };
  render() {
    return (
      <div class="root">
        <h1>Listing Repositories</h1>
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
