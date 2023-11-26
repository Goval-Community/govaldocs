<script lang="ts">
	import hljs from "highlight.js";
</script>

<h1>Introduction</h1>
<p>
	This page is not complete, please open an issue or a pull request on
	<a href="https://github.com/PotentialStyx/govaldocs"
		>github.com/PotentialStyx/govaldocs</a
	>
	if you found something it is missing/wrong.
	<br /><br />
	You should also read the
	<a href="https://crosis.turbio.repl.co/protov2">old developer docs</a>,
	which currentlyhas a more complete description.
</p>

<div id="architecture">
	<h2>Goval architecture</h2>
	<!-- TODO: Rewrite description -->
	<!-- Diagram is fine tho -->
	<q cite="https://crosis.turbio.repl.co/protov2">
		<p>
			The goval protocol is built around isolated synchronous channels for
			all communication. The channels act as a namespacing mechanism and
			have a 1 to 1 mapping to instances of a service inside pid1.
			Creating a channel will construct a new instance of the desired
			service and attaching to a channel Will share an existing service. A
			global channel (channel with id 0) is always present and intended
			for channel management (and a few global state messages). Each
			service decides the semantics around its channel's usage (e.g.
			events, request/response, etc.). All messages within a single
			channel are guaranteed to arrive in order but across channels there
			is no guarantee.
			<br /><br />
			Channels are assigned int IDs given by pid1 upon opening a channel. A
			channel can optionally be named allowing other clients to share the channel
			by way of attaching. An unnamed channel is called an anonymous channel
			and can never be attached to, it is bound the creating client. All anonymous
			channels are automatically destroyed when the client leaves taking the
			associated service with it.
			<br /><br />
			There is also a built in request/response style system to make life easier
			for clients. A service can decide to "respond" to a incoming message
			through its passed in response writer instead of the broadcast writer.
			A response will automatically have the corresponding request message's
			ref (if it has one) burned into it. This way a client can make a request
			without needing to keep track of order.
		</p>
	</q>
	<br />
	<q cite="https://crosis.turbio.repl.co/protov2">
		<pre><code class="hljs"
				>+------+       +------+       +----+
|client| &lt;---&gt; |conman| &lt;---&gt; |pid1|
+------+       |      |       +----+
+------+       |      |
|client| &lt;---&gt; |      |
+------+       +------+</code
			></pre>
	</q>
	<p>
		Description and diagram <strong>directly</strong> from the
		<a href="https://crosis.turbio.repl.co/protov2">old developer docs</a>.
	</p>
</div>

<div id="replies">
	<h2>Message replies</h2>
	<p>
		A reply is indicated by a message having the same <code>ref</code> as the
		message it is replying to. For example if a server were to reply to the following
		message:
	</p>
	<pre><code class="hljs"
			>{@html hljs.highlight(
				`{
  "channel": 123,
  ...
  "ref": "2ttxgkc19l4"
}`,
				{ language: "json" },
			).value}</code
		></pre>
	<p>It would send back:</p>
	<pre><code class="hljs"
			>{@html hljs.highlight(
				`{
  "channel": 123,
  "session": 123,
  ...
  "ref": "2ttxgkc19l4"
}`,
				{ language: "json" },
			).value}</code
		></pre>
	<p>
		This lets the client keep less state, and keep track of out of order
		replies.
	</p>
</div>

<div id="writing-client">
	<h2>Developing a good client</h2>
	<p>
		A client must always be ready for global notification on channel
		<code>0</code>.
	</p>
	<br />
	<p>These notifications could be:</p>

	<!-- TODO: are there any other channel 0 notifications not documented here? -->
	<ul>
		<li>
			<code>containerState</code> - Signals the state of the container to
			the client, this is either <code>READY</code> or
			<code>SLEEP</code> (which means the container is going to die). When
			a client opens a new connection it can expect to get:<a
				href="#sup-1"
				style="text-decoration: none"><sup><strong>1</strong></sup></a
			>
			<pre><code class="hljs"
					>{@html hljs.highlight(
						`{
  "containerState": {
    "state": "READY"
  }
}`,
						{ language: "json" },
					).value}</code
				></pre>
		</li>

		<li>
			<code>portOpen</code> - This indicated that a port has been opened on
			the container, as well as if it is forwarded, and what the external port
			# is.
		</li>
		<li>
			<code>bootStatus</code> - What stage the container is in the boot process,
			and how far along it is.
		</li>
		<li><code>toast</code> - A text notification meant for the user.</li>
	</ul>
</div>

<div id="sup-1">
	<p>
		<sup>1</sup> The message below has <code>ContainerState.state</code> as
		a string, while in reality it is an enum, with <code>SLEEP</code> as
		<code>0</code>, and <code>READY</code> as <code>1</code>.
	</p>
</div>
