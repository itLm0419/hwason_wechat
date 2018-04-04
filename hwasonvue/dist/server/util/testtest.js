"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [get].map(_regenerator2.default.mark);

function get(x) {
  var y;
  return _regenerator2.default.wrap(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return x + 2;

        case 2:
          y = _context.sent;
          return _context.abrupt("return", y);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var g = gen(1);
g.next(1);
g.next(2);