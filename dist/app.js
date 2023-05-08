"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _youch = _interopRequireDefault(require("youch"));
var Sentry = _interopRequireWildcard(require("@sentry/node"));
require("express-async-errors");
var _routes = _interopRequireDefault(require("./routes"));
var _sentry = _interopRequireDefault(require("./config/sentry"));
var _path = _interopRequireDefault(require("path"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_dotenv.default.config();
class App {
  constructor() {
    this.server = (0, _express.default)();
    Sentry.init(_sentry.default);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }
  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use((0, _cors.default)());
    this.server.use(_express.default.json());
    this.server.use('/files', _express.default.static(_path.default.resolve(__dirname, '..', 'public', 'images')));
  }
  routes() {
    this.server.use(_routes.default);
    this.server.use(Sentry.Handlers.errorHandler());
  }
  exceptionHandler() {
    // eslint-disable-next-line no-unused-vars
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new _youch.default(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal server error'
      });
    });
  }
}
var _default = new App().server;
exports.default = _default;