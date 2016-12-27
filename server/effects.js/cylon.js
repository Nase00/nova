/* eslint operator-assignment:0 */
/* globals setInterval, clearInterval, setTimeout */
import { FPS, UP, DOWN, BLACK, RESET_DESK_LIGHT_STRIP_TIMEOUT } from 'constants';
import { getPositions } from './devices';

const random = (cap) => Math.floor(Math.random() * (cap - 1)) + 1;

let interval;

export const cylonEye = {
  start(strip, stripLength) {
    const positions = getPositions(stripLength);

    let red = 100;
    let blue = 0;
    let blueDirection = UP;
    let redDirection = DOWN;
    let direction = UP;
    let valueToLight = 0;

    interval = setInterval(() => {
      strip.color(BLACK);

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

      if (valueToLight >= stripLength - 1) {
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

      strip.pixel(positions[valueToLight]).color(color);
      strip.show();
    }, 1000 / FPS);
  }
};

