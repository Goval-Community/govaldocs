<script lang="ts">
	import hljs from "highlight.js";
</script>

<h1>Chat</h1>
<p>
	Chat is a very simple service to implement, all it does is receive messages,
	and then forward them on to all <strong>other</strong> (not including the
	sender) clients.
	<br />
	It used to power the chat pane in the workspace, but doesn't anymore. Now it
	just powers multiplayer for <code>.draw</code> files.
</p>

<h2>Implementation & Messages</h2>

<p>
	The chat service only deals with one message type, <code>ChatMessage</code>.
	Here is an example message that a client could send to the server:
</p>
<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "chatMessage": {
    "username": "replbot",
    "text": "hello from replbot!"
  }
}`,
			{ language: "json" },
		).value}</code
	></pre>
<p>
	The server would then send the message along to all other connected clients.
</p>
<p>
	Some info from the
	<a href="https://crosis.turbio.repl.co/services#chat">old developer docs</a
	>.
</p>
