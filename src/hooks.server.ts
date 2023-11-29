import type { Handle } from "@sveltejs/kit";

const protobufVersions = (
	(await fetch(
		"https://api.github.com/repos/goval-community/replit-protocol/tags",
	).then((res) => res.json())) as { name: string }[]
).map((tag) => tag.name);

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.protobufVersions = protobufVersions;
	return await resolve(event);
};
