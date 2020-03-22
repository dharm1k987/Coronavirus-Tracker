const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
      app.use(
        '/cors',
        createProxyMiddleware({
          target: 'http://localhost:8000/',
          pathRewrite: {
            '^/cors':'' //remove /service/api
          }
        }),
      );


}