import fetch from 'node-fetch'
import qs from 'qs'

export const translate = (text) => {
  return { text: 'Hello' }
}

export const fetchTranslateInfo = async (text) => {
  const url = 'https://translate.google.cn'
  const options = {
    rpcids: 'MkEWBc',
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
    url + '/_/TranslateWebserverUi/data/batchexecute?' + qs.stringify(options)
  const params = new URLSearchParams()
  params.append(
    'f.req',
    encodeURIComponent(
      `[[["MkEWBc","[[\"你好\",\"auto\",\"en\",true],[null]]",null,"generic"]]]`
    )
  )

  console.log(params)

  const res = await fetch(fullUrl, {
    method: 'POST',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // },
    body: params,
  })
  const data = await res.text()
  // )]}'
  //
  // 562
  // [["wrb.fr","MkEWBc","[[\"Nǐ hǎo\",null,\"zh-CN\",[[[0,[[[null,2]],[true]]]],2],[[\"你好\",null,null,2]]],[[[null,null,null,null,null,[[\"Hello\",null,null,null,[[\"Hello\",[4,5,11]],[\"Hi\",[4]],[\"Hello there\",[4]]]]]]],\"en\",1,\"zh-CN\",[\"你好\",\"auto\",\"en\",true]],\"zh-CN\",[\"你好!\",null,null,null,null,[[[\"感叹词\",[[\"Hello!\",null,[\"你好!\",\"喂!\"],1,true],[\"Hi!\",null,[\"嗨!\",\"你好!\"],1,true],[\"Hallo!\",null,[\"你好!\"],3,true]],\"en\",\"zh-CN\"]],3],null,null,\"zh-CN\",1]]",null,null,null,"generic"],["di",26],["af.httprm",26,"2345273230130846814"]]
  // 25
  // [["e",4,null,null,634]]

  // 最上面的两行去掉以后
  // 总共四行
  // 第一行表示前两行的长度
  // 第三行表示后两行的长度
  return data
}
