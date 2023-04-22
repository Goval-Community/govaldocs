import path from "node:path";
import fs from "node:fs/promises";

import Koa from "koa";
const app = new Koa();

import router from "koa-router";
const _ = router();

// Static Files

import serve from "koa-static";
import mount from "koa-mount";
app.use(mount("/", serve(`${process.cwd()}/public`)));

app.use(_.routes());
app.use(_.allowedMethods());

// EJS Routing
const layout = "_layout";

import render from "koa-ejs";
render(app, {
	layout,
	root: `${process.cwd()}/views/`,
	viewExt: "ejs",
	cache: false,
	debug: false,
});

import send from "koa-send";

app.use(async (ctx, next) => {
	const data = {};
	const pathname = ctx.path.replace(/\/+$/, "/index");
	const partial = await fs
		.access(path.join(process.cwd(), "views", `${pathname}.ejs`))
		.then(() => true)
		.catch(() => false);

	const url_parts = pathname.split("/").slice(1);

	const route_layout = `${url_parts
		.splice(0, url_parts.length - 1)
		.join("/")}/${layout}`;

	if (pathname === "/protobuf") {
		data.protobuf = await fs.readFile("public/api.proto");
	}

	if (partial) {
		return await ctx.render(pathname, { layout: route_layout, ...data });
	}

	await send(ctx, "404.html", { root: `${process.cwd()}/views/` });
});

app.listen(3000);
