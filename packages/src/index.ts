import fetch from 'node-fetch'
import qs from 'qs'

export const translate = (text) => {
  return { text: 'Hello' }
}

export const fetchTranslateInfo = (text) => {
  const url = 'https://translate.google.cn'
  const options = {
    'source-path': 'text',
    'f.sid': '-7518334055562924546',
    bl: 'boq_translate-webserver_20220626.14_p0',
    hl: 'zh-CN',
    'soc-app': 1,
    'soc-platform': 1,
    'soc-device': 1,
    _reqid: Math.floor(1000 + Math.random() * 9000),
    rt: 'c',
  }

  const fullUrl =
    url + '/_/TranslateWebserverUi/data/batchexecute?' + qs.stringify(options)
  console.log(fullUrl)

  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: `f.req=${encodeURIComponent(
      '[[["MkEWBc","[["你好","auto","en",true],[null]]",null,"generic"]]]'
    )}&`,
  })
    .then((res) => {
      console.log(res.text)
      return res.text()
    })
    .then((res) => {
      return res
    })
}
