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
    'mpx-empty': './components/mpx-empty/index',
    'mpx-skeleton': './components/mpx-skeleton/index',
    'cube-icon': '@mpxjs/mpx-cube-ui/lib/components/icon/index.mpx'
  }
}
