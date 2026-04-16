/**
 * Dynamic config generator for WeChat mini-program builds.
 * 动态生成微信小程序构建配置。
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

const ENV = process.env.APP_ENV || 'test'
const config = WX_CONFIG_MAP[ENV]

if (!config) {
  console.error(`Invalid config: env=${ENV}`)
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
    urlCheck: false,
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

const outputPath = path.resolve(__dirname, '../static/wx/project.config.json')
fs.writeFileSync(outputPath, JSON.stringify(wxProjectConfig, null, 2))
console.log(`Generated wx project config: ${outputPath}`)

const envConfigPath = path.resolve(__dirname, '../src/utils/envConfig.js')
fs.writeFileSync(envConfigPath, `export const envConfig = ${JSON.stringify(config, null, 2)}\n`)
console.log(`Generated runtime env config: ${envConfigPath}`)
