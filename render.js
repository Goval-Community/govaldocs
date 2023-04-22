import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import minifyHtml from "@minify-html/node";
import hljs from "highlight.js";
import * as ejs from "ejs";
import chalk from "chalk";

import makeProtobufLang from "./ssg/protobuf.js";

// Makes sure all custom message types are rendered as types and not just normal text
hljs.registerLanguage(
	"protobuf",
	makeProtobufLang(JSON.parse(await readFile("ssg/apitypes.json"))),
);

// This is only really used by views/protobuf.ejs
const render_data = { protobuf: await readFile("public/api.proto") };

// Caches _layout.ejs files
const template_cache = {};

// Used to detect where code blocks that need to be highlighted are
const hljs_regex =
	/<pre><code class="language-([A-z]*)">((?:.|\n)*?)<\/code><\/pre>/gm;
const hljs_regex_replace = new RegExp(hljs_regex.source, "m");

// Used to remove the highlighting script from the pages, as syntax highlighting has already been done
const highlighting_script_regex =
	/<script .*?id="highlighting-script".*?><\/script>/g;

// Recursively crawl and render out all files in views/
async function crawlDir(dirs, prefix, writePrefix) {
	for (const dirent of dirs) {
		if (dirent.isDirectory()) {
			const dir = `${prefix}${dirent.name}/`;
			crawlDir(
				await readdir(dir, { withFileTypes: true }),
				dir,
				`${writePrefix}${dirent.name}/`,
			);
		} else {
			const file = dirent.name;
			// File isn't ejs or file is _layout.ejs, in both cases we ignore the file
			if (file.slice(-4) !== ".ejs" || file === "_layout.ejs") {
				continue;
			}

			let path = "";

			// index.ejs is just rendered to <dir>/index.html not <dir>/index/index.html
			if (file !== "index.ejs") {
				path = `${file.slice(0, file.length - 4)}/`;
				await mkdir(`out/${writePrefix}${file.slice(0, file.length - 4)}`, {
					recursive: true,
				});
			}

			// Cache relevant _layout.ejs if not cached already
			if (!template_cache.hasOwnProperty(writePrefix)) {
				let contents = await readFile(`${prefix}_layout.ejs`, {
					encoding: "utf-8",
				});
				contents = contents.replace(highlighting_script_regex, "");
				template_cache[writePrefix] = contents;
			}

			let out = ejs.render(
				await readFile(`${prefix}${file}`, {
					encoding: "utf-8",
				}),
				render_data,
			);

			// Compute all syntax highlighting for code blocks
			const matches = out.matchAll(hljs_regex);
			for (const match of matches) {
				const lang = match[1];
				const replace = `<pre><code class="language-${lang} hljs">${
					hljs.highlight(match[2], { language: lang }).value
				}</code></pre>`;
				out = out.replace(hljs_regex_replace, replace);
			}

			out = ejs.render(template_cache[writePrefix], { body: out });

			out = minifyHtml.minify(Buffer.from(out), {
				do_not_minify_doctype: true,
				keep_html_and_head_opening_tags: true,
				ensure_spec_compliant_unquoted_attribute_values: true,
				keep_spaces_between_attributes: true,
			});

			await writeFile(`out/${writePrefix}${path}index.html`, out);

			console.log(
				// rome-ignore lint/style/useTemplate: <explanation>
				chalk.green("🔨 Building") +
					chalk.cyan(` ${prefix}${file}`).padEnd(46) +
					"-> " +
					chalk.magenta(`out/${writePrefix}${path}index.html`),
			);
		}
	}
}

await crawlDir(await readdir("views", { withFileTypes: true }), "views/", "");
