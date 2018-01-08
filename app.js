const Koa = require("koa");
const path = require("path");
const PORT = process.env.NODE_ENV;
const router = require("koa-simple-router");
const co = require("co");
const render = require("koa-swig");
const app = new Koa();

app.context.render = co.wrap(render({
    root:path.join(__dirname,"./assists"),
    autoescape:true,
    cache:"memory",
    ext:"html"
}));

app.use(router( _ => {
    _.get("/",async ctx => {
        // if(PORT === "8080"){
        //     ctx.cookies.set("test","hello",{
        //         // domain:".memeda.com"
        //     })
        // }
        ctx.type="html";
        ctx.body = ctx.render("index");
    });
}));

app.listen(PORT);