import { get } from 'lodash';

import { RED_BIAS, GREEN_BIAS, BLUE_BIAS, BLACK, UP, DOWN, FPS } from 'constants';
import { getPositions, random } from 'utils';

const defaultParams = { rgbBiases: [RED_BIAS, BLUE_BIAS] };

const rain = (strip, { length }, params) => {
  const rgbBiases = get(params, 'rgbBiases', defaultParams.rgbBiases);
  strip.color(BLACK);

  const generateColor = (r = 0, g = 0, b = 0) => `rgb(${r}, ${g}, ${b})`;
  const generateRGBBias = () => rgbBiases[random(rgbBiases.length + 1) - 1];
  const createDrop = () => ({
    color: generateColor(0, 0, 0),
    rgbBias: generateRGBBias(),
    intensity: random(255),
    position: random(length),
    direction: UP
  });
  const positions = getPositions(length);

  const drops = [];

  for (let i of Array(10).keys()) { // eslint-disable-line no-unused-vars, prefer-const
    drops.push(createDrop(length));
  }

  const interval = setInterval(() => {
    strip.show();

    drops.forEach((drop) => {
      strip.pixel(positions[drop.position]).color(drop.color);

      if (drop.direction === UP) {
        drop.intensity += 6;
      } else if (drop.direction === DOWN) {
        drop.intensity -= 6;
      }

      if (drop.intensity >= 255) {
        drop.direction = DOWN;
      } else if (drop.intensity <= 0) {
        drop.direction = UP;
        drop.position = random(length);
        drop.rgbBias = generateRGBBias();
      }

      const tunedDown = Math.max(drop.intensity - 50, 0);
      if (drop.rgbBiases === RED_BIAS) {
        drop.color = generateColor(drop.intensity, 0, tunedDown);
      } else if (drop.rgbBias === GREEN_BIAS) {
        drop.color = generateColor(tunedDown, drop.intensity, tunedDown);
      } else if (drop.rgbBias === BLUE_BIAS) {
        drop.color = generateColor(tunedDown, 0, drop.intensity);
      }
    });
  }, 1000 / FPS);

  return interval;
};

export default rain;
