module.exports = {
    devServer: {
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
    }
}