/* NoisyCanvas.js

   react component wrapper for noisify-canvas
   creates a canvas with pixel noise
*/

'use strict';

import noisify from 'noisify-canvas';

export default React.createClass({
  componentDidMount: function () {
    let noisy = noisify(React.findDOMNode(this), {mode: this.props.mode});
    noisy.start();
  },
  render: function () {
    return (
      <canvas width={this.props.width} height={this.props.height}></canvas>
    );
  }
});
