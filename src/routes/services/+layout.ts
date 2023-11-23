import type { LayoutLoad } from "./$types";

export const load = (() => {
	return {
		nav: [
			["/services", "Services"],
			["/services/goval-ident", "Goval Ident"],
			["/services/chat", "Chat"],
			["/services/ot", "OT"],
			["/services/chan0", "Channel 0"],
		],
	};
}) satisfies LayoutLoad;
