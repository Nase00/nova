import { cloneDeep, get, set } from 'lodash';

import { durations } from 'constants';
import effects from 'effects';
import { handleAction } from 'utils';

export const EMIT_REGISTER_BOARD = 'EMIT_REGISTER_BOARD';

export const EMIT_REGISTER_ACCESSORY = 'EMIT_REGISTER_ACCESSORY';
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
      const { boardKey, accessoryPropsKey, accessory, options } = action;

      set(newState, `${boardKey}.${accessoryPropsKey}`, { accessory, options });

      return newState;
    },

    [EMIT_ACCESSORY_VALUE]: () => state,

    [EMIT_EFFECT_TRIGGER]: () => {
      const { boardKey, accessoryKey, params } = action;
      const { accessory, options } = get(state, `${boardKey}.${accessoryKey}`, false);
      const effect = effects[action.effect];

      clearInterval(state.interval);

      if (accessory && effect) {
        const newEffect = effects[action.effect];
        const interval = newEffect(accessory, options, params);
        const duration = durations[action.effect] || durations[state.previousEffect];

        const newState = {
          ...state,
          interval
        };

        if (duration && state.previousEffect && newEffect !== state.previousEffect) {
          setTimeout(() => {
            clearInterval(interval);
            // TODO yuck, async!
            state.interval = state.previousEffect(accessory, ...state.previousArgs);
          }, duration);
        } else {
          newState.previousEffect = newEffect;
          newState.previousArgs = [options, params];
        }

        return newState;
      }

      return state;
    }
  };

  return handleAction(state, action, reducers);
};

export default boardsReducer;
