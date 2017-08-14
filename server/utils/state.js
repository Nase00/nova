import { get } from 'lodash';

/**
 * @param {object} state
 * @param {object} action
 * @param {object} reducers
 * @returns {object} newState - Returns new state clone if modified by reducer,
 *                              else returns original, unmutated state object.
 */
export const handleAction = (state, action, reducers) => {
  const newState = reducers[action.type] ? reducers[action.type]() : state;

  return newState || state;
};

export const getDevice = (state) => ({ raspi, boardKey, accessoryKey }) => {
  if (raspi) {
    return { accessory: state.pixelData, options: { length: raspi.leds } };
  }

  return get(state, `${boardKey}.${accessoryKey}`, false);
};
