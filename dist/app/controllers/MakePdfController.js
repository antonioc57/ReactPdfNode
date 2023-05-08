"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = _interopRequireWildcard(require("@react-pdf/renderer"));
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class MakePdfController {
  async send(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string().required()
    });
    if (!(await schema.isValid({
      message: req.query.message
    }))) {
      return res.status(400).json({
        error: 'Validation fails'
      });
    }
    const MyDocument = () => /*#__PURE__*/_react.default.createElement(_renderer.Document, null, /*#__PURE__*/_react.default.createElement(_renderer.Page, null, /*#__PURE__*/_react.default.createElement(_renderer.Text, null, `${req.query.message} page 1`), /*#__PURE__*/_react.default.createElement(_renderer.Image, {
      src: "http://localhost:3333/files/01.png"
    })), /*#__PURE__*/_react.default.createElement(_renderer.Page, null, /*#__PURE__*/_react.default.createElement(_renderer.Text, null, `${req.query.message} page 2`)));
    const pdfStream = await _renderer.default.renderToStream( /*#__PURE__*/_react.default.createElement(MyDocument, null));
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
    pdfStream.on('end', () => console.log('Done streaming, response sent.'));
  }
}
var _default = new MakePdfController();
exports.default = _default;