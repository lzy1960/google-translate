import fetch from 'node-fetch'
import qs from 'qs'
import { Options, Result } from '../types/index'

export const translate = async (
  text: string,
  options: Options = {
    from: 'auto',
    to: 'en',
    tld: 'cn',
  }
): Promise<Result> => {
  const res = await getTranslateData(text, options)
  const data = formatBodyToRawResult(res)
  const result = getResult(data, options)

  return result
}

export const getTranslateData = async (
  text: string,
  options: Options = {
    from: 'auto',
    to: 'en',
    tld: 'cn',
  }
) => {
  const { from, to, tld } = options
  const url = 'https://translate.google.' + tld
  const rpcids = 'MkEWBc'
  const params = {
    rpcids,
    'source-path': '/',
    'f.sid': '6886843866985976507',
    bl: 'boq_translate-webserver_20220627.09_p0',
    hl: 'zh-CN',
    'soc-app': '1',
    'soc-platform': '1',
    'soc-device': '1',
    _reqid: '248103',
    rt: 'c',
  }

  const fullUrl =
    url + '/_/TranslateWebserverUi/data/batchexecute?' + qs.stringify(params)

  const _formData = [
    [
      [
        rpcids,
        JSON.stringify([[text, from, to, true], [null]]),
        null,
        'generic',
      ],
    ],
  ]

  const formData = new URLSearchParams({
    'f.req': JSON.stringify(_formData),
  })

  const res = await fetch(fullUrl, {
    method: 'POST',
    body: formData,
  })
  return res.text()
}

export const formatBodyToRawResult = (body: string) => {
  const rawBody = body.slice(6)
  // 先找到第一个数字
  const firstLen = /^\d+/.exec(rawBody)![0]
  // 找到第一个数组
  const firstJson = rawBody.slice(
    firstLen.length,
    parseInt(firstLen) + firstLen.length
  )

  const rawResult = JSON.parse(firstJson)
  return JSON.parse(rawResult[0][2])
}

export const getResult = (data: any[] | null, options: Options): Result => {
  const { from } = options
  let text = ''
  if (!data) {
    return {
      from,
      pronunciation: null,
      text: '',
    }
  }

  const result: Result = {
    from: data[0][2],
    pronunciation: data[0][0],
    text: data[1][0][0][5][0][0] || '',
  }

  return result
}
