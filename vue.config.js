module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/global.scss";`
      }
    }
  }
};