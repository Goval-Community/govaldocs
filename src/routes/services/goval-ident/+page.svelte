<script lang="ts">
	import hljs from "highlight.js";
</script>

<h1>Goval Ident</h1>
<p>
	<strong>This is an unofficial protocol</strong><br /><br />This protocol
	isn't a service on it's own, but is a modification to how
	<code>gcsfiles</code> and <code>chat</code> are implemented.
</p>

<h3>Changes to chat</h3>

<p>
	Chat is changed based on the service name when opened. If a client opens a
	chat service with the name <code>"goval-ident"</code> the server will open a
	special chat service that lets the client talk to the server. The chat messages
	sent/received must be valid JSON. Currently the only thing that can be done with
	this link is request server info.
</p>

<h5>Requesting server info</h5>

<p>
	For a client to request information about the server it should send the
	following message:
</p>

<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "chatMessage": {
    "username": "[username goes here]",
    "text": "{\\"type\\":\\"serverInfo\\",\\"ref\\": \\"2fizlpu92ng\\"}"
  }
}`,
			{ language: "json" },
		).value}</code
	></pre>

<p>The server would then send back</p>
<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "chatMessage": {
    "username": "goval",
    "text": "{\\"data\\": {...},\\"ref\\": \\"2fizlpu92ng\\"}"
  }
}`,
			{ language: "json" },
		).value}</code
	></pre>

<p>
	Where the data in the <code>&#123;...&#125;</code> conforms to
	<a href="https://github.com/goval-community/goval-ident-schema/"
		>the JSON Schema</a
	>.
</p>

<h5>Determining server support</h5>
<p>
	If the server supports goval-ident over chat it'll send the following
	message when the channel is created:
</p>

<pre><code class="hljs"
		>{@html hljs.highlight(
			`{
  "chatMessage": {
    "username": "goval",
    "text": "{\\"type\\": \\"notification\\"}"
  }
}`,
			{ language: "json" },
		).value}</code
	></pre>

<h3>Changes to GCSFiles</h3>
<p>
	GCSFiles is changed to have a special non existent file give server info
	when read. If the client requests to read <code>.config/goval/info</code>,
	the server will send back json contents conforming to
	<a href="https://github.com/goval-community/goval-ident-schema/"
		>the JSON Schema</a
	>.
</p>

<h5>Determining server support</h5>
<p>
	If the read errors or if the contents don't conform to
	<a href="https://github.com/goval-community/goval-ident-schema/"
		>the JSON Schema</a
	>
	then the server does not support goval-ident over GCSFiles
</p>
