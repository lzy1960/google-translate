import { describe, expect, it } from 'vitest'
import { translate } from '../src/index'

describe('translate', async () => {
  it('should translate more words from zh-CN to en', async () => {
    const res = await translate('苹果')
    expect(res.text).toBe('apple')

    const res1 = await translate('香蕉')
    expect(res1.text).toBe('banana')

    const res2 = await translate('猴子')
    expect(res2.text).toBe('monkey')

    const res3 = await translate('你好')
    expect(res3.text).toBe('Hello')
    expect(res3.pronunciation).toBe('Nǐ hǎo')
  })
  it.skip('should translate with punctuation', async () => {
    const res = await translate('今天，我看到一个程序员！')
    expect(res.text).toBe('Today, I saw a programmer!')
  })
  it('should translate without char', async () => {
    const res = await translate('')
    expect(res.text).toBe('')
  })
  it('should translate with space', async () => {
    const res = await translate(' ')
    expect(res.text).toBe('')
    const res1 = await translate('这是什么？')
    const res2 = await translate(' 这 是 什 么？')
    const res3 = await translate('      这   是     什 么？')
    const res4 = await translate('  这是什么？  ')
    expect(res1.text).toEqual(res2.text)
    expect(res2.text).toEqual(res3.text)
    expect(res4.text).toBe('what is this?')
  })
  it('should translate with confusing punctuation', async () => {
    const res = await translate('这,...是,..什.么???？12123123')
    expect(res.text).toBe('what is this???? 12123123')
  })
  it('should translate long sentences', async () => {
    const res = await translate(
      '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
    )
    expect(res.text).toBe(
      'The bright moonlight in front of the bed was suspected to be frost on the ground. Raise your head to look at the bright moon, and bow your head to think of your hometown.'
    )
    const resMobile = await translate(
      '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
      {
        from: 'auto',
        to: 'en',
        isMobile: true,
      }
    )
    expect(resMobile.text).toBe(
      'The moonlight in front of the bed is suspected to be on the ground. Looking at the Mingyue, he bowed his head to his hometown.'
    )
  })
  it('should translate from en to zh-CN', async () => {
    const res = await translate('ok, Im done!', {
      from: 'en',
      to: 'zh-CN',
    })
    expect(res.text).toBe('好了，我完成了！')
  })
  it('should throw Error when get wrong from and to', async () => {
    const fn = translate('ok, Im done!', {
      from: 'notInLanguage',
      to: 'zh-CN',
    })
    expect(fn).rejects.toThrowError('not support this language')
  })
})
