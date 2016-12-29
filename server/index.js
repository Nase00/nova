/* eslint no-console:0 */
/* globals console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const server = new Koa();
const port = process.env.PORT || 4000;

server.use(bodyParser());

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

  const types = {
    strip: (board, accessoryProps) => new pixel.Strip({
      ...accessorieProps,
      board
    }),
    mic: (pin) => new five.Sensor(pin),
    piezo: (pin) => new five.Piezo(pin)
  };

  Object.keys(boards).forEach((boardKey) => {
    const board = new five.Board({ repl: false });
    const accessoriesProps = boards[boardKey];

    board.on('fail', () => {
      throw new Error('Board connection failed');
    });

    board.on('ready', () => {
      Object.keys(accessoriesProps).forEach((accessoryPropsKey) => {
        const accessoryProps = accessories[accessoryKey];
        const accessoryCreator = types[accessoryProps.type];
        const accessory = accessoryCreator(board, accessoryProps);

        store.dispatch({
          type: EMIT_REGISTER_ACCESSORY,
          accessoryKey,
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
