"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3000;
app.get('/', function (req, res) {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to WeTravel'
  });
});
app.listen(port, function () {
  console.log('Listening on port ', port);
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map