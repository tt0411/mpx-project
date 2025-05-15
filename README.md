# mpx-project 跨端小程序框架

```javascript
pnpm i

// development
pnpm run serve // 小程序本地开发构建

// production
pnpm run build // 小程序生产环境构建

```

注意:
打包阿里小程序 uno.acss 文件会自动是生成默认样式
```css
  button {
    height: initial; // 这里要删除，否则van-button 按钮高度样式会失效
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
 }    
```