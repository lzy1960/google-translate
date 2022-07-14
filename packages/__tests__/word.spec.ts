import { describe, expect, it } from 'vitest'
import { formatBodyToRawResult, getTranslateData } from '../src/translate'

describe('word', () => {
  it('should get snapshot when type is word', async () => {
    const res = await getTranslateData('你好', {
      from: 'zh-CN',
      to: 'en',
      tld: 'cn',
      type: 'word',
    })
    const data = formatBodyToRawResult(res)
    expect(data).toMatchSnapshot()
  })
})
