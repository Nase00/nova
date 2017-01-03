import { HueApi } from 'node-hue-api';
import { get } from 'lodash';

import { DESK_LIGHT_STRIP_PRIMARY,
         DESK_LIGHT_STRIP_PRIMARY_LENGTH } from 'constants';
import { cloneDeep, set } from 'lodash';

import { handleAction } from 'utils';
import * as effects from 'effects';

export const EMIT_REGISTER_BOARD = 'EMIT_REGISTER_BOARD';

export const EMIT_REGISTER_ACCESSORY = 'EMIT_REGISTER_ACCESSORY;'
export const EMIT_ACCESSORY_VALUE = 'EMIT_ACCESSORY_VALUE';

export const EMIT_EFFECT_TRIGGER = 'EMIT_EFFECT_TRIGGER';

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

    [EMIT_REGISTER_ACCESSORY]: () => {
      const newState = cloneDeep(state);
      const { boardkey, accessoryPropsKey, accessory } = action;

      set(newState, `[${action.boardKey}][${action.accessoryPropsKey}]`, accessory);

      return newState;
    },

    [EMIT_ACCESSORY_VALUE]: () => state,

    [EMIT_EFFECT_TRIGGER]: () => {
      const { boardKey, accessoryKey } = action;
      const device = get(state, `[${boardKey}].${accessoryKey}`, false);
      const effect = effects[action.effect];

      if (device && effect) {
        effects[action.effect].start(device, 60);
      }

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default boardsReducer;
