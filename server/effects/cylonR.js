/* eslint operator-assignment:0 */
/* globals setInterval, clearInterval, setTimeout */
import { UP, DOWN, FPS } from 'constants';
import { getPositions } from 'utils';

const cylonR = (ws281x, pixelData) => {
  const positions = getPositions(pixelData.length);

  let red = 100;
  let blue = 0;
  let blueDirection = UP;
  let redDirection = DOWN;
  let direction = UP;
  let valueToLight = 0;

  const interval = setInterval(() => {
    if (blue >= 255) {
      blueDirection = DOWN;
    } else if (blue <= 0) {
      blueDirection = UP;
    }

    if (blueDirection === UP) {
      blue++;
    } else {
      blue--;
    }

    if (red >= 100) {
      redDirection = DOWN;
    } else if (red <= 0) {
      redDirection = UP;
    }

    if (redDirection === UP) {
      red++;
    } else {
      red--;
    }

    if (valueToLight >= pixelData.length - 1) {
      direction = DOWN;
    }

    if (valueToLight <= 0) {
      direction = UP;
    }

    if (direction === UP) {
      valueToLight++;
    } else {
      valueToLight--;
    }

    const color = `rgb(${red}, ${0}, ${blue})`;

    pixelData[positions[valueToLight]] = color;
    ws281x.render();
  }, 1000 / FPS);

  return interval;
};

export default cylonR;
