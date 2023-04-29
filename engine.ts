import hljs from "highlight.js";
import * as ejs from "ejs";

import makeProtobufLang from "./ssg/protobuf.js";
// Makes sure all custom message types are rendered as types and not just normal text
hljs.registerLanguage(
	"protobuf",
	makeProtobufLang(JSON.parse(await Bun.file("ssg/apitypes.json").text())),
);

export default class RenderEngine {
	hljs_regex =
		/<pre><code class="language-([A-z]*)">((?:.|\n)*?)<\/code><\/pre>/gm;
	hljs_regex_replace = new RegExp(this.hljs_regex.source, "m");

	render(contents: string, layout: string, info: ejs.Data) {
		let out = ejs.render(contents, info);

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

	async renderFile(path: string, layout: string, info: ejs.Data) {
		return this.render(await Bun.file(path).text(), layout, info);
	}
}
