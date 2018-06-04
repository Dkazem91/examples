export interface Repository {
  url: string
  name: string
  full_name: string
}

export interface Ref {
  label: string
  ref: string
  repo: Repository
}

export interface PR {
  id: string
  html_url: string
  title: string
  number: number
  state: 'open' | 'closed' | 'merged'
  base: Ref
  head: Ref
  user: {
    login: string
  }
}
