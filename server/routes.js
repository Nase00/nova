import Router from 'koa-router';

import store from 'store';
import { EMIT_LIGHT, EMIT_EFFECT_TRIGGER } from 'ducks/devices';

const router = new Router();

router.post('/api/trigger', (crx) => {
  crx.body = 200;

  store.dispatch({
    type: EMIT_EFFECT_TRIGGER,
    boardKey: crx.headers.boardkey,
    accessoryKey: crx.headers.accessorykey,
    effect: crx.headers.effect
  });
});

export default router;
