import fetch from 'node-fetch'
import qs from 'qs'

export const translate = (text) => {
  return { text: 'Hello' }
}

export const fetchTranslateInfo = (text) => {
  const url = 'https://translate.google.com'
  const options = {
    'source-path': 'text',
    'f.sid': '-7518334055562924546',
    bl: 'boq_translate-webserver_20220626.14_p0',
    hl: 'zh-CN',
    'soc-app': 1,
    'soc-platform': 1,
    'soc-device': 1,
    _reqid: 1760753,
    rt: 'c',
  }

  return fetch(
    url + '/_/TranslateWebserverUi/data/batchexecute?' + qs.stringify(options)
  ).then((res) => res.json())
}
