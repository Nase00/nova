import Router from 'koa-router';

import store from 'store';
import { EMIT_EFFECT_TRIGGER } from 'ducks/devices';

const router = new Router();

router.post('/api/trigger', (crx) => {
  crx.body = 200;

  const additionalParam = {
    params: crx.headers.params ? JSON.parse(crx.headers.params) : null
  };

  store.dispatch({
    type: EMIT_EFFECT_TRIGGER,
    boardKey: crx.headers.boardkey,
    accessoryKey: crx.headers.accessorykey,
    effect: crx.headers.effect,
    ...additionalParam
  });
});

export default router;
