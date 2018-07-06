import { Component } from '@stencil/core'
import '@apizi/ui'

@Component({
  tag: 'listing-goats',
  styleUrl: 'listingGoats.css',
  shadow: true
})
export class listingGoats {
  render() {
    return (
      <div>listingGoats component </div>
    )
  }
}
