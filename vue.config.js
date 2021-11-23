module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use 'sass:math'; @import "@/assets/scss/main.scss";`,
      },
    },
  },
}
