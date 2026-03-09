module.exports = {
    "pages": [
      "./pages/tabs/work/index",
      "./pages/tabs/mine/index",
      "./pages/tabs/warehouse/index",
      "./pages/tabs/notice/index",
      "./pages/tabs/knowledge/index",
    ],
    "packages": [
      "./pagesWork/app.mpx?root=pagesWork", // 工单核心模块 (包含工单列表，工单详情等)
      "./pagesSubWork/app.mpx?root=pagesSubWork", // 工单子模块 (包含师傅报单，家庭详情等)
      "./pagesMine/app.mpx?root=pagesMine", // 我的模块 (包含个人信息，账单，红包，保单等)
      "./pagesCommon/app.mpx?root=pagesCommon", // 公共模块 (包含登录，公告，考试等)
      "./pagesWarehouse/app.mpx?root=pagesWarehouse", // 仓库模块 (包含仓库列表，仓库详情等)
      "./pagesKnowledge/app.mpx?root=pagesKnowledge" // 知识模块 (包含知识列表，知识详情等)
    ],
    "preloadRule": {
      "pages/tabs/work/index": {
        "network": "all",
        "packages": [
          "pagesWork"
        ]
      },
      "pages/tabs/mine/index": {
        "network": "all",
        "packages": [
          "pagesMine"
        ]
      },
      "pages/tabs/warehouse/index": {
        "network": "all",
        "packages": [
          "pagesWarehouse"
        ]
      },
      "pages/tabs/knowledge/index": {
        "network": "all",
        "packages": [
          "pagesKnowledge"
        ]
      },
    },
    "window": {
      "navigationBarTextStyle": "black",
      "navigationBarBackgroundColor": "#ffffff"
    },
    "tabBar": {
      "custom": true,
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
      "mpx-scroll-view": "./components/mpx-scroll-view/index",
      "mpx-empty": "./components/mpx-empty/index",
      "mpx-copy": "./components/mpx-copy/index",
      "mpx-main-title": "./components/mpx-main-title/index",
      "mpx-view-image": "./components/mpx-view-image/index",
      "van-checkbox": "@vant/weapp/checkbox/index",
      "van-checkbox-group": "@vant/weapp/checkbox-group/index",
      "van-field": "@vant/weapp/field/index",
      "van-button": "@vant/weapp/button/index",
      "van-nav-bar": "@vant/weapp/nav-bar/index",
      "van-row": "@vant/weapp/row/index",
      "van-col": "@vant/weapp/col/index",
      "van-cell": "@vant/weapp/cell/index",
      "van-cell-group": "@vant/weapp/cell-group/index",
      "van-icon": "@vant/weapp/icon/index",
      "van-radio": "@vant/weapp/radio/index",
      "van-image": "@vant/weapp/image/index",
      "van-grid": "@vant/weapp/grid/index",
      "van-grid-item": "@vant/weapp/grid-item/index",
      "van-search": "@vant/weapp/search/index",
      "van-popup": "@vant/weapp/popup/index",
      "van-calendar": "@vant/weapp/calendar/index",
      "van-dialog": "@vant/weapp/dialog/index",
      "van-uploader": "@vant/weapp/uploader/index",
      "van-skeleton": "@vant/weapp/skeleton/index"
    }
}
