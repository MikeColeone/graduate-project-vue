# graduate-vue-project

# Introduce

毕设管理系统前端部分

# Environment

- vue3

# Extends

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Deploy

## UPDATE

2024-02-26

- 打开页面被初始化账号密码 检查前端缓存中没有
- 其实是浏览器将密码存储了 把该站点的账号密码删了就行

2024-12-1

解析 token

```js
npm install jwt-decode
```

mock 数据

```js
npm install axios-mock-adapter --save-dev
```

2024-11-30

整合 Element-plus，完善登陆界面 使用 axios 替换原生的 fetch 发请求

```js
npm install axios
```

2024-10-18

运行 npm run dev 出现错误

> ‘vite’ 不是内部或外部命令，也不是可运行的程序
> 或批处理文件。

原因： 当我们使用 vite 构建 vue3 项目时，vite 不会帮助我们 install 相关依赖，需要我们手动安装 同时每一个项目都存放自己的依赖在 node_modules 目录中 不像 maven 一样 存在一个中央仓库存放左右 maven 依赖的文件

为什么不想 maven 一样存在一个中央仓库?

原因：提高效率减少了从中央仓库拉取依赖的时间 和较高的灵活性

`<br/>`

**Network（网络）** ：
网络地址指的是当前设备在局域网中的 IP 地址，其他与该设备同一网络的设备可以通过这个地址访问你的开发服务器。这个地址通常用来在局域网中测试，比如在手机或其他设备上查看效果。

'User' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts-

- 指的是必须使用 type-only 的方式启动 确保编译的时候

不会把他编译实际的 js 代码，而是直接当作类型处理
