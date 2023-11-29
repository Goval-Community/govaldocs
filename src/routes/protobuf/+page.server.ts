import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
	// Load nav links
	await parent();

	return {
		protobufVersions: locals.protobufVersions,
	};
}) satisfies PageServerLoad;
