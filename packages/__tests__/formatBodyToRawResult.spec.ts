import { describe, it, expect } from 'vitest'
import { ErrorCode } from '../types/index'
import {
  getTranslateData,
  formatBodyToRawResult,
  getResult,
} from '../src/translate'

describe('formatBodyToRawResult', async () => {
  const res = await getTranslateData('你好')
  it('should fetch google api and pick up translate used array', () => {
    const result = formatBodyToRawResult(res)
    expect(result).toMatchSnapshot()
  })
  it('should translate one word from zh-CN to en', () => {
    const data = formatBodyToRawResult(res)
    const result = getResult(data, { from: 'zh-CN', to: 'en' })
    expect(result.text).toBe('Hello')
  })
  it('should get translate data without char', async () => {
    const res = await getTranslateData('')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it('should get translate data with space', async () => {
    const res = await getTranslateData(' ')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it('should get translate data with punctuation', async () => {
    const res = await getTranslateData('今天，我看到一个程序员！')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it('should get translate data with confusing punctuation', async () => {
    const res = await getTranslateData('这,...是,..什.么???？12123123')
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it('should get translate data with long sentences', async () => {
    const res = await getTranslateData(
      '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
    )
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  it('should throw error when bad request', async () => {
    const fn = getTranslateData('你好', {
      from: 'auto',
      to: 'en',
      tld: 'error',
    })
    await expect(fn).rejects.toThrowError(ErrorCode.BAD_REQUEST)
  })
})
