module.exports = {
      "pages": [
      "./pages/tabs/work/index",
      "./pages/tabs/mine/index",
      "./pages/tabs/warehouse/index",
      "./pages/tabs/notice/index",
      "./pages/tabs/knowledge/index",
      "./pages/login/index"
    ],
    "packages": [
      "./pagesWork/app.mpx?root=pagesWork"
    ],
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#f39c3e"
    },
    "tabBar": {
      "custom": true,
      "overlay": true,
      "color": "#999999",
      "selectedColor": "#F39C3E",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "pagePath": "pages/tabs/work/index",
          "text": "工单"
        },
        {
          "pagePath": "pages/tabs/warehouse/index",
          "text": "仓库"
        },
        {
          "pagePath": "pages/tabs/knowledge/index",
          "text": "e帮手学堂"
        },
        {
          "pagePath": "pages/tabs/notice/index",
          "text": "公告"
        },
        {
          "pagePath": "pages/tabs/mine/index",
          "text": "我的"
        }
      ]
    },
    "usingComponents": {
      "mpx-tabs-page": "./components/mpx-tabs-page/index",
      "mpx-custom-nav-ali": "./components/mpx-custom-nav-ali/index",
      "mpx-scroll-view": "./components/mpx-scroll-view/index",
      "mpx-empty": "./components/mpx-empty/index",
      "van-checkbox": "@vant/weapp/checkbox/index",
      "van-checkbox-group": "@vant/weapp/checkbox-group/index",
      "van-field": "@vant/weapp/field/index",
      "van-button": "@vant/weapp/button/index",
      "van-nav-bar": "@vant/weapp/nav-bar/index",
      "van-row": "@vant/weapp/row/index",
      "van-col": "@vant/weapp/col/index",
      "van-cell": "@vant/weapp/cell/index",
      "van-cell-group": "@vant/weapp/cell-group/index",
      "van-skeleton": "@vant/weapp/skeleton/index",
      "van-loading": "@vant/weapp/loading/index"
    }
}