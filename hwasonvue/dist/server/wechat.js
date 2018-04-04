'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var sha1 = require('sha1');

var config = {
  wechat: {
    appID: '...',
    appSecret: '...',
    token: '...' }
};

var app = new Koa();

app.use(_regenerator2.default.mark(function _callee(next) {
  var token, signature, nonce, timestamp, echostr, str, sha;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = config.wechat.token;
          signature = this.query.signature;
          nonce = this.query.nonce;
          timestamp = this.query.timestamp;
          echostr = this.query.echostr;
          str = [token, timestamp, nonce].sort().join('');
          sha = sha1(str);

          this.body = sha === signature ? echostr + '' : 'failed';
        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
app.listen(8080);