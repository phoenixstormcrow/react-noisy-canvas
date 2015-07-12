'use strict';

import NoisyCanvas from '../NoisyCanvas';

let Demo = React.createClass({
  render: function () {
    return (
      <div>
        <NoisyCanvas width={500} height={400} mode='rgb' />
        <NoisyCanvas width={400} height={300} />
      </div>
    );
  }
});

React.render(
  <Demo />,
  document.getElementById('demo')
);
