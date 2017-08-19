/* eslint operator-assignment:0 */
/* globals setInterval, clearInterval, setTimeout */
import { UP, DOWN, BLACK, FPS } from 'constants';
import { getPositions, rgb2Int } from 'utils';

const cylon = (strip, { type, length }, { accessoryKey }) => {
  const pixelData = getPositions(length);

  let red = 100;
  let blue = 0;
  let blueDirection = UP;
  let redDirection = DOWN;
  let direction = UP;
  let valueToLight = 0;

  const interval = setInterval(() => {
    if (accessoryKey !== 'raspi') strip.color(BLACK);

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

    if (valueToLight >= length - 1) {
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

    if (accessoryKey === 'raspi') {
      const color = rgb2Int(red, 0, blue);

      pixelData[valueToLight] = color;
      strip.render(pixelData);
    } else {
      const color = `rgb(${red}, ${0}, ${blue})`;

      strip.pixel(valueToLight).color(color);
      strip.show();
    }
  }, 1000 / FPS);

  return interval;
};

export default cylon;
