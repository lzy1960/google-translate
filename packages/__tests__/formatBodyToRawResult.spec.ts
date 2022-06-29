import { describe, it, expect } from 'vitest'
import {
  getTranslateData,
  formatBodyToRawResult,
  getResult,
} from '../src/index'

describe('formatBodyToRawResult', async () => {
  const res = await getTranslateData('你好')
  it('should fetch google api and pick up translate used array', async () => {
    const result = formatBodyToRawResult(res)
    expect(result).toMatchSnapshot()
  })
  it('should translate one word from zh-CN to en', () => {
    const data = formatBodyToRawResult(res)
    const result = getResult(data, { from: 'zh-CN', to: 'en' })
    expect(result.text).toBe('Hello')
  })
  it.only('should get translate data without char', async () => {
    const res = await getTranslateData('')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it.only('should get translate data with space', async () => {
    const res = await getTranslateData(' ')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
})
