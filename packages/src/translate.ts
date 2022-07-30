import fetch from 'node-fetch'
import { stringify } from 'qs'
import {
  Options,
  BatchExecute,
  ErrorCode,
  RpcIds,
  Result,
} from '../types/index'
import { Language } from '../types/language'
import { RcpIdsKeys, DefaultResult, WordResult } from '../types/index'
import { extend } from '../shared'

const DEFAULT_OPTIONS: Options = {
  from: 'auto',
  to: 'en',
  tld: 'cn',
  type: 'default',
  isMobile: false,
}
const batchKey = 'x-goog-batchexecute-bgr'
const DEFAULT_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
  [batchKey]: BatchExecute['MOBILE'],
}

export const translate = async (
  text: string,
  options: Options = DEFAULT_OPTIONS
): Promise<Result | never> => {
  const _options = extend({}, DEFAULT_OPTIONS, options)

  // 传入的from和to防错校验
  const isRightLanguage = checkFromAndTo(options)
  if (!isRightLanguage) {
    throw new Error('not support this language')
  }

  const res = await getTranslateData(text, _options)
  const data = formatBodyToRawResult(res)
  const result = getResult(data, _options)

  return result
}

export const getTranslateData = async (
  text: string,
  options: Options = DEFAULT_OPTIONS
): Promise<string | never> => {
  const _options = extend({}, DEFAULT_OPTIONS, options)
  const { from, to, tld, type } = _options
  const url = 'https://translate.google.' + tld
  const rpcids = RpcIds[type!.toUpperCase() as RcpIdsKeys]
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
    url + '/_/TranslateWebserverUi/data/batchexecute?' + stringify(params)

  // 设置是否是移动端的请求头
  const _headers = { ...DEFAULT_HEADERS }
  // if (_options.isMobile) {
  //   _headers[batchKey] = BatchExecute['MOBILE']
  // } else {
  //   _headers[batchKey] = BatchExecute['PC']
  // }

  const _formData = [
    [
      [
        rpcids,
        JSON.stringify([
          [text, from, to, true],
          type === 'word' ? null : [null],
        ]),
        null,
        'generic',
      ],
    ],
  ]

  const formData = new URLSearchParams({
    'f.req': JSON.stringify(_formData),
  })

  try {
    const res = await fetch(fullUrl, {
      method: 'POST',
      body: formData,
      headers: _headers,
    })
    return res.text()
  } catch (error) {
    throw new Error(ErrorCode.BAD_REQUEST)
  }
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
  const _options = extend({}, DEFAULT_OPTIONS, options)
  const { from, type } = _options

  if (data) {
    switch (type) {
      case 'default':
        return processDefault(data)

      case 'word':
        return processWord(data)
    }
  }
  return {
    from,
    pronunciation: null,
    text: '',
  }
}
export const checkFromAndTo = (options: Options): boolean => {
  const { from, to } = options
  if (from in Language && to in Language) {
    return true
  } else {
    return false
  }
}

function processDefault(data: any[]): DefaultResult {
  const result = {} as DefaultResult
  const rawResultArr = data[1][0][0][5]
  if (rawResultArr) {
    result.from = data[0][2]
    result.text = rawResultArr.map((item: string[]) => item[0]).join(' ')
    result.pronunciation = data[0][0]
  }
  return result
}
function processWord(data: any[]): WordResult | never {
  if (!data.length) {
    throw new Error(ErrorCode['NO_RESULT'])
  }
  const result: WordResult = {
    text: data[0][0],
    common: [],
  }
  result.common = data[0][5][0].map((item: any) => ({
    type: item[0],
    words: item[1].map((word: any) => ({
      word: word[0],
      explains: word[2],
      frequency: word[3],
    })),
  }))
  return result
}
