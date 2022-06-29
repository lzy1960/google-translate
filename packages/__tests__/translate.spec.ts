import { describe, expect, it } from 'vitest'
import { translate } from '../src'

describe('translate', () => {
  it('should fetch google api and return result', async () => {
    const result = await translate('你好')
    expect(result).toMatchSnapshot()
  })
  it.only('should translate some words', async () => {
    const result = await translate('你好')
    expect(result).toBe('Hello')
  })
})
