/* eslint no-mixed-operators:0 */
import ws281x from 'rpi-ws281x-native';

const raspiController = () => {
  // TODO replace rpi-ws281x-native example
  const NUM_LEDS = parseInt(process.argv[2], 10) || 10;
  const pixelData = new Uint32Array(NUM_LEDS);

  ws281x.init(NUM_LEDS);

  // ---- trap the SIGINT and reset before exit
  process.on('SIGINT', () => {
    ws281x.reset();
    process.nextTick(() => process.exit(0));
  });

  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = 0xffcc22;
  }
  ws281x.render(pixelData);

  // ---- animation-loop
  const t0 = Date.now();
  setInterval(() => {
    const dt = Date.now() - t0;

    ws281x.setBrightness(
      Math.floor(Math.sin(dt / 1000) * 128 + 128));
  }, 1000 / 30);
};

export default raspiController;
