# google-translate [![OSCS Status](https://www.oscs1024.com/platform/badge/lzy1960/google-translate.svg?size=small)](https://www.oscs1024.com/project/lzy1960/google-translate?ref=badge_small)

感谢开源社区 OSCS 的关注！

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
    tld: 'cn'
   }
   const res1 = await translate('你好', options)
   console.log(res1) // { "from": "zh-CN", "pronunciation": "Nǐ hǎo", "text": "Hello" }
   ```

3. 入参说明

   `translate`接收两个参数：text 和 options

   options 默认为：

   ```JS
   {
    from: 'auto', // 源语言
    to: 'en', // 目标语言
    tld: 'cn', // 服务地址
    isMobile: false // 是否是移动端(移动端和pc端的返回值不一样)
   }
   ```

4. 返回结果说明
   ```JS
   {
    from: "zh-CN", // 源语言
    pronunciation: null, // 读音
    text: "Hello" // 目标语言结果
   }
   ```
