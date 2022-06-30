import fetch from 'node-fetch'
import qs from 'qs'
import { Options, Result } from '../types/index'

const DEFAULT_OPTIONS: Options = {
  from: 'auto',
  to: 'en',
  tld: 'cn',
}

export const translate = async (
  text: string,
  options: Options = DEFAULT_OPTIONS
): Promise<Result> => {
  const _options = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const res = await getTranslateData(text, _options)
  const data = formatBodyToRawResult(res)
  const result = getResult(data, _options)

  return result
}

export const getTranslateData = async (
  text: string,
  options: Options = DEFAULT_OPTIONS
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
  const result: Result = {
    from,
    pronunciation: null,
    text: '',
  }

  if (data) {
    const rawResultArr = data[1][0][0][5]
    if (rawResultArr) {
      result.text = rawResultArr.map((item: string[]) => item[0]).join(' ')
    }
  }

  return result
}
