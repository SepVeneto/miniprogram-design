const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa()

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', 'POST');
  await next();
});
app.use(serve(__dirname, { extensions: ['html'] }))


module.exports = function run() {
  app.listen(8091, () => {
    console.log('listen to 8091')
  })
}
