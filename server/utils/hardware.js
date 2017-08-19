/* eslint no-bitwise:0 */
import five from 'johnny-five';
import pixel from 'node-pixel';

export const getPositions = (stripLength) => new Array(stripLength).fill(0).map((x, i) => i);

export const random = (cap) => Math.floor(Math.random() * (cap - 1)) + 1;

export const rgb2Int = (r, g, b) => ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);

export const colorGenerators = {
  red: (intensity) => `rgb(${intensity}, 0, 0)`,
  green: (intensity) => `rgb(0, ${intensity}, 0)`,
  blue: (intensity) => `rgb(0, 0, ${intensity})`,
  purple: (intensity) => `rgb(${intensity}, 0, ${intensity})`
};

export const getAccessoryClass = (accessoryProps) => ({
  strip: (board) =>
    new pixel.Strip({
      ...accessoryProps,
      board
    }),
  mic: (pin) => new five.Sensor(pin),
  piezo: (pin) => new five.Piezo(pin)
});
