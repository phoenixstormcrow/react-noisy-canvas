# react-noisy-canvas

A react component which creates an html canvas animated with noise.

This component creates a canvas and passes it to [noisify-canvas](https://github.com/phoenixstormcrow/noisify-canvas) to create animated noise.

## usage
```
import NoisyCanvas from 'react-noisy-canvas';

React.render(
  <NoisyCanvas width={300} height={150} mode='rgb' />,
  document.getElementById('noisyCanvas')
);
```

## props

- width: The width of the canvas. Defaults to 300.
- height: The height of the canvas. Defaults to 150.
- mode: Set mode to the string `'rgb'` to generate color noise. Defaults to `undefined`, which has the same behavior as `mode='grey'`. Greyscale noise is generated in the default case.
