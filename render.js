import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import minifyHtml from "@minify-html/node";
import logUpdate from "log-update";
import chalk from "chalk";
import RenderEngine from "./engine.js";

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

async function render(renderer, fileInfo) {
	if (fileInfo.folderPath !== "") {
		await mkdir(fileInfo.folderPath, {
			recursive: true,
		});
	}

	let out = await renderer.renderFile(
		fileInfo.path,
		template_cache[fileInfo.layout],
		{ ...render_data, ...fileInfo.info },
	);

	out = minifyHtml.minify(Buffer.from(out), {
		do_not_minify_doctype: true,
		keep_html_and_head_opening_tags: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true,
	});

	await writeFile(fileInfo.writeTo, out);
	logUpdate.clear();
	console.log(
		// rome-ignore lint/style/useTemplate: Easier to read
		chalk.green("🔨 Built ") +
			chalk.cyan(fileInfo.path.padEnd(longestPath + 2)) +
			"-> " +
			chalk.magenta(fileInfo.writeTo),
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

const renderEngine = new RenderEngine();
const filePromises = [];
for (const file of to_compile) {
	filePromises.push(render(renderEngine, file));
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
