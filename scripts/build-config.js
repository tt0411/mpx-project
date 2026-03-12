/**
 * Dynamic config generator for multi-platform mini-program builds.
 * 动态生成多平台小程序构建配置。
 */

const fs = require('fs')
const path = require('path')

const WX_CONFIG_MAP = {
  test: {
    appId: 'wx43ed82bf04e8a3b7',
    baseURL: 'https://api-test.example.com',
    projectName: 'mpx-template-wx-test',
    env: 'test',
    envName: 'WeChat Test Environment'
  },
  prod: {
    appId: 'wx43ed82bf04e8a3b7',
    baseURL: 'https://api.example.com',
    projectName: 'mpx-template-wx-prod',
    env: 'prod',
    envName: 'WeChat Production Environment'
  }
}

const ALI_CONFIG_MAP = {
  test: {
    appId: '2019080466070862',
    baseURL: 'https://api-test.example.com',
    projectName: 'mpx-template-ali-test',
    env: 'test',
    envName: 'Alipay Test Environment'
  },
  prod: {
    appId: '2019080466070862',
    baseURL: 'https://api.example.com',
    projectName: 'mpx-template-ali-prod',
    env: 'prod',
    envName: 'Alipay Production Environment'
  }
}

const CONFIG_MAP = {
  wx: WX_CONFIG_MAP,
  ali: ALI_CONFIG_MAP
}

const ENV = process.env.APP_ENV || 'test'
const PLATFORM_ENV = process.env.PLATFORM_ENV || 'wx'

const platformConfig = CONFIG_MAP[PLATFORM_ENV]
const config = platformConfig && platformConfig[ENV]

if (!config) {
  console.error(`Invalid config: platform=${PLATFORM_ENV}, env=${ENV}`)
  process.exit(1)
}

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
  ali: path.resolve(__dirname, '../static/ali/mini.project.json')
}

const outputPath = OUTPUT_PATH_MAP[PLATFORM_ENV]
fs.writeFileSync(outputPath, JSON.stringify(PROJECT_CONFIG_MAP[PLATFORM_ENV], null, 2))
console.log(`Generated ${PLATFORM_ENV} project config: ${outputPath}`)

const envConfigPath = path.resolve(__dirname, '../src/utils/envConfig.js')
fs.writeFileSync(envConfigPath, `export const envConfig = ${JSON.stringify(config, null, 2)}\n`)
console.log(`Generated runtime env config: ${envConfigPath}`)
