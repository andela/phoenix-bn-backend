"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('GET index route', function () {
  it('Displays welcome message when user visit', function (done) {
    _chai["default"].request(_index["default"]).get('/').end(function (error, res) {
      if (error) return error;
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.keys('status', 'message');
      expect(res.body.status).to.a('string');
      expect(res.body.message).to.a('string');
      done();
    });
  });
});
//# sourceMappingURL=indexRoutTests.js.map