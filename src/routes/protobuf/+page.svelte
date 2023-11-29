<script lang="ts">
	import type { PageData } from "./$types";

	import hljs from "highlight.js";
	import { browser } from "$app/environment";

	export let data: PageData;

	/**
	 * Protobuf files for each version.
	 */
	const protobufs: Record<string, string> = {};

	let selectedVersion = data.protobufVersions[0];

	/**
	 *
	 * @param version
	 */
	async function getOrLoadProtobuf(version: string) {
		if (!browser) {
			return "";
		}

		if (version in protobufs) {
			return protobufs[version];
		}

		return await fetch(
			`https://raw.githubusercontent.com/goval-community/replit-protocol/${version}/api.proto`,
		)
			.then((res) => res.text())
			.then((text) => (protobufs[version] = text));
	}
</script>

<h1>Protobuf</h1>
<p>
	This is a more up-to-date version of Goval's Protobuf, if you would like it
	to be updated DM
	<a href="https://discord.com/users/975920435432661052">PotentialStyx#2158</a
	>
	on Discord.
</p>

<p>
	Protobuf version:
	<select bind:value={selectedVersion}>
		{#each data.protobufVersions as version}
			<option value={version}>v{version}</option>
		{/each}
	</select>
</p>

<p>
	<a
		download="api.proto"
		href="https://raw.githubusercontent.com/goval-community/replit-protocol/master/api.proto"
	>
		Download
	</a>
</p>

{#await getOrLoadProtobuf(selectedVersion)}
	<p>
		Loading Protobuf v{selectedVersion}...
	</p>
{:then protobuf}
	<pre><code class="hljs"
			>{@html hljs.highlight(protobuf, { language: "protobuf" })
				.value}</code
		></pre>
{/await}
