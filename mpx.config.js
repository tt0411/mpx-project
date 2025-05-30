const { defineConfig } = require("@vue/cli-service");
// const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const path = require("path");
module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  pluginOptions: {
    mpx: {
      plugin: {
        // 全局变量
        defs: {
          __env__: 'mini',
        },
        srcMode: "wx",
        writeMode: "change",
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const packageJSONPath = path.resolve("package.json");
          if (files.has(packageJSONPath)) files.delete(packageJSONPath);
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath);
          }
        },
      },
      resolve: {
        alias: {
          "@": "./src",
          "@api": "./src/api",
          "@components": "./src/components",
          "@utils": "./src/utils",
          "@store": "./src/store",
          "@pages": "./src/pages",
        },
      },
      loader: {},
      unocss: {},
    },
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {},
});
