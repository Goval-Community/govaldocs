<script lang="ts">
	import hljs from "highlight.js";
</script>

<h1>Channel 0</h1>

<p>
	Channel 0, does a few things. It responds to all pings with pongs, it
	handles opening/attaching channels, and it handles closing channels. It
	normally makes more sense for it to not be implemented as all other services
	are, but for it to be implemented directly in the message handling function.
	Messages to channel 0 are also blocking, unlike all other messages.
</p>

<h2>Implementation & Messages</h2>
<p>
	The simplest task of Channel 0, is responding to all <code>Ping</code>'s
	with <code>Pong</code>. Let's say it receives the following message:
</p>
<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "channel": 0,
  "ping": {},
  "ref": "1u5g5btygmy"
}`,
			{ language: "json" },
		).value}</code
	></pre>

<p>The server would immediately send back:</p>
<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "session": 123,
  "pong": {},
  "ref": "1u5g5btygmy"
}`,
			{ language: "json" },
		).value}</code
	></pre>
<p>
	Making sure to use the same <code>ref</code> that was sent with the
	<code>Ping</code>, and making sure to attach the right session ID.
</p>
<p>
	Some info from the
	<a href="https://crosis.turbio.repl.co/protov2">old developer docs</a>.
</p>
