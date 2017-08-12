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
    boards = readJSON('../environment/boards.json');
  } catch (e) {
    console.log('No boards configuration found.');
  }

  try {
    raspi = readJSON('../environment/raspi.json');
  } catch (e) {
    console.log('No raspi configuration found.');
  }

  return { boards, raspi };
};

const { boards, raspi } = getEnv();

export const defaultEnvironment = {
  boards: { ...boards },
  raspi: {
    leds: 60,
    pin: 18,
    ...raspi
  }
};
