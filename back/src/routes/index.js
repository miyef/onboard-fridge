import Router from 'koa-router';

const router = new Router();

router.get('/health-check', (ctx) => {
    ctx.body="OK";
});

export default router;