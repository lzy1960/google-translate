import fetch from 'node-fetch'
import qs from 'qs'
import { Options } from '../types/index'

export const translate = async (
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
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // },
    body: formData,
  })
  const data = await res.text()
  // [
  //   [
  //     'wrb.fr',
  //     'MkEWBc',
  //     '[["Nǐ hǎo",null,"zh-CN",[[[0,[[[null,2]],[true]]]],2],[["你好",null,null,2]]],[[[null,null,null,null,null,[["Hello",null,null,null,[["Hello",[4,5,11]],["Hi",[4]],["Hello there",[4]]]]]]],"en",1,"zh-CN",["你好","auto","en",true]],"zh-CN",["你好!",null,null,null,null,[[["感叹词",[["Hello!",null,["你好!","喂!"],1,true],["Hi!",null,["嗨!","你好!"],1,true],["Hallo!",null,["你好!"],3,true]],"en","zh-CN"]],3],null,null,"zh-CN",1]]',
  //     null,
  //     null,
  //     null,
  //     'generic'
  //   ],
  //   [ 'di', 24 ],
  //   [ 'af.httprm', 23, '-1257359032242568457' ]
  // ]

  // 最上面的两行去掉以后
  // 总共四行
  // 第一行表示前两行的长度
  // 第三行表示后两行的长度

  // 开始处理数据
  const body = data.slice(6)
  // 先找到第一个数字
  const firstLen = /^\d+/.exec(body)![0]
  // 找到第一个数组
  const firstJson = body.slice(
    firstLen.length,
    parseInt(firstLen) + firstLen.length
  )

  const rawResult = JSON.parse(firstJson)
  const result = JSON.parse(rawResult[0][2])
  console.log(result)

  return 'Hello'
}
