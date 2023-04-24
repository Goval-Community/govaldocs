import RenderEngine from "./engine.js";
import fs from "node:fs/promises";
import path from "node:path";

// Koa imports
import serve from "koa-static";
import mount from "koa-mount";
import send from "koa-send";
import Koa from "koa";

const app = new Koa();

// Static Files
app.use(mount("/", serve(`${process.cwd()}/public`)));

// EJS Files
const engine = new RenderEngine();
app.use(async (ctx, next) => {
	let data = {};
	const pathname = ctx.path.replace(/\/+$/, "/index");
	const partial = await fs
		.access(path.join(process.cwd(), "views", `${pathname}.ejs`))
		.then(() => true)
		.catch(() => false);

	if (pathname === "/protobuf") {
		data.protobuf = await fs.readFile("public/api.proto");
	}

	const urlParts = pathname.split("/").slice(1);
	let foldersPath = "views/";
	let routeLayout = "views/_layout.ejs";
	let index = 0;
	for (const part of urlParts) {
		let files = [];
		try {
			files = await fs.readdir(foldersPath);
		} catch (e) {
			return await send(ctx, "404.html", { root: `${process.cwd()}/views/` });
		}

		if (files.includes("_layout.ejs")) {
			routeLayout = `${foldersPath}_layout.ejs`;
		}

		if (files.includes("_props.json")) {
			data = {
				...data,
				...JSON.parse(
					await fs.readFile(`${foldersPath}_props.json`, {
						encoding: "utf-8",
					}),
				),
			};
		}

		if (
			index === urlParts.length - 1 &&
			files.includes(`${pathname.slice(1)}.json`)
		) {
			data = {
				...data,
				...JSON.parse(
					await fs.readFile(`${foldersPath}${pathname.slice(1)}.json`, {
						encoding: "utf-8",
					}),
				),
			};
		}

		foldersPath += `${part}/`;
		index += 1;
	}

	if (partial) {
		ctx.body = await engine.renderFile(
			`views${pathname}.ejs`,
			await fs.readFile(routeLayout, {
				encoding: "utf-8",
			}),
			data,
		);
		ctx.type = "html";
		return;
	}

	return await send(ctx, "404.html", { root: `${process.cwd()}/views/` });
});

app.listen(3000);
