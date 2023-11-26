<script lang="ts">
	import { page } from "$app/stores";
</script>

<h1>{$page.status}</h1>
<p>
	{#if $page.status == 404}
		Oops, you're in the wrong place &#128517;. Time to head back
		<a href="/">home</a>?
	{:else}
		{$page.error?.message}. Go <a href="/">home</a>?
	{/if}
</p>
