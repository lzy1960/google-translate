import { describe, expect, it } from 'vitest'
import { ErrorCode } from '../../types/index'
import {
  formatBodyToRawResult,
  getTranslateData,
  translate,
} from '../src/translate'

describe('word', () => {
  it('should get snapshot when type is word', async () => {
    const res = await getTranslateData('你好', {
      from: 'zh-CN',
      to: 'en',
      tld: 'com',
      type: 'word',
    })
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
  // TODO: 好像不支持word了？？
  it.skip('should get result when type is word', async () => {
    const res = await translate('你好', {
      from: 'zh-CN',
      to: 'en',
      tld: 'com',
      type: 'word',
    })
    expect(res).toStrictEqual({
      text: '你好!',
      common: [
        {
          type: null,
          words: [
            {
              word: 'Hello!',
              explains: ['你好!', '喂!'],
              frequency: 1,
            },
            {
              word: 'Hi!',
              explains: ['嗨!', '你好!'],
              frequency: 1,
            },
            {
              word: 'Hallo!',
              explains: ['你好!'],
              frequency: 3,
            },
          ],
        },
      ],
    })
  })
  it('should throw error when no result', async () => {
    const fn = translate('abcd', {
      from: 'zh-CN',
      to: 'en',
      tld: 'com',
      type: 'word',
    })
    await expect(fn).rejects.toThrowError(ErrorCode.NO_RESULT)
  })
})
