import type { LayoutLoad } from "./$types";

export const load = (() => {
	return {
		nav: [
			["/middleware/", "Middlewares"],
			["/middleware/scrollback", "Scrollback"],
			["/middleware/ratelimit", "Ratelimit"],
			["/middleware/termed", "Termed"],
			["/middleware/clippy", "Clippy"],
		],
	};
}) satisfies LayoutLoad;
