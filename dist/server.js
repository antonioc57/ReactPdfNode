"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
const PORT = process.env.PORT || 3000;
_app.default.listen(PORT);