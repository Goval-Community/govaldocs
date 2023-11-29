<h1>Goval</h1>
<p>
	Goval is replit's code execution API, it is used by the workspace to connect
	with running containers. It handles everything from the keystrokes entered
	in files or the shell to history. There is a debug panel in the workspace
	that can be enabled by adding the <code>?debug=1</code> query parameter.
	This will add an alien icon to the tool list, that that lets you see all
	messages, and even change the goval server url. You can read more about it
	<a href="/debug-pane">here</a>.
</p>

<h2>Protocol</h2>
<p>
	Goval uses
	<a href="https://developers.google.com/protocol-buffers/"
		>Google's protobuf</a
	>
	format, the last published version of govals protocol can be found at
	<a href="https://github.com/replit/protocol">replit/protocol</a> on github<a
		href="#sup-1"
		style="text-decoration: none"><sup><strong>1</strong></sup></a
	>. The
	<a href="https://www.npmjs.com/package/@replit/protocol">npm package</a>
	however, is still updated.
</p>

<h2>Dev program</h2>
<p>
	In the past there was a closed-alpha developer program for goval. It has
	since been removed, and its future is unknown. Old documentation from it can
	be found <a href="https://crosis.turbio.repl.co/">here</a>, while this
	documentation is out of date, some of it is still relevant.
</p>

<h2>This site</h2>
<p>
	This site is unofficial, if you have found any issues please dm
	<a href="https://discord.com/users/975920435432661052">PotentialStyx</a>
	on discord.
</p>

<hr />

<div id="sup-1">
	<p>
		<sup>1</sup> A more up-to-date version that was detranspiled from the
		npm package is available <a href="/protobuf">here</a>.
	</p>
</div>
