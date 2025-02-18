<h1 align="center">google-translate</h1>

<p align="center">一款谷歌翻译api的插件</p>

<div align="center">

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![codecov][codecov-image]][codecov-url]
[![Maintainability][maintainability-image]][maintainability-url]

[npm-image]: http://img.shields.io/npm/v/@lzy1960/google-translate.svg
[npm-url]: http://npmjs.org/package/@lzy1960/google-translate
[download-image]: https://img.shields.io/npm/dm/@lzy1960/google-translate.svg
[download-url]: https://npmjs.org/package/@lzy1960/google-translate
[codecov-image]: https://codecov.io/gh/lzy1960/google-translate/branch/main/graph/badge.svg?token=O686OAR35N
[codecov-url]: https://codecov.io/gh/lzy1960/google-translate
[maintainability-image]: https://api.codeclimate.com/v1/badges/185da742ecab918b1a57/maintainability
[maintainability-url]: https://codeclimate.com/github/lzy1960/google-translate/maintainability

</div>

<p align="center">简体中文 | <a href="README-en.md">English</a></p>

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
    tld: 'com',
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
    tld: 'com', // 服务地址
    type: 'default', // 类型 'default'
    isMobile: false // TODO:是否是移动端(移动端和pc端的返回值不一样)
   }
   ```

4. 返回结果说明
   ```JS
   {
    from: "zh-CN", // 源语言
    pronunciation: "Nǐ hǎo", // 读音
    text: "Hello" // 目标语言结果
   }
   ```

## options 参数说明

| 参数  | 说明     | 类型      | 默认值    |
| ----- | -------- | --------- | --------- |
| from  | 源语言   | string    | 'auto'    |
| to    | 目标语言 | string    | 'en'      |
| tld   | 地区     | string    | 'com'     |
| type  | 类型     | `default` | 'default' |
| proxy | 代理地址 | string    | `--`      |
