import { UP, DOWN, BLACK, FPS } from 'constants';

import { colorGenerators } from 'utils';

const flash = (strip, options, { color }) => {
  strip.color(BLACK);
  const getColor = colorGenerators[color];

  let intensity = 0;
  let direction = UP;

  const interval = setInterval(() => {
    if (direction === UP) {
      intensity += 5;
    } else {
      intensity -= 5;
    }

    if (intensity >= 255) {
      direction = DOWN;
    }

    strip.color(getColor(intensity));
    strip.show();
  }, 1000 / FPS);

  return interval;
};

export default flash;
