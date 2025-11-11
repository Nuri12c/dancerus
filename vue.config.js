
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' /* '/dancerus/' */ : '/',
  transpileDependencies: true,
  // ← Добавь это ↓
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const vueFlags = {
        __VUE_OPTIONS_API__: true,                    // Включаем Options API
        __VUE_PROD_DEVTOOLS__: false,                 // Отключаем devtools в проде
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // ← Убирает предупреждение
      }

      args[0] = {
        ...args[0],
        ...vueFlags
      }

      return args
    })
  }
})
