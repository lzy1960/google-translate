import { describe, expect, it, vi } from 'vitest'
import { translate } from '../src/index'
import {
  getTranslateData,
  formatBodyToRawResult,
  getResult,
} from '../src/index'

describe('translate', async () => {
  it('should translate more words from zh-CN to en', async () => {
    const res = await translate('苹果')
    expect(res.text).toBe('apple')

    const res1 = await translate('香蕉')
    expect(res1.text).toBe('banana')

    const res2 = await translate('猴子')
    expect(res2.text).toBe('monkey')
  })
  it.fails('should translate with punctuation', async () => {
    const res = await translate('今天，我看到一个程序员！')
    expect(res.text).toBe('Today, I saw a programmer!')
  })
  it('should translate without char', async () => {
    const res = await translate(' ')
    expect(res.text).toBe('')
  })
  it('should translate with space', async () => {
    const res = await translate(' ')
    expect(res.text).toBe('')
  })
})
