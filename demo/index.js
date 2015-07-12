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

},{"noisify-canvas":2}],5:[function(require,module,exports){
//import React from 'react';
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbm9pc2lmeS1jYW52YXMvbGliL25vaXNlLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL2xpYi9ub2lzaWZ5Q2FudmFzLmpzIiwibm9kZV9tb2R1bGVzL25vaXNpZnktY2FudmFzL25vZGVfbW9kdWxlcy9pcy1saXR0bGUtZW5kaWFuL2luZGV4LmpzIiwiL2hvbWUvcGhvZW5peC93ZWIvcmVhY3QtY2FudmFzLW5vaXNlL3NyYy9Ob2lzeUNhbnZhcy5qcyIsIi9ob21lL3Bob2VuaXgvd2ViL3JlYWN0LWNhbnZhcy1ub2lzZS9zcmMvZGVtby9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OzZCQ0tvQixnQkFBZ0I7Ozs7cUJBRXJCLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLEtBQUssR0FBRyxnQ0FBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUN0RSxTQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDZjtBQUNELFFBQU0sRUFBRSxrQkFBWTtBQUNsQixXQUNFLGdDQUFRLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQVcsQ0FDckU7R0FDSDtDQUNGLENBQUM7Ozs7Ozs7OzsyQkNqQnNCLGdCQUFnQjs7OztBQUV4QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDM0IsUUFBTSxFQUFFLGtCQUFZO0FBQ2xCLFdBQ0U7OztNQUNFLGdEQUFhLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsS0FBSyxHQUFHO01BQ25ELGdEQUFhLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBSTtLQUNwQyxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxJQUFJLE9BQUcsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG5vaXNlLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiByYW5kKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDB4ZmYgJiAweGZmO1xufVxuXG52YXIgcGl4ZWwgPSByZXF1aXJlKCdpcy1saXR0bGUtZW5kaWFuJykgPyBmdW5jdGlvbiBsZShyLCBnLCBiKSB7XG4gIHJldHVybiAweGZmIDw8IDI0IHwgYiA8PCAxNiB8IGcgPDwgOCB8IHI7XG59IDogZnVuY3Rpb24gYmUociwgZywgYikge1xuICByZXR1cm4gciA8PCAyNCB8IGcgPDwgMTYgfCBiIDw8IDggfCAweGZmO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUoY3R4KSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgX3JlZiRtb2RlID0gX3JlZi5tb2RlO1xuICB2YXIgbW9kZSA9IF9yZWYkbW9kZSA9PT0gdW5kZWZpbmVkID8gJ2dyZXknIDogX3JlZiRtb2RlO1xuXG4gIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcbiAgICAgIGltZ0RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpLFxuICAgICAgYnVmID0gbmV3IEFycmF5QnVmZmVyKGltZ0RhdGEuZGF0YS5sZW5ndGgpLFxuICAgICAgcGl4ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGJ1ZiksXG4gICAgICBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1Zik7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHZhciByID0gdW5kZWZpbmVkLFxuICAgICAgICBnID0gdW5kZWZpbmVkLFxuICAgICAgICBiID0gdW5kZWZpbmVkO1xuICAgIGlmIChtb2RlID09PSAncmdiJykge1xuICAgICAgciA9IHJhbmQoKTtcbiAgICAgIGcgPSByYW5kKCk7XG4gICAgICBiID0gcmFuZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByID0gZyA9IGIgPSByYW5kKCk7XG4gICAgfVxuICAgIGRhdGFbaV0gPSBwaXhlbChyLCBnLCBiKTtcbiAgfVxuXG4gIGltZ0RhdGEuZGF0YS5zZXQocGl4KTtcbiAgcmV0dXJuIGltZ0RhdGE7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGdlbmVyYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyogbm9pc2lmeUNhbnZhcy5qcyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gbm9pc2lmeTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX25vaXNlID0gcmVxdWlyZSgnLi9ub2lzZScpO1xuXG52YXIgX25vaXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25vaXNlKTtcblxuZnVuY3Rpb24gbm9pc2lmeShjYW52YXMsIG9wdHMpIHtcbiAgdmFyIHJlcUlkID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIHN0ZXAoY3R4KSB7XG4gICAgY3R4LnB1dEltYWdlRGF0YSgoMCwgX25vaXNlMlsnZGVmYXVsdCddKShjdHgsIG9wdHMpLCAwLCAwKTtcbiAgICByZXFJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0ZXAoY3R4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FudmFzOiBjYW52YXMsXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgc3RlcChjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSk7XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcUlkKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIm1vZHVsZS5leHBvcnRzID0gKChuZXcgVWludDMyQXJyYXkoKG5ldyBVaW50OEFycmF5KFsxLDIsMyw0XSkpLmJ1ZmZlcikpWzBdID09PSAweDA0MDMwMjAxKVxuIiwiLyogTm9pc3lDYW52YXMuanNcblxuICAgcmVhY3QgY29tcG9uZW50IHdyYXBwZXIgZm9yIG5vaXNpZnktY2FudmFzXG4gICBjcmVhdGVzIGEgY2FudmFzIHdpdGggcGl4ZWwgbm9pc2VcbiovXG4vL2ltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgbm9pc2lmeSBmcm9tICdub2lzaWZ5LWNhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbm9pc3kgPSBub2lzaWZ5KFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLCB7bW9kZTogdGhpcy5wcm9wcy5tb2RlfSk7XG4gICAgbm9pc3kuc3RhcnQoKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxjYW52YXMgd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9PjwvY2FudmFzPlxuICAgICk7XG4gIH1cbn0pO1xuIiwiLy9pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5vaXN5Q2FudmFzIGZyb20gJy4uL05vaXN5Q2FudmFzJztcblxubGV0IERlbW8gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Tm9pc3lDYW52YXMgd2lkdGg9ezUwMH0gaGVpZ2h0PXs0MDB9IG1vZGU9J3JnYicgLz5cbiAgICAgICAgPE5vaXN5Q2FudmFzIHdpZHRoPXs0MDB9IGhlaWdodD17MzAwfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgPERlbW8gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vJylcbik7XG4iXX0=
