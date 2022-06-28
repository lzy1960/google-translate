import { describe, expect, test } from 'vitest'
import { fetchTranslateInfo, translate } from '../src'

describe('translate', () => {
  test('should return object with text', () => {
    const result = translate('你好')
    const result1 = translate('是的')
    expect(result.text).toBe('Hello')
    expect(result1.text).toBe('Yes')
  })

  test.only('should fetch google api and return result', async () => {
    const result = await fetchTranslateInfo('你好')
    console.log(result)
    expect(result).toBe('Hello')
  })
})
