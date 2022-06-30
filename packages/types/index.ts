import { LanguageKey } from './language'

export type Options = {
  from: LanguageKey
  to: LanguageKey
  tld?: string
}

export type Result = {
  from: LanguageKey
  pronunciation: string | null
  text: string
}
