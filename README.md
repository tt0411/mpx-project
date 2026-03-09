# MPX Mini Template

一个可复用的 MPX 小程序模板（微信 + 支付宝），内置：
- 自定义 tabbar
- 主包 + 分包
- Pinia 状态管理
- 通用请求封装
- 登录/列表/详情示例流程

## Quick Start

```bash
pnpm i

# 本地开发（默认微信 test 环境）
pnpm run serve:test

# 微信构建
pnpm run build:test:wx
pnpm run build:prod:wx

# 支付宝构建
pnpm run build:test:ali
pnpm run build:prod:ali
```

## Project Structure

```text
src/
  app.mpx
  app.config.js
  api/
    modules/
      auth.js        # 登录登出示例
      demo.js        # 列表详情示例
    request.js       # 通用请求封装
  store/
    auth.js          # user/session store
    common.js        # tabbar store
    demo.js          # demo store
  pages/
    tabs/
      home/
      discover/
      profile/
  pagesCommon/
    login/
    web-view/
  pagesFeature/
    demo-list/
    demo-detail/
  custom-tab-bar/
  components/
```

## Environment Config

构建前会自动执行 `scripts/build-config.js`，生成：
- `static/wx/project.config.json`
- `static/ali/mini.project.json`
- `src/utils/envConfig.js`

你需要按项目实际情况修改：
- `scripts/build-config.js` 中的 `appId`
- `scripts/build-config.js` 中的 `baseURL`
- `scripts/build-config.js` 中的 `projectName`

## Template Checklist

首次复制模板后，建议按顺序处理：
1. 替换 `scripts/build-config.js` 里的 `appId/baseURL/projectName`
2. 调整 `src/app.config.js` 的 tab 与分包配置
3. 替换 `src/api/modules/*` 为真实业务接口
4. 根据业务扩展 `src/store/*`
5. 替换示例页面文案、图标和导航路径

## Common Customizations

- 修改 tab：`src/store/common.js` + `src/app.config.js`
- 新增分包页面：`src/pagesFeature/app.mpx` + `src/utils/router.js`
- 修改默认请求域名：`scripts/build-config.js` -> `baseURL`
