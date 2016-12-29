import { HueApi } from 'node-hue-api';
import { get } from 'lodash';

import { DESK_LIGHT_STRIP_PRIMARY,
         DESK_LIGHT_STRIP_PRIMARY_LENGTH } from 'constants';
import { config } from 'environment';
import { handleAction,
         rain } from 'utils';

export const EMIT_REGISTER_BOARD = 'EMIT_REGISTER_BOARD';
export const EMIT_REGISTER_ACCESSORY = 'EMIT_REGISTER_ACCESSORY;'

const initialState = {};

const boardsReducer = (state = initialState, action) => {
  const reducers = {
    [EMIT_REGISTER_BOARD]: () => ({
      ...state,
      boards: {
        ...state.boards,
        [action.boardKey]: {
          ...action.accessories
        }
      }
    }),

    [EMIT_REGISTER_ACCESSORY]: () => ({
      ...state,
      [action.accessoryKey]: action.accessory
    })
  };

  return handleAction(state, action, reducers);
};

export default boardsReducer;
