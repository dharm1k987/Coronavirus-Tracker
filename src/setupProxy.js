const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/live-stats',
        createProxyMiddleware({
          target: 'http://localhost:9000/'
        })
      );
      app.use(
        '/timelines',
        createProxyMiddleware({
          target: 'http://localhost:9000/'
        })
      );
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