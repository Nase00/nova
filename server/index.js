/* eslint no-console:0 */
/* globals console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import five from 'johnny-five';
import pixel from 'node-pixel';

import { EMIT_REGISTER_ACCESSORY, EMIT_ACCESSORY_VALUE } from 'ducks/devices';
import store from 'store';
import router from './routes';

const server = new Koa();
const port = process.env.PORT || 4000;

server.use(bodyParser());
server.use(router.routes());

const run = async () => {
  console.log(`Listening on port ${port}`);

  const boards = { // TODO unhardcode
    1: {
      deskLight: {
        type: 'strip',
        data: 6,
        length: 60,
        color_order: 'GRB',
        controller: 'FIRMATA'
      }
    }
  };

  const getAccessoryClass = (accessoryProps) => ({
    strip: (board) => new pixel.Strip({
      ...accessoryProps,
      board
    }),
    mic: (pin) => new five.Sensor(pin),
    piezo: (pin) => new five.Piezo(pin)
  });

  Object.keys(boards).forEach((boardKey) => {
    const board = new five.Board({ repl: false });
    const accessoriesProps = boards[boardKey];

    board.on('fail', () => {
      throw new Error('Board connection failed');
    });

    board.on('ready', () => {
      Object.keys(accessoriesProps).forEach((accessoryPropsKey) => {
        const accessoryProps = accessoriesProps[accessoryPropsKey];
        const initializeAccessory = getAccessoryClass(accessoryProps)[accessoryProps.type];
        const accessory = initializeAccessory(board, accessoryProps);

        store.dispatch({
          type: EMIT_REGISTER_ACCESSORY,
          options: boards[boardKey][accessoryPropsKey],
          boardKey,
          accessoryPropsKey,
          accessory
        });

        accessory.on('ready', (value) => store.dispatch({
          type: EMIT_ACCESSORY_VALUE,
          value
        }));
      });
    });
  });

  await server.listen(port);
};

run();
