module.exports = {
  pages: [
    './pages/tabs/home/index',
    './pages/tabs/app/index',
    './pages/tabs/discover/index',
    './pages/tabs/chat/index',
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
    'navigationBarTextStyle@wx': 'black',
    'navigationBarBackgroundColor@wx': '#ffffff',
    'defaultTitle@ali': 'Mpx App',
    'titleBarColor@ali': '#ffffff'
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
        pagePath: 'pages/tabs/app/index',
        text: '软件'
      },
      {
        pagePath: 'pages/tabs/discover/index',
        text: '发现'
      },
      {
        pagePath: 'pages/tabs/chat/index',
        text: '聊天'
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
    'cube-tab-bar': '@mpxjs/mpx-cube-ui/lib/components/tab-bar/index.mpx',
    'cube-tab': '@mpxjs/mpx-cube-ui/lib/components/tab-bar/tab.mpx',
    'cube-icon': '@mpxjs/mpx-cube-ui/lib/components/icon/index.mpx',
    "t-button": "tdesign-miniprogram/button/button",
    "t-icon": "tdesign-miniprogram/icon/icon",
    "t-tab-bar": "tdesign-miniprogram/tab-bar/tab-bar",
    "t-tab-bar-item": "tdesign-miniprogram/tab-bar-item/tab-bar-item",
     "t-upload": "tdesign-miniprogram/upload/upload",
  }
}
