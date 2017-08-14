/* eslint import/prefer-default-export:0 */
/* eslint no-console:0 */
import path from 'path';
import { readFileSync } from 'fs';

const readJSON = (fileName) => {
  const filePath = path.join(__dirname, fileName);

  return JSON.parse(readFileSync(filePath, 'utf8'));
};

const getEnv = () => {
  let boards = {};
  let raspi = {};

  try {
    boards = readJSON('./boards.json');
  } catch (e) {
    console.log('No boards configuration found.', e);
  }

  try {
    raspi = readJSON('./raspi.json');
  } catch (e) {
    console.log('No raspi configuration found.', e);
  }

  return { boards, raspi };
};

const userEnv = getEnv();

const defaultEnv = {
  boards: {},
  raspi: {
    leds: 60,
    pin: 18
  }
};

export const raspi = {
  ...defaultEnv.raspi,
  ...userEnv.raspi
};

export const boards = {
  ...defaultEnv.boards,
  ...userEnv.boards
};
