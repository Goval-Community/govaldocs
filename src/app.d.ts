// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			protobufVersions: string[];
		}

		interface PageData {
			// Links to be displayed in the nav bar
			nav: [string, string][];
		}

		// interface Platform {}
	}
}

export {};
