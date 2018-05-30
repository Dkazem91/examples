import { Component } from '@stencil/core'
import '@apizi/ui'

@Component({
  tag: 'i-prefer-cows',
  styleUrl: 'IPreferCows.css',
  shadow: true
})
export class IPreferCows {
  render() {
    return (
      <div>IPreferCows component </div>
    )
  }
}
