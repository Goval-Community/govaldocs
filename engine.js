import { readFile } from "node:fs/promises";
import hljs from "highlight.js";
import * as ejs from "ejs";

import makeProtobufLang from "./ssg/protobuf.js";
// Makes sure all custom message types are rendered as types and not just normal text
hljs.registerLanguage(
	"protobuf",
	makeProtobufLang(JSON.parse(await readFile("ssg/apitypes.json"))),
);

export default class RenderEngine {
	hljs_regex =
		/<pre><code class="language-([A-z]*)">((?:.|\n)*?)<\/code><\/pre>/gm;
	hljs_regex_replace = new RegExp(this.hljs_regex.source, "m");

	render(contents, layout, info) {
		let out = ejs.render(contents, info);

		// Compute all syntax highlighting for code blocks
		const matches = out.matchAll(this.hljs_regex);
		for (const match of matches) {
			const lang = match[1];
			const replace = `<pre><code class="language-${lang} hljs">${
				hljs.highlight(match[2], { language: lang }).value
			}</code></pre>`;
			out = out.replace(this.hljs_regex_replace, replace);
		}

		// If layout is passed use it
		if (layout) {
			out = ejs.render(layout, {
				...info,
				body: out,
			});
		}

		return out;
	}

	async renderFile(path, layout, info) {
		return this.render(
			await readFile(path, {
				encoding: "utf-8",
			}),
			layout,
			info,
		);
	}
}
