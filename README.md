<h1 align="center">google-translate</h1>

<div align="center">

[![OSCS Status](https://www.oscs1024.com/platform/badge/lzy1960/google-translate.svg?size=small)](https://www.oscs1024.com/project/lzy1960/google-translate?ref=badge_small)

[![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://app.travis-ci.com/lzy1960/google-translate.svg?branch=main&status=passed
[travis-url]: https://app.travis-ci.com/lzy1960/google-translate
[npm-image]: http://img.shields.io/npm/v/@lzy1960/google-translate.svg
[npm-url]: http://npmjs.org/package/@lzy1960/google-translate
[download-image]: https://img.shields.io/npm/dm/@lzy1960/google-translate.svg
[download-url]: https://npmjs.org/package/@lzy1960/google-translate
[codecov-image]: https://img.shields.io/npm/dm/lzy1960/google-translate.svg
[codecov-url]: https://npmjs.org/package/lzy1960/google-translate

</div>

> 感谢开源社区 OSCS 的关注！

## 项目说明

- TDD 开发流程
- 使用 ts 编写
- 集成 vitest 测试

## 使用方式

1. 安装依赖包

   ```JS
   npm i @lzy1960/google-translate
   // OR
   yarn add @lzy1960/google-translate
   // OR
   pnpm i @lzy1960/google-translate
   ```

2. 调用

   ```JS
   // default options
   const options = {
    from: 'auto',
    to: 'en',
    tld: 'cn',
    type: 'default'
   }
   const res = await translate('你好', options)
   console.log(res) // { "from": "zh-CN", "pronunciation": "Nǐ hǎo", "text": "Hello" }
   ```

3. 入参说明

   `translate`接收两个参数：text 和 options

   options 默认为：

   ```JS
   {
    from: 'auto', // 源语言
    to: 'en', // 目标语言
    tld: 'cn', // 服务地址
    type: 'default', // 类型 'default' / 'word'
    isMobile: false // TODO:是否是移动端(移动端和pc端的返回值不一样)
   }
   ```

4. 返回结果说明
   ```JS
   // type
   {
    from: "zh-CN", // 源语言
    pronunciation: "Nǐ hǎo", // 读音
    text: "Hello" // 目标语言结果
   }
   // word
   {
   text: '你好!',
      common: [
        {
          type: '感叹词',
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
   }
   ```
