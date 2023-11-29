import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load = (() => {
	return {
		nav: [
			["/introduction", "Introduction"],
			["/services", "Services"],
			["/middleware", "Middlewares"],
			["/implementations", "Implementations"],
			["/protobuf", "Protobuf"],
			["/debug-pane", "Debug Pane"],
		],
	};
}) satisfies LayoutServerLoad;
