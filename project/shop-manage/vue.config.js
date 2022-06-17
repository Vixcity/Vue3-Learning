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
}