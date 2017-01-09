#!/usr/bin/env node

/* eslint no-console:0 */
/* globals console */

const cluster = require('cluster');

require('babel-register');
require('babel-polyfill');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (deadWorker) => {
    const worker = cluster.fork();

    console.log(`worker ${deadWorker.process.pid} died`);
    console.log(`worker ${worker.process.pid} born`);
  });
} else {
  require('kiwf')({ maxMemory: 900000000 });

  require('./server');
}
