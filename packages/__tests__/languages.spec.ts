import { describe, expect, it } from 'vitest'
import { checkFromAndTo } from '../src/index'

describe('languages', () => {
  it('should return boolean when called', () => {
    const isChecked = checkFromAndTo({
      from: 'zh-CN',
      to: 'en',
    })
    expect(isChecked).toBe(true)
    const errorFrom = checkFromAndTo({
      from: 'errorFrom',
      to: 'en',
    })
    expect(errorFrom).toBe(false)
    const errorTo = checkFromAndTo({
      from: 'zh-CN',
      to: 'errorTo',
    })
    expect(errorTo).toBe(false)
    const errorCheck = checkFromAndTo({
      from: 'errorFrom',
      to: 'errorTo',
    })
    expect(errorCheck).toBe(false)
  })
})
