(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* noisifyCanvas.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = noisify;
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

function noisify(canvas, opts) {
  var reqId = undefined;

  function step(ctx) {
    ctx.putImageData(generate(ctx, opts), 0, 0);
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

},{"is-little-endian":2}],2:[function(require,module,exports){
module.exports = ((new Uint32Array((new Uint8Array([1,2,3,4])).buffer))[0] === 0x04030201)

},{}],3:[function(require,module,exports){
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

},{"noisify-canvas":1}],4:[function(require,module,exports){
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

},{"../NoisyCanvas":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbm9pc2lmeS1jYW52YXMvYnVpbGQvbm9pc2lmeUNhbnZhcy5qcyIsIm5vZGVfbW9kdWxlcy9ub2lzaWZ5LWNhbnZhcy9ub2RlX21vZHVsZXMvaXMtbGl0dGxlLWVuZGlhbi9pbmRleC5qcyIsIi9ob21lL3Bob2VuaXgvd2ViL3JlYWN0LWNhbnZhcy1ub2lzZS9zcmMvTm9pc3lDYW52YXMuanMiLCIvaG9tZS9waG9lbml4L3dlYi9yZWFjdC1jYW52YXMtbm9pc2Uvc3JjL2RlbW8vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7Ozs7Ozs7O0FDS0EsWUFBWSxDQUFDOzs7Ozs7Ozs2QkFFTyxnQkFBZ0I7Ozs7cUJBRXJCLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMvQixtQkFBaUIsRUFBRSw2QkFBWTtBQUM3QixRQUFJLEtBQUssR0FBRyxnQ0FBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUN0RSxTQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDZjtBQUNELFFBQU0sRUFBRSxrQkFBWTtBQUNsQixXQUNFLGdDQUFRLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQVcsQ0FDckU7R0FDSDtDQUNGLENBQUM7Ozs7QUNwQkYsWUFBWSxDQUFDOzs7OzJCQUVXLGdCQUFnQjs7OztBQUV4QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDM0IsUUFBTSxFQUFFLGtCQUFZO0FBQ2xCLFdBQ0U7OztNQUNFLGdEQUFhLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsS0FBSyxHQUFHO01BQ25ELGdEQUFhLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBSTtLQUNwQyxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxJQUFJLE9BQUcsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIG5vaXNpZnlDYW52YXMuanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG5vaXNpZnk7XG5mdW5jdGlvbiByYW5kKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDB4ZmYgJiAweGZmO1xufVxuXG52YXIgcGl4ZWwgPSByZXF1aXJlKCdpcy1saXR0bGUtZW5kaWFuJykgPyBmdW5jdGlvbiBsZShyLCBnLCBiKSB7XG4gIHJldHVybiAweGZmIDw8IDI0IHwgYiA8PCAxNiB8IGcgPDwgOCB8IHI7XG59IDogZnVuY3Rpb24gYmUociwgZywgYikge1xuICByZXR1cm4gciA8PCAyNCB8IGcgPDwgMTYgfCBiIDw8IDggfCAweGZmO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGUoY3R4KSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgX3JlZiRtb2RlID0gX3JlZi5tb2RlO1xuICB2YXIgbW9kZSA9IF9yZWYkbW9kZSA9PT0gdW5kZWZpbmVkID8gJ2dyZXknIDogX3JlZiRtb2RlO1xuXG4gIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcbiAgICAgIGltZ0RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpLFxuICAgICAgYnVmID0gbmV3IEFycmF5QnVmZmVyKGltZ0RhdGEuZGF0YS5sZW5ndGgpLFxuICAgICAgcGl4ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGJ1ZiksXG4gICAgICBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1Zik7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHZhciByID0gdW5kZWZpbmVkLFxuICAgICAgICBnID0gdW5kZWZpbmVkLFxuICAgICAgICBiID0gdW5kZWZpbmVkO1xuICAgIGlmIChtb2RlID09PSAncmdiJykge1xuICAgICAgciA9IHJhbmQoKTtcbiAgICAgIGcgPSByYW5kKCk7XG4gICAgICBiID0gcmFuZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByID0gZyA9IGIgPSByYW5kKCk7XG4gICAgfVxuICAgIGRhdGFbaV0gPSBwaXhlbChyLCBnLCBiKTtcbiAgfVxuXG4gIGltZ0RhdGEuZGF0YS5zZXQocGl4KTtcbiAgcmV0dXJuIGltZ0RhdGE7XG59XG5cbmZ1bmN0aW9uIG5vaXNpZnkoY2FudmFzLCBvcHRzKSB7XG4gIHZhciByZXFJZCA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBzdGVwKGN0eCkge1xuICAgIGN0eC5wdXRJbWFnZURhdGEoZ2VuZXJhdGUoY3R4LCBvcHRzKSwgMCwgMCk7XG4gICAgcmVxSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGVwKGN0eCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhbnZhczogY2FudmFzLFxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgIHN0ZXAoY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXFJZCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKChuZXcgVWludDMyQXJyYXkoKG5ldyBVaW50OEFycmF5KFsxLDIsMyw0XSkpLmJ1ZmZlcikpWzBdID09PSAweDA0MDMwMjAxKVxuIiwiLyogTm9pc3lDYW52YXMuanNcblxuICAgcmVhY3QgY29tcG9uZW50IHdyYXBwZXIgZm9yIG5vaXNpZnktY2FudmFzXG4gICBjcmVhdGVzIGEgY2FudmFzIHdpdGggcGl4ZWwgbm9pc2VcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG5vaXNpZnkgZnJvbSAnbm9pc2lmeS1jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG5vaXN5ID0gbm9pc2lmeShSZWFjdC5maW5kRE9NTm9kZSh0aGlzKSwge21vZGU6IHRoaXMucHJvcHMubW9kZX0pO1xuICAgIG5vaXN5LnN0YXJ0KCk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Y2FudmFzIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fT48L2NhbnZhcz5cbiAgICApO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IE5vaXN5Q2FudmFzIGZyb20gJy4uL05vaXN5Q2FudmFzJztcblxubGV0IERlbW8gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Tm9pc3lDYW52YXMgd2lkdGg9ezUwMH0gaGVpZ2h0PXs0MDB9IG1vZGU9J3JnYicgLz5cbiAgICAgICAgPE5vaXN5Q2FudmFzIHdpZHRoPXs0MDB9IGhlaWdodD17MzAwfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgPERlbW8gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vJylcbik7XG4iXX0=
