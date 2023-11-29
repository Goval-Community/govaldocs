import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
	return {
		...(await parent()),
		protobufVersions: locals.protobufVersions,
	};
}) satisfies PageServerLoad;
