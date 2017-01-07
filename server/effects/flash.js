import { UP, DOWN, BLACK, FPS } from 'constants';

const colorGenerators = {
  red: (intensity) => `rgb(${intensity}, 0, 0)`,
  green: (intensity) => `rgb(0, ${intensity}, 0)`,
  blue: (intensity) => `rgb(0, 0, ${intensity})`,
  purple: (intensity) => `rgb(${intensity}, 0, ${intensity})`
};

const flash = (strip, options, params) => {
  strip.color(BLACK);
  const { color } = params;
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
