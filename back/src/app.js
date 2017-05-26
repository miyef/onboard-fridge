const Koa = require('koa');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const cors = require('kcors');
const session = require('koa-session');
const crypto = require('crypto');
const { config } = require('dotenv');
const router = require('./routes');

const app = new Koa();

config();

const debug = require('debug')('onboard-fridge');

app.keys = [process.env.SESSION_SECRET];

app.use(compress());
app.use(session({ key: 'onboard-fridge' }, app));
app.use(async (ctx, next) => {
    if (ctx.session.isNew) {
        const randomBytes = await new Promise((resolve) => {
            crypto.randomBytes(256, (err, buf) => {
                resolve(buf.toString('hex'));
            });
        });
        ctx.session.key = randomBytes;
    }
    await next();
});
app.use(app.env === 'development' ? morgan('dev') : morgan('combined'));
app.use(bodyParser());
app.use(helmet());
app.use(cors());

app.use(router.routes(), router.allowedMethods());

debug('Starting server on port 3000');
app.listen(3000);
