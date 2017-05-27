const Router = require('koa-router');
const { login, callback } = require('./auth.controller');

const router = new Router();

/** GET /auth/login - Redirect to MyECP for authentication */
router.get('/login', login);

/** GET /auth/callback - Redirect to MyECP for authentication */
// same as router.get('callback', authCtrl.callback);
router.get('/callback', callback);

module.exports = router;
