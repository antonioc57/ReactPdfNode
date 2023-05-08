"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class MediumTesteController {
  async send(req, res) {
    return res.json({
      message: 'Hello Medium baliam57'
    });
  }
}
var _default = new MediumTesteController();
exports.default = _default;