const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    devServer: {
        open: true,  // npm run serve后自动打开页面
        host: '0.0.0.0',
        port: 8080, // 开发服务器运行端口号
        hotOnly: true, // 热更新,
        // 代理服务器，向后端发请求
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // 去除/api到后端
                pathRewrite: {
                    // 命中后去掉/api
                    '^/api': ''
                }
            }
        }
    },

    // 这里因为一个@assets搞了半天，这里的resolve需要在上面写上方法
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
    },
}