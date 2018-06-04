import { Component, Prop } from "@stencil/core";

import { BearerComponent, Intent, BearerFetch } from "@apizi/core";

@BearerComponent
@Component({
  tag: "list-pull-requests",
  styleUrl: "ListPullRequests.css",
  shadow: true
})
export class ListPullRequests {
  @Intent("listPullRequests") fetcher: BearerFetch;

  @Prop() context: any;

  renderFunc = item => {
    return <span>{item.title}</span>;
  };

  getPullRequests() {
    const fullName = this.context.data["list-repositories"].full_name;
    return this.fetcher({ fullName });
  }
  render() {
    return (
      <div class="root">
        <apizi-scrollable
          fetcher={this.getPullRequests.bind(this)}
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
