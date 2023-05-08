"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _MakePdfController = _interopRequireDefault(require("./app/controllers/MakePdfController"));
const routes = new _express.Router();
routes.get('/make-pdf', _MakePdfController.default.send);
var _default = routes;
exports.default = _default;