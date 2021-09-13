const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/download', {
        target: 'http://127.0.0.1:8081/',
        "changeOrigin": true,
        "secure": false
    }));
    app.use(proxy('/checkExcelFile', {
        target: 'http://127.0.0.1:8081/',
        "changeOrigin": true,
        "secure": false
    }));
};