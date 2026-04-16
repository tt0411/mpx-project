module.exports = {
  pages: [
    './pages/tabs/home/index',
    './pages/tabs/discover/index',
    './pages/tabs/publish/index',
    './pages/tabs/message/index',
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
    'navigationBarTextStyle': 'black',
    'navigationBarBackgroundColor': '#ffffff',
    'defaultTitle': 'Mpx App',
    'titleBarColor': '#ffffff'
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#FF2442',
    backgroundColor: '#ffffff',
    overlay: true,
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
        pagePath: 'pages/tabs/publish/index',
        text: '发布'
      },
      {
        pagePath: 'pages/tabs/message/index',
        text: '消息'
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
    'mpx-list': './components/mpx-list/index',
    'mpx-skeleton': './components/mpx-skeleton/index',
    'mpx-swipe-cell': './components/mpx-swipe-cell/index',
    'mpx-steps': './components/mpx-steps/index',
    'mpx-notice-bar': './components/mpx-notice-bar/index',
    'cube-tab-bar': '@mpxjs/mpx-cube-ui/lib/components/tab-bar/index.mpx',
    'cube-tab': '@mpxjs/mpx-cube-ui/lib/components/tab-bar/tab.mpx',
    'cube-icon': '@mpxjs/mpx-cube-ui/lib/components/icon/index.mpx',
    'cube-button': '@mpxjs/mpx-cube-ui/lib/components/button/index.mpx',
  }
}
