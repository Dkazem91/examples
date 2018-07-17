export type ScenarioState = {
  pullRequests: Array<PullRequest>
}
export type PullRequest = {
  number: number
  base: {
    repo: {
      full_name: string
    }
  }
}
