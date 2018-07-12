import { Component } from '@bearer/core'

@Component({
  tag: 'list-star-wars-characters',
  styleUrl: 'ListStarWarsCharacters.css',
  shadow: true
})
export class HelloWorld {
  render() {
    return (
      <div class="root">
        <bearer-input controlName="who" label="Person/Channel to remind" />
      </div>
    )
  }
}
