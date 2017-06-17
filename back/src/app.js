/**
 * @fileoverview Koa application configuration
 * @module App
 * @author Nayef Ghattas
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

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

const debug = require('debug')('onboard-fridge');

// ------------------------------------------------------------------------------
// Basic configuration
// ------------------------------------------------------------------------------

const app = new Koa();

// Load configuration
config();

// Initialize session secret
app.keys = [process.env.SESSION_SECRET];

// ------------------------------------------------------------------------------
// Loading middlewares and routes
// ------------------------------------------------------------------------------

app
    // Gzip response
    .use(compress())
    // Initialize session
    .use(session({ key: 'onboard-fridge' }, app))
    // Add session key
    .use(async (ctx, next) => {
        if (ctx.session.isNew) {
            ctx.session.key = await new Promise((resolve) => {
                crypto.randomBytes(256, (err, buf) => {
                    resolve(buf.toString('hex'));
                });
            });
        }
        await next();
    })
    // Start appropriate logger
    .use(app.env === 'development' ? morgan('dev') : morgan('combined'))
    // Parse request body
    .use(bodyParser())
    // Use some security defaults
    .use(helmet())
    // Use cors
    .use(cors());

// Load all router
app.use(router.routes()).use(router.allowedMethods());

// ------------------------------------------------------------------------------
// Bind server on port
// ------------------------------------------------------------------------------

debug('Starting server on port 3000');
app.listen(3000);
