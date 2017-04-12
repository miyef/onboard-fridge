import Koa from 'koa';
import morgan from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import cors from 'kcors';

import router from './routes';

import { config } from 'dotenv';

config();

const debug = require('debug')('onboard-fridge');

const app = new Koa();

app.use(compress());
app.use(app.env === 'development' ? morgan('dev') : morgan('combined'));
app.use(bodyParser());
app.use(helmet());
app.use(cors());

app.use(router.routes());

debug('Starting server on port 3000');
app.listen(3000);
