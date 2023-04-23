import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import minifyHtml from "@minify-html/node";
import logUpdate from "log-update";
import hljs from "highlight.js";
import * as ejs from "ejs";
import chalk from "chalk";

const startTime = performance.now();
const spinner = [
	"🕛",
	"🕐",
	"🕑",
	"🕒",
	"🕓",
	"🕔",
	"🕕",
	"🕖",
	"🕗",
	"🕘",
	"🕙",
	"🕚",
];

import makeProtobufLang from "./ssg/protobuf.js";

// Makes sure all custom message types are rendered as types and not just normal text
hljs.registerLanguage(
	"protobuf",
	makeProtobufLang(JSON.parse(await readFile("ssg/apitypes.json"))),
);

const template_cache = {};
const highlighting_script_regex =
	/<script .*?id="highlighting-script".*?><\/script>/g;

const to_compile = [];
let longestPath = 0;

async function crawlDir(
	dirs,
	prefix,
	writePrefix,
	lastWithLayout,
	page_data = {},
) {
	const files = dirs.map((item) => item.name);
	// If _layout.ejs exists in directory mark that as the most recently seen layout file.
	// This is used so that if a directory doesn't have its own specific _layout.ejs file
	// it will use the last _layout.ejs seen.
	if (files.includes("_layout.ejs")) {
		lastWithLayout = prefix;

		let contents = await readFile(`${prefix}_layout.ejs`, {
			encoding: "utf-8",
		});
		contents = contents.replace(highlighting_script_regex, "");
		template_cache[prefix] = contents;
	}

	if (files.includes("_props.json")) {
		page_data = {
			...page_data,
			...JSON.parse(
				await readFile(`${prefix}_props.json`, {
					encoding: "utf-8",
				}),
			),
		};
	}

	const dir_promises = [];
	for (const item of dirs) {
		if (item.isDirectory()) {
			const dir = `${prefix}${item.name}/`;
			dir_promises.push(
				crawlDir(
					await readdir(dir, { withFileTypes: true }),
					dir,
					`${writePrefix}${item.name}/`,
					lastWithLayout,
					page_data,
				),
			);
		} else if (item.isFile() || item.isSymbolicLink()) {
			if (item.name.slice(-4) !== ".ejs" || item.name === "_layout.ejs") {
				continue;
			}

			const file_name = item.name.slice(0, item.name.length - 4);

			const this_page_data = { ...page_data };

			if (files.includes(`${file_name}.json`)) {
				Object.assign(
					this_page_data,
					JSON.parse(
						await readFile(`${prefix}${file_name}.json`, {
							encoding: "utf-8",
						}),
					),
				);
			}

			const readFrom = `${prefix}${item.name}`;

			if (readFrom.length > longestPath) {
				longestPath = readFrom.length;
			}

			const writeTo =
				// rome-ignore lint/style/useTemplate: Easier to read
				`out/${writePrefix}` + (file_name !== "index" ? `${file_name}/` : "");
			to_compile.push({
				path: readFrom,
				writeTo: `${writeTo}index.html`,
				folderPath: writeTo,
				layout: lastWithLayout,
				info: this_page_data,
			});
		} else {
			console.warn(
				chalk.yellow(
					`⚠️ Warning unknown file type for file: ${prefix}${item.name}`,
				),
			);
		}
	}
	await Promise.all(dir_promises);
}

const render_data = { protobuf: await readFile("public/api.proto") };
const hljs_regex =
	/<pre><code class="language-([A-z]*)">((?:.|\n)*?)<\/code><\/pre>/gm;
const hljs_regex_replace = new RegExp(hljs_regex.source, "m");

async function render(file_info) {
	if (file_info.folderPath !== "") {
		await mkdir(file_info.folderPath, {
			recursive: true,
		});
	}

	let out = ejs.render(
		await readFile(file_info.path, {
			encoding: "utf-8",
		}),
		{ ...render_data, ...file_info.info },
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

	out = ejs.render(template_cache[file_info.layout], {
		...file_info.info,
		body: out,
	});

	out = minifyHtml.minify(Buffer.from(out), {
		do_not_minify_doctype: true,
		keep_html_and_head_opening_tags: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true,
	});

	await writeFile(file_info.writeTo, out);
	logUpdate.clear();
	console.log(
		// rome-ignore lint/style/useTemplate: Easier to read
		chalk.green("🔨 Built ") +
			chalk.cyan(file_info.path.padEnd(longestPath + 2)) +
			"-> " +
			chalk.magenta(file_info.writeTo),
	);
	renderSpinner();

	built += 1;
}

await crawlDir(await readdir("views", { withFileTypes: true }), "views/", "");
let built = 0;

let i = 0;
function renderSpinner() {
	logUpdate(
		// rome-ignore lint/style/useTemplate: makes coloring easier
		spinner[i] +
			chalk.cyan(" Building ") +
			chalk.greenBright(`${built}`) +
			"/" +
			chalk.green(`${to_compile.length}`),
	);
}
const cancelSpinner = setInterval(() => {
	i = ++i % spinner.length;
	renderSpinner();
}, 1000 / spinner.length); // One full cycle every second.

const filePromises = [];
for (const file of to_compile) {
	filePromises.push(render(file));
}
await Promise.all(filePromises);

const endTime = performance.now();
clearInterval(cancelSpinner);

logUpdate(
	chalk.greenBright(
		`✨ Built ${chalk.yellowBright(built)} files in ${
			Math.round((endTime - startTime) / 10) / 100
		} seconds!`,
	),
);
