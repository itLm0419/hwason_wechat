require('./check-versions')()
// process.env.NODE_ENV = 'production'

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
let multer  = require('multer')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()





// 需要使用body-parser模块,要不然post方法获取不到传递的参数
var bodyParser = require('body-parser')
// 设置接收参数的大小,主要针对于base64的图片
app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var session = require('express-session');
var crypto = require('crypto');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// app.get('/admin/logistics/print',function(req, res, next) {
//     console.log("helo")
// });


app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: '12345',
  cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: true,  //是否允许session重新设置，要保证session有操作时候，必须设置这个属性为true
  saveUninitialized: true,
  unset:'keep'
}));

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var appActivityServer = require('../dist/server/test')
var appActivityinfoServer = require('../dist/server/company/wechat/activityinfo/activityinfo')
var appActivityServer = require('../dist/server/company/wechat/activitysheet/activity')
var comHealthRecordServer = require('../dist/server/company/wechat/comHealthRecords/comHealthRecords')
var appSampleServer = require('../dist/server/company/wechat/sample/sample')
var loginServer = require('../dist/server/login')
var salesmanServer = require('../dist/server/salesman/salesman')
var nurseServer = require('../dist/server/nurse/nurse')
var examinationServer = require('../dist/server/examination/examination')

var file1Server = require('../dist/server/file')

var healthRecords = require('../dist/server/salesman/healthRecords');
healthRecords(app);

appActivityServer(app)
appActivityinfoServer(app)
appActivityServer(app)
appSampleServer(app)
loginServer(app)
nurseServer(app)
salesmanServer(app)
file1Server(app)
examinationServer(app)

comHealthRecordServer(app)



var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
