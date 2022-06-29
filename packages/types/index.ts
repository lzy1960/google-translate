export type Options = {
  from: string
  to: string
  tld?: string
}

export type Result = {
  from: string
  pronunciation: string | null
  text: string
}
