import { type Serve } from "bun";
import RenderEngine from "./engine.ts";
import path from "node:path";
import { readdir } from "node:fs/promises";

const engine = new RenderEngine();

export default {
	async fetch(req) {
		const url = path.normalize(new URL(req.url).pathname);

		if (url !== "/") {
			const file = Bun.file(`public${url}`);
			if (file.size > 0) {
				return new Response(file);
			}
		}

		let data: { protobuf?: string } = {};
		const pathname = url.replace(/\/+$/, "/index");
		const partial =
			Bun.file(path.join(process.cwd(), "views", `${pathname}.ejs`)).size > 0;
		const urlParts = url.split("/").slice(1);

		if (url === "/protobuf") {
			data.protobuf = await Bun.file("public/api.proto").text();
		}

		let foldersPath = "views/";
		let routeLayout = "views/_layout.ejs";
		let index = 0;
		for (const part of urlParts) {
			let files = [];
			try {
				files = await readdir(foldersPath);
			} catch (e) {
				return new Response(Bun.file("views/404.html"), {
					headers: {
						"Content-Type": "text/html",
					},
				});
			}

			if (files.includes("_layout.ejs")) {
				routeLayout = `${foldersPath}_layout.ejs`;
			}

			if (files.includes("_props.json")) {
				data = {
					...data,
					...JSON.parse(await Bun.file(`${foldersPath}_props.json`).text()),
				};
			}

			if (
				index === urlParts.length - 1 &&
				files.includes(`${pathname.slice(1)}.json`)
			) {
				data = {
					...data,
					...JSON.parse(
						await Bun.file(`${foldersPath}${pathname.slice(1)}.json`).text(),
					),
				};
			}

			foldersPath += `${part}/`;
			index += 1;
		}

		if (partial) {
			return new Response(
				await engine.renderFile(
					`views${pathname}.ejs`,
					await Bun.file(routeLayout).text(),
					data,
				),
				{
					headers: {
						"Content-Type": "text/html",
					},
				},
			);
		}

		return new Response(Bun.file("views/404.html"), {
			headers: {
				"Content-Type": "text/html",
			},
		});
	},
} satisfies Serve;
