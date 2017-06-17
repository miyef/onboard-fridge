const Router = require('koa-router');
const Auth = require('./auth/auth.route');

const router = new Router();

router.get('/health-check', (ctx) => {
    ctx.body = 'OK';
});

router.use('/auth', Auth.routes(), Auth.allowedMethods());

module.exports = router;
