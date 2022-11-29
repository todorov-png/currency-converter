const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: process.env.NODE_ENV === "production" ? "/currency-converter/" : "/",
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "~@/assets/scss/_variables.scss"; @import "~@/assets/scss/_mixins.scss";',
            },
        },
    },
});
