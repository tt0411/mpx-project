module.exports = {
  pages: [
    './pages/tabs/home/index',
    './pages/tabs/discover/index',
    './pages/tabs/profile/index'
  ],
  packages: [
    './pagesFeature/app.mpx?root=pagesFeature',
    './pagesCommon/app.mpx?root=pagesCommon'
  ],
  preloadRule: {
    'pages/tabs/home/index': {
      network: 'all',
      packages: ['pagesFeature']
    }
  },
  window: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff'
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#1677ff',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/tabs/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/tabs/discover/index',
        text: '发现'
      },
      {
        pagePath: 'pages/tabs/profile/index',
        text: '我的'
      }
    ]
  },
  usingComponents: {
    'mpx-tabs-page': './components/mpx-tabs-page/index',
    'mpx-scroll-view': './components/mpx-scroll-view/index',
    'mpx-empty': './components/mpx-empty/index',
    'mpx-copy': './components/mpx-copy/index',
    'mpx-main-title': './components/mpx-main-title/index',
    'mpx-view-image': './components/mpx-view-image/index',
    'van-checkbox': '@vant/weapp/checkbox/index',
    'van-checkbox-group': '@vant/weapp/checkbox-group/index',
    'van-field': '@vant/weapp/field/index',
    'van-button': '@vant/weapp/button/index',
    'van-nav-bar': '@vant/weapp/nav-bar/index',
    'van-row': '@vant/weapp/row/index',
    'van-col': '@vant/weapp/col/index',
    'van-cell': '@vant/weapp/cell/index',
    'van-cell-group': '@vant/weapp/cell-group/index',
    'van-icon': '@vant/weapp/icon/index',
    'van-radio': '@vant/weapp/radio/index',
    'van-image': '@vant/weapp/image/index',
    'van-grid': '@vant/weapp/grid/index',
    'van-grid-item': '@vant/weapp/grid-item/index',
    'van-search': '@vant/weapp/search/index',
    'van-popup': '@vant/weapp/popup/index',
    'van-calendar': '@vant/weapp/calendar/index',
    'van-dialog': '@vant/weapp/dialog/index',
    'van-uploader': '@vant/weapp/uploader/index',
    'van-skeleton': '@vant/weapp/skeleton/index'
  }
}
