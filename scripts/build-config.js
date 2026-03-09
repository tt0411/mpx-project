/**
 * 动态生成配置文件
 */

const fs = require('fs')
const path = require('path')

const WX_CONFIG_MAP = {
  // 测试环境
  test: {
    appId: 'wx43ed82bf04e8a3b7',
    baseURL: 'https://cbs-gateway.dev.ebsfw.com',
    projectName: '微信小程序-测试版',
    env: 'test',
    envName: '微信小程序测试环境'
  },
  // 生产环境
  prod: {
    appId: 'wxPROD123456789',
    baseURL: 'https://xxx.xxx.com',
    projectName: '微信小程序-正式版',
    env: 'prod',
    envName: '微信小程序生产环境'
  }
}

const ALI_CONFIG_MAP = {
  // 测试环境
  test: {
    appId: 'ali43ed82bf04e8a3b7',
    baseURL: 'https://cbs-gateway.dev.ebsfw.com',
    projectName: '支付宝小程序-测试版',
    env: 'test',
    envName: '支付宝小程序测试环境'
  },
  // 生产环境
  prod: {
    appId: 'aliPROD123456789',
    baseURL: 'https://xxx.xxx.com',
    projectName: '支付宝小程序-正式版',
    env: 'prod',
    envName: '支付宝小程序生产环境'
  }
}

const CONFIG_MAP = {
  wx: WX_CONFIG_MAP,
  ali: ALI_CONFIG_MAP
}

// 获取环境变量
const ENV = process.env.APP_ENV || 'test'
const PLATFORM_ENV = process.env.PLATFORM_ENV || 'wx'

const config = CONFIG_MAP[PLATFORM_ENV][ENV]

if (!config) {
  console.error(`❗ 找不到环境${PLATFORM_ENV} ${ENV} 的配置`)
  process.exit(1)
}

// 生成微信小程序配置文件内容
const wxProjectConfig = {
  appid: config.appId,
  projectname: config.projectName,
  compileType: 'miniprogram',
  libVersion: '3.9.0',
  packOptions: {
    ignore: [],
    include: []
  },
  condition: {},
  setting: {
    postcss: true,
    ignoreUploadUnusedFiles: true,
    babelSetting: {
      ignore: [],
      disablePlugins: [],
      outputPath: ''
    }
  },
  editorSetting: {
    tabIndent: 'insertSpaces',
    tabSize: 2
  }
}

const aliProjectConfig = {
  enableAppxNg: true,
  component2: true
}

const PROJECT_CONFIG_MAP = {
  wx: wxProjectConfig,
  ali: aliProjectConfig
}

const OUTPUT_PATH_MAP = {
  wx: path.resolve(__dirname, '../static/wx/project.config.json'),
  ali: path.resolve(__dirname, '../static/ali/mini.project.json'),
}
// 写入文件
const outputPath = OUTPUT_PATH_MAP[PLATFORM_ENV]
fs.writeFileSync(outputPath, JSON.stringify(PROJECT_CONFIG_MAP[PLATFORM_ENV], null, 2))
console.log(`✅ 生成${PLATFORM_ENV}项目配置文件：${outputPath}`)

const envConfigPath = path.resolve(__dirname, '../src/utils/envConfig.js')
fs.writeFileSync(envConfigPath, `export const envConfig = ${JSON.stringify(config, null, 2)}`)
console.log(`✅ 生成${PLATFORM_ENV}环境变量文件：${envConfigPath}`)

console.log(`✅ 当前 ${ENV} 环境`)
console.log(`   AppID: ${config.appId}  项目名: ${config.projectName}`)
