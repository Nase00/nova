/* eslint no-console:0 */
/* globals console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import boardsController from './controllers/boards';
import raspiController from './controllers/raspi';
import router from './routes';

const server = new Koa();
const port = process.env.PORT || 4001;

server.use(bodyParser());
server.use(router.routes());

const run = async () => {
  console.log(`Listening on port ${port}`);

  // boardsController();
  raspiController();

  await server.listen(port);
};

run();
