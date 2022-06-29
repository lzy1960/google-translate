import { describe, expect, test } from 'vitest'
import { fetchTranslateInfo, translate } from '../src'

describe('translate', () => {
  test.only('should fetch google api and return result', async () => {
    const result = await fetchTranslateInfo('你好')
    console.log(result)
    expect(result).toMatchSnapshot()
  })
})
