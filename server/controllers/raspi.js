/* eslint no-mixed-operators:0 */
import ws281x from 'rpi-ws281x-native';

import { raspi } from 'environment';
import { EMIT_REGISTER_RASPI } from 'ducks/devices';
import store from 'store';

import cylon from 'effects/cylon';

const raspiController = () => {
  ws281x.init(raspi.length);

  store.dispatch({
    type: EMIT_REGISTER_RASPI,
    raspi
  });

  // ---- trap the SIGINT and reset before exit
  process.on('SIGINT', () => {
    ws281x.reset();
    process.nextTick(() => process.exit(0));
  });

  // cylon(ws281x, raspi);

  // for (let i = 0; i < raspi.leds; i++) {
  //   pixelData[i] = 0xffcc22;
  // }
  // ws281x.render(pixelData);

  // // ---- animation-loop
  // let offset = 0;
  // setInterval(() => {
  //   let i = raspi.leds;
  //   while (i--) {
  //     pixelData[i] = 0;
  //   }
  //   pixelData[offset] = 0xffffff;

  //   offset = (offset + 1) % raspi.leds;
  //   ws281x.render(pixelData);
  // }, 100);
};

export default raspiController;
