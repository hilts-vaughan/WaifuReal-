// app.js
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const app = new Koa();
const cors = require('@koa/cors');
const router = new Router();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(cors());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

// Setup the router; load all the controllers in here
require('./routes/index')({ router });

app.listen(3000);
