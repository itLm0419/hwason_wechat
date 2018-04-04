'use strict';

module.exports = function (response, respObj) {
  response.writeHead('Content-type', 'application/json');
  response.send(200, respObj);
};