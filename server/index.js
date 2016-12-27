/* eslint no-console:0 */
/* globals console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const server = new Koa();
const port = process.env.PORT || 4000;

server.use(bodyParser());

const run = async () => {
  console.log(`Listening on port ${port}`);

  await server.listen(port);
};

run();
