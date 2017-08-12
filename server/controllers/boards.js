import five from 'johnny-five';
import { EMIT_REGISTER_ACCESSORY, EMIT_ACCESSORY_VALUE } from 'ducks/devices';
import { boards } from 'environment';
import store from 'store';
import { getAccessoryClass } from 'utils';

const boardsController = () => {
  const runBoard = (boardKey) => {
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
  };

  Object.keys(boards).forEach(runBoard);
};

export default boardsController;
