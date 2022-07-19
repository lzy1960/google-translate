import { describe, expect, it } from 'vitest'
import { checkFromAndTo } from '../src/translate'
import { LanguageKey } from '../types/language'

describe('languages', () => {
  it('should return boolean when called', () => {
    const isChecked = checkFromAndTo({
      from: 'zh-CN',
      to: 'en',
    })
    expect(isChecked).toBe(true)
    const errorFrom = checkFromAndTo({
      from: 'errorFrom' as unknown as LanguageKey,
      to: 'en',
    })
    expect(errorFrom).toBe(false)
    const errorTo = checkFromAndTo({
      from: 'zh-CN',
      to: 'errorTo' as unknown as LanguageKey,
    })
    expect(errorTo).toBe(false)
    const errorCheck = checkFromAndTo({
      from: 'errorFrom' as unknown as LanguageKey,
      to: 'errorTo' as unknown as LanguageKey,
    })
    expect(errorCheck).toBe(false)
  })
})
