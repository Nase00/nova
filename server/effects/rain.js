import { getPositions, random } from 'utils';
import { UP, DOWN, FPS } from 'constants';

const rain = (strip, { length }) => {
  const rgbBiases = ['RED', 'BLUE'];
  const generateColor = (r, g, b) => `rgb(${r}, ${0}, ${b})`;
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
      if (drop.rgbBiases === 'RED') {
        drop.color = generateColor(drop.intensity, tunedDown, tunedDown);
      } else if (drop.rgbBias === 'GREEN') {
        drop.color = generateColor(tunedDown, drop.intensity, tunedDown);
      } else if (drop.rgbBias === 'BLUE') {
        drop.color = generateColor(tunedDown, tunedDown, drop.intensity);
      }
    });
  }, 1000 / FPS);

  return interval;
};

export default rain;
