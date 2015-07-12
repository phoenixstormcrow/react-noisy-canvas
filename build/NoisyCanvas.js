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
//import React from 'react';
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

},{"noisify-canvas":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbm9pc2lmeS1jYW52YXMvbGliL25vaXNlLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL2xpYi9ub2lzaWZ5Q2FudmFzLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL25vZGVfbW9kdWxlcy9pcy1saXR0bGUtZW5kaWFuL2luZGV4LmpzIiwiL2hvbWUvcGhvZW5peC93ZWIvcmVhY3QtY2FudmFzLW5vaXNlL3NyYy9Ob2lzeUNhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OzZCQ0tvQixnQkFBZ0I7Ozs7cUJBRXJCLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLEtBQUssR0FBRyxnQ0FBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUN0RSxTQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDZjtBQUNELFFBQU0sRUFBRSxrQkFBWTtBQUNsQixXQUNFLGdDQUFRLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQVcsQ0FDckU7R0FDSDtDQUNGLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogbm9pc2UuanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIHJhbmQoKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogMHhmZiAmIDB4ZmY7XG59XG5cbnZhciBwaXhlbCA9IHJlcXVpcmUoJ2lzLWxpdHRsZS1lbmRpYW4nKSA/IGZ1bmN0aW9uIGxlKHIsIGcsIGIpIHtcbiAgcmV0dXJuIDB4ZmYgPDwgMjQgfCBiIDw8IDE2IHwgZyA8PCA4IHwgcjtcbn0gOiBmdW5jdGlvbiBiZShyLCBnLCBiKSB7XG4gIHJldHVybiByIDw8IDI0IHwgZyA8PCAxNiB8IGIgPDwgOCB8IDB4ZmY7XG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShjdHgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBfcmVmJG1vZGUgPSBfcmVmLm1vZGU7XG4gIHZhciBtb2RlID0gX3JlZiRtb2RlID09PSB1bmRlZmluZWQgPyAnZ3JleScgOiBfcmVmJG1vZGU7XG5cbiAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgaW1nRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEodywgaCksXG4gICAgICBidWYgPSBuZXcgQXJyYXlCdWZmZXIoaW1nRGF0YS5kYXRhLmxlbmd0aCksXG4gICAgICBwaXggPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoYnVmKSxcbiAgICAgIGRhdGEgPSBuZXcgVWludDMyQXJyYXkoYnVmKTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgdmFyIHIgPSB1bmRlZmluZWQsXG4gICAgICAgIGcgPSB1bmRlZmluZWQsXG4gICAgICAgIGIgPSB1bmRlZmluZWQ7XG4gICAgaWYgKG1vZGUgPT09ICdyZ2InKSB7XG4gICAgICByID0gcmFuZCgpO1xuICAgICAgZyA9IHJhbmQoKTtcbiAgICAgIGIgPSByYW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSBnID0gYiA9IHJhbmQoKTtcbiAgICB9XG4gICAgZGF0YVtpXSA9IHBpeGVsKHIsIGcsIGIpO1xuICB9XG5cbiAgaW1nRGF0YS5kYXRhLnNldChwaXgpO1xuICByZXR1cm4gaW1nRGF0YTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKiBub2lzaWZ5Q2FudmFzLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBub2lzaWZ5O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfbm9pc2UgPSByZXF1aXJlKCcuL25vaXNlJyk7XG5cbnZhciBfbm9pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9pc2UpO1xuXG5mdW5jdGlvbiBub2lzaWZ5KGNhbnZhcywgb3B0cykge1xuICB2YXIgcmVxSWQgPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gc3RlcChjdHgpIHtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKCgwLCBfbm9pc2UyWydkZWZhdWx0J10pKGN0eCwgb3B0cyksIDAsIDApO1xuICAgIHJlcUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RlcChjdHgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYW52YXM6IGNhbnZhcyxcbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICBzdGVwKGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxSWQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwibW9kdWxlLmV4cG9ydHMgPSAoKG5ldyBVaW50MzJBcnJheSgobmV3IFVpbnQ4QXJyYXkoWzEsMiwzLDRdKSkuYnVmZmVyKSlbMF0gPT09IDB4MDQwMzAyMDEpXG4iLCIvKiBOb2lzeUNhbnZhcy5qc1xuXG4gICByZWFjdCBjb21wb25lbnQgd3JhcHBlciBmb3Igbm9pc2lmeS1jYW52YXNcbiAgIGNyZWF0ZXMgYSBjYW52YXMgd2l0aCBwaXhlbCBub2lzZVxuKi9cbi8vaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBub2lzaWZ5IGZyb20gJ25vaXNpZnktY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIGxldCBub2lzeSA9IG5vaXNpZnkoUmVhY3QuZmluZERPTU5vZGUodGhpcyksIHttb2RlOiB0aGlzLnByb3BzLm1vZGV9KTtcbiAgICBub2lzeS5zdGFydCgpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGNhbnZhcyB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+PC9jYW52YXM+XG4gICAgKTtcbiAgfVxufSk7XG4iXX0=
