/* NoisyCanvas.js

   react component wrapper for noisify-canvas
   creates a canvas with pixel noise
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noisifyCanvas = require('noisify-canvas');

var _noisifyCanvas2 = _interopRequireDefault(_noisifyCanvas);

exports['default'] = React.createClass({
  displayName: 'NoisyCanvas',

  componentDidMount: function componentDidMount() {
    var noisy = (0, _noisifyCanvas2['default'])(React.findDOMNode(this), { mode: this.props.mode });
    noisy.start();
  },
  render: function render() {
    return React.createElement('canvas', { width: this.props.width, height: this.props.height });
  }
});
module.exports = exports['default'];
