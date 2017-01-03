export const colorGenerators = {
  red: (intensity) => `rgb(${intensity}, 0, 0)`,
  green: (intensity) => `rgb(0, ${intensity}, 0)`,
  blue: (intensity) => `rgb(0, 0, ${intensity})`,
  purple: (intensity) => `rgb(${intensity}, 0, ${intensity})`
};

export const flashAuthorized = (strip, getColor, callback) => {
  let intensity = 0;
  let direction = UP;

  clearInterval(interval);
  strip.clear();

  interval = setInterval(() => {
    if (direction === UP) {
      intensity = intensity + 5;
    } else {
      intensity = intensity - 5;
    }

    if (intensity >= 255) {
      direction = DOWN;
    }

    strip.color(getColor(intensity));
    strip.show();
  }, 1000 / FPS);

  setTimeout(() => {
    clearInterval(interval);
    strip.clear();
    callback();
  }, RESET_DESK_LIGHT_STRIP_TIMEOUT);
};
