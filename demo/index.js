(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* noise.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function rand() {
  return Math.random() * 0xff & 0xff;
}

var pixel = require('is-little-endian') ? function le(r, g, b) {
  return 0xff << 24 | b << 16 | g << 8 | r;
} : function be(r, g, b) {
  return r << 24 | g << 16 | b << 8 | 0xff;
};

function generate(ctx) {
  var _ref = arguments[1] === undefined ? {} : arguments[1];

  var _ref$mode = _ref.mode;
  var mode = _ref$mode === undefined ? 'grey' : _ref$mode;

  var w = ctx.canvas.width,
      h = ctx.canvas.height,
      imgData = ctx.createImageData(w, h),
      buf = new ArrayBuffer(imgData.data.length),
      pix = new Uint8ClampedArray(buf),
      data = new Uint32Array(buf);

  for (var i = 0, l = data.length; i < l; ++i) {
    var r = undefined,
        g = undefined,
        b = undefined;
    if (mode === 'rgb') {
      r = rand();
      g = rand();
      b = rand();
    } else {
      r = g = b = rand();
    }
    data[i] = pixel(r, g, b);
  }

  imgData.data.set(pix);
  return imgData;
}

exports['default'] = generate;
module.exports = exports['default'];
},{"is-little-endian":3}],2:[function(require,module,exports){
/* noisifyCanvas.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = noisify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noise = require('./noise');

var _noise2 = _interopRequireDefault(_noise);

function noisify(canvas, opts) {
  var reqId = undefined;

  function step(ctx) {
    ctx.putImageData((0, _noise2['default'])(ctx, opts), 0, 0);
    reqId = window.requestAnimationFrame(function () {
      return step(ctx);
    });
  }

  return {
    canvas: canvas,
    start: function start() {
      step(canvas.getContext('2d'));
    },
    stop: function stop() {
      window.cancelAnimationFrame(reqId);
    }
  };
}

module.exports = exports['default'];
},{"./noise":1}],3:[function(require,module,exports){
module.exports = ((new Uint32Array((new Uint8Array([1,2,3,4])).buffer))[0] === 0x04030201)

},{}],4:[function(require,module,exports){
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

},{"noisify-canvas":2}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NoisyCanvas = require('../NoisyCanvas');

var _NoisyCanvas2 = _interopRequireDefault(_NoisyCanvas);

var Demo = React.createClass({
  displayName: 'Demo',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(_NoisyCanvas2['default'], { width: 500, height: 400, mode: 'rgb' }),
      React.createElement(_NoisyCanvas2['default'], { width: 400, height: 300 })
    );
  }
});

React.render(React.createElement(Demo, null), document.getElementById('demo'));

},{"../NoisyCanvas":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbm9pc2lmeS1jYW52YXMvbGliL25vaXNlLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL2xpYi9ub2lzaWZ5Q2FudmFzLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL25vZGVfbW9kdWxlcy9pcy1saXR0bGUtZW5kaWFuL2luZGV4LmpzIiwiL2hvbWUvcGhvZW5peC93ZWIvcmVhY3QtY2FudmFzLW5vaXNlL3NyYy9Ob2lzeUNhbnZhcy5qcyIsIi9ob21lL3Bob2VuaXgvd2ViL3JlYWN0LWNhbnZhcy1ub2lzZS9zcmMvZGVtby9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBOzs7Ozs7OztBQ0tBLFlBQVksQ0FBQzs7Ozs7Ozs7NkJBRU8sZ0JBQWdCOzs7O3FCQUVyQixLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDL0IsbUJBQWlCLEVBQUUsNkJBQVk7QUFDN0IsUUFBSSxLQUFLLEdBQUcsZ0NBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7QUFDdEUsU0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0dBQ2Y7QUFDRCxRQUFNLEVBQUUsa0JBQVk7QUFDbEIsV0FDRSxnQ0FBUSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFXLENBQ3JFO0dBQ0g7Q0FDRixDQUFDOzs7O0FDcEJGLFlBQVksQ0FBQzs7OzsyQkFFVyxnQkFBZ0I7Ozs7QUFFeEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzNCLFFBQU0sRUFBRSxrQkFBWTtBQUNsQixXQUNFOzs7TUFDRSxnREFBYSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLEtBQUssR0FBRztNQUNuRCxnREFBYSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUk7S0FDcEMsQ0FDTjtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxNQUFNLENBQ1Ysb0JBQUMsSUFBSSxPQUFHLEVBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FDaEMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBub2lzZS5qcyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gcmFuZCgpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAweGZmICYgMHhmZjtcbn1cblxudmFyIHBpeGVsID0gcmVxdWlyZSgnaXMtbGl0dGxlLWVuZGlhbicpID8gZnVuY3Rpb24gbGUociwgZywgYikge1xuICByZXR1cm4gMHhmZiA8PCAyNCB8IGIgPDwgMTYgfCBnIDw8IDggfCByO1xufSA6IGZ1bmN0aW9uIGJlKHIsIGcsIGIpIHtcbiAgcmV0dXJuIHIgPDwgMjQgfCBnIDw8IDE2IHwgYiA8PCA4IHwgMHhmZjtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlKGN0eCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIF9yZWYkbW9kZSA9IF9yZWYubW9kZTtcbiAgdmFyIG1vZGUgPSBfcmVmJG1vZGUgPT09IHVuZGVmaW5lZCA/ICdncmV5JyA6IF9yZWYkbW9kZTtcblxuICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXG4gICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICBpbWdEYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3LCBoKSxcbiAgICAgIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihpbWdEYXRhLmRhdGEubGVuZ3RoKSxcbiAgICAgIHBpeCA9IG5ldyBVaW50OENsYW1wZWRBcnJheShidWYpLFxuICAgICAgZGF0YSA9IG5ldyBVaW50MzJBcnJheShidWYpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICB2YXIgciA9IHVuZGVmaW5lZCxcbiAgICAgICAgZyA9IHVuZGVmaW5lZCxcbiAgICAgICAgYiA9IHVuZGVmaW5lZDtcbiAgICBpZiAobW9kZSA9PT0gJ3JnYicpIHtcbiAgICAgIHIgPSByYW5kKCk7XG4gICAgICBnID0gcmFuZCgpO1xuICAgICAgYiA9IHJhbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgciA9IGcgPSBiID0gcmFuZCgpO1xuICAgIH1cbiAgICBkYXRhW2ldID0gcGl4ZWwociwgZywgYik7XG4gIH1cblxuICBpbWdEYXRhLmRhdGEuc2V0KHBpeCk7XG4gIHJldHVybiBpbWdEYXRhO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBnZW5lcmF0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIG5vaXNpZnlDYW52YXMuanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG5vaXNpZnk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9ub2lzZSA9IHJlcXVpcmUoJy4vbm9pc2UnKTtcblxudmFyIF9ub2lzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ub2lzZSk7XG5cbmZ1bmN0aW9uIG5vaXNpZnkoY2FudmFzLCBvcHRzKSB7XG4gIHZhciByZXFJZCA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBzdGVwKGN0eCkge1xuICAgIGN0eC5wdXRJbWFnZURhdGEoKDAsIF9ub2lzZTJbJ2RlZmF1bHQnXSkoY3R4LCBvcHRzKSwgMCwgMCk7XG4gICAgcmVxSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGVwKGN0eCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhbnZhczogY2FudmFzLFxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgIHN0ZXAoY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXFJZCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJtb2R1bGUuZXhwb3J0cyA9ICgobmV3IFVpbnQzMkFycmF5KChuZXcgVWludDhBcnJheShbMSwyLDMsNF0pKS5idWZmZXIpKVswXSA9PT0gMHgwNDAzMDIwMSlcbiIsIi8qIE5vaXN5Q2FudmFzLmpzXG5cbiAgIHJlYWN0IGNvbXBvbmVudCB3cmFwcGVyIGZvciBub2lzaWZ5LWNhbnZhc1xuICAgY3JlYXRlcyBhIGNhbnZhcyB3aXRoIHBpeGVsIG5vaXNlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBub2lzaWZ5IGZyb20gJ25vaXNpZnktY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIGxldCBub2lzeSA9IG5vaXNpZnkoUmVhY3QuZmluZERPTU5vZGUodGhpcyksIHttb2RlOiB0aGlzLnByb3BzLm1vZGV9KTtcbiAgICBub2lzeS5zdGFydCgpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGNhbnZhcyB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+PC9jYW52YXM+XG4gICAgKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBOb2lzeUNhbnZhcyBmcm9tICcuLi9Ob2lzeUNhbnZhcyc7XG5cbmxldCBEZW1vID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5vaXN5Q2FudmFzIHdpZHRoPXs1MDB9IGhlaWdodD17NDAwfSBtb2RlPSdyZ2InIC8+XG4gICAgICAgIDxOb2lzeUNhbnZhcyB3aWR0aD17NDAwfSBoZWlnaHQ9ezMwMH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxEZW1vIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtbycpXG4pO1xuIl19
