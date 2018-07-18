export type ScenarioState = {
  pullRequests: Array<PullRequest>
}
export type PullRequest = {
  number: number
  fullName: string
}
