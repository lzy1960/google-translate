import fetch from 'node-fetch'
import qs from 'qs'
import { Options, Result, BatchExecute } from '../types/index'

const DEFAULT_OPTIONS: Options = {
  from: 'auto',
  to: 'en',
  tld: 'cn',
  isMobile: false,
}
const DEFAULT_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
  'x-goog-batchexecute-bgr': '',
}

export const translate = async (
  text: string,
  options: Options = DEFAULT_OPTIONS
): Promise<Result> => {
  const _options = Object.assign({}, DEFAULT_OPTIONS, options)

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

  // 设置是否是移动端的请求头
  const _headers = { ...DEFAULT_HEADERS }
  if (options.isMobile) {
    _headers['x-goog-batchexecute-bgr'] = BatchExecute['MOBILE']
  } else {
    _headers['x-goog-batchexecute-bgr'] = BatchExecute['PC']
  }

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
    headers: _headers,
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
      result.pronunciation = data[0][0]
    }
  }

  return result
}
