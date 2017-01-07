/* eslint import/prefer-default-export:0 */
import path from 'path';
import { readFileSync } from 'fs';

const readFile = (fileName) => {
  const filePath = path.join(__dirname, fileName);

  return JSON.parse(readFileSync(filePath, 'utf8'));
};

const boards = readFile('../environment/boards.json');

export { boards };
