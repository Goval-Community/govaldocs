<script lang="ts">
	import "$lib/dark.min.css";
	import "$lib/highlightjs/tokyo-night.css";
	import "$lib/global.css";

	import { onMount } from "svelte";

	import { page } from "$app/stores";

	import hljs from "highlight.js";
	import protobuf from "highlight.js/lib/languages/protobuf";
	import json from "highlight.js/lib/languages/json";

	// TODO: https://github.com/goval-community/govaldocs/blob/cf71bac85c69a2d3a09fb4a7326af12dbcd9ef4b/engine.ts#L5

	onMount(() => {
		hljs.registerLanguage("protobuf", protobuf);
		hljs.registerLanguage("json", json);
	});
</script>

<nav>
	<header>Navigation:</header>
	<ul>
		<li><a href="/">Home</a></li>

		{#each $page.data.nav as [href, label]}
			<li><a {href}>{label}</a></li>
		{/each}
	</ul>
</nav>

<slot />

<footer>
	Made with &#10084; by
	<a href="https://replit.com/@PotentialStyx">@PotentialStyx</a>
</footer>
