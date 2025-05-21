const { defineConfig } = require('unocss')
const presetMpx = require('@mpxjs/unocss-base')

module.exports = defineConfig({
  include: [/\.mpx($|\?)/],
  presets: [
      presetMpx({
        // baseFontSize: 4 
      })
  ],
  shortcuts: [
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-center', 'flex items-center justify-center'],
  ],
})
