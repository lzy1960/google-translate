<h1 align="center">google-translate</h1>

 <p align="center">A plug-in for Google Translate API</p>

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

 <p align="center"><a href="README.md">简体中文</a> | English</p>

## Project Description

- TDD Development Process
- Written using ts
- Integrated vitest test

## How to use

1.  Install the dependency package

```javascript
npm i @lzy1960/google-translate
// OR
yarn add @lzy1960/google-translate
// OR
pnpm i @lzy1960/google-translate
```

2.  Call

```javascript
// default options
const options = {
  from: 'auto',
  to: 'en',
  tld: 'com',
  type: 'default',
}
const res = await translate('Hello', options)
console.log(res) // { "from": "zh-CN", "pronunciation": "Nǐ hǎo", "text": "Hello" }
```

3.  Instructions for entry

`translate` receives two parameters: text and options

options default to:

```javascript
{
  from: 'auto', // Source language
  to: 'en', // Target language
  tld: 'com', // Service address
  type: 'default', // Type 'default' / 'word'
  isMobile: false // TODO: Is it a mobile terminal (the return value of the mobile terminal and the PC terminal is different)
}
```

4.  Return to the result description

```javascript
// default
{
  from: "zh-CN", // Source language
  pronunciation: "Nǐ hǎo", // pronunciation
  text: "Hello" // Target language results
}
// word
{
  text: 'Hello!',
  common: [
    {
      type: 'interrogation',
      words: [
        {
          word: 'Hello!',
          explains: ['Hello!', 'Hello!'],
          frequency: 1,
        },
        {
          word: 'Hi!',
          explains: ['Hi!', 'Hello!'],
          frequency: 1,
        },
        {
          word: 'Hallo!',
          explains: ['Hello!'],
          frequency: 3,
        },
      ],
    },
  ],
}
```

## options parameter description

| Parameters | Description     | Type                | Default   |
| ---------- | --------------- | ------------------- | --------- |
| from       | Source Language | string              | 'auto'    |
| to         | Target Language | string              | 'en'      |
| tld        | Region          | string              | 'com'     |
| type       | Type            | `default` \| `word` | 'default' |
| proxy      | proxy address   | string              | `--`      |
