<h1>Debug pane</h1>
<p>
	This page is not complete, please open an issue or a pull request on
	<a href="https://github.com/PotentialStyx/govaldocs"
		>github.com/PotentialStyx/govaldocs</a
	>
	if you found something it is missing/wrong.
	<br /><br />
	The debug pane in the workspace is a tool made for the Replit team to use when
	developing Replit. It however can be used by normal users. It has numerous tools
	useful when trying to learn the goval protocol, and also when trying to implement
	it. Below we will go over all the different tabs inside the debug panel and what
	they do. As this is mainly an internal tool for Replit, not everything about
	how/why this pane functions how it does is publicly known.
	<br /><br />
	You can enable the panel by adding the query string <code>?debug=1</code> to
	the end of a Repl URL. For example the Repl URL
	<code>https://replit.com/@example-user/Example-Repl#README.md</code>, would
	become
	<code>https://replit.com/@example-user/Example-Repl?debug=1#README.md</code
	>. <br /><br />
	The debug panel has the following tabs:
</p>
<ul>
	<li><a href="#repl">repl</a></li>
	<li><a href="#logs">logs</a></li>
	<li><a href="#lsp">lsp</a></li>
	<li><a href="#ai">ai</a></li>
	<li><a href="#aiChat">aiChat</a></li>
	<li><a href="#ast">ast</a></li>
	<li><a href="#git">git</a></li>
	<li><a href="#history2">history2</a></li>
	<li><a href="#metadata">metadata</a></li>
	<li><a href="#override">override</a></li>
	<li><a href="#rum">rum</a></li>
</ul>

<div id="repl">
	<h3>repl tab</h3>
	<p>
		The repl tab just shows information about the repl the workspace is
		currently connected to. It also has a button to view the datadog logs
		for the current session, but you have to work at replit to access those.
	</p>
</div>

<div id="logs">
	<h3>logs tab</h3>
	<p>
		The logs tab shows all requests going to/from the connected goval
		server.

		<br /><br />

		At the top there is a big button to start or stop message logging. When
		pressed it will change to the other and either stop or start logging.
		<br />
		<!-- TODO: document the json format used when downloading logs -->
		Under the start/stop logging button there is a button to clear the current
		logs, a download icon that downloads the current logs in a json format, and
		a button to show/hide the filter controls for the logs.

		<br /><br />

		The filter controls have an input to specify a search regex in the
		format <code>regex,flags</code>. This seems to however make it so any
		given regex cannot include <code>,</code> or it'll make the filter do
		nothing.

		<br /><br />

		Under the regex box there are a few toggles that let you have the logs
		show both incoming and outgoing packets, just incoming packets, or just
		outgoing packets.

		<br /><br />

		Under the packet direction toggle, there is one more filter control
		which lets you change between either highlighting or filtering items
		that match the search regex<a
			href="#sup-1"
			style="text-decoration: none"><sup><strong>1</strong></sup></a
		>. If you choose <code>Highlight</code>, all log items will show but any
		matching ones will have a yellow background. If you choose
		<code>Filter</code>, then <strong>only</strong> log items that match the
		search regex will show. It defaults to highlight, but filter is
		recommended if you want to find a specific message.

		<br /><br />

		Below all of that are the actual message logs.
		<br />
		Log items are colored red for incoming, and blue for outgoing. On the side
		of each log item the direction of the message and a relative time ref (in
		milliseconds) is shown. The time ref is relative to the current base time,
		which by default is when the workspace loaded. Clicking on an items time
		ref will set that item as the base time as well as adding a
		<code>Reset Time Ref</code> button in between the show/hide filter and
		download button. Clicking this button will reset the base time back to
		when the workspace first loaded, and remove the button.

		<br /><br />

		At the top of every log item the name of the service it is for, as well
		as the channel name are shown. If the channel doesn't have a name then
		nothing is shown there.

		<br />

		The actual contents of the log item is just a json representation of the
		message.
	</p>
</div>

<div id="lsp">
	<h3>lsp tab</h3>
	<p>
		The lsp tab shows all messages and replies flowing in/out from all LSPs,
		and which it is currently connected to. It has filter options to search
		the messages, and to disable/enable outgoing or incoming messages from
		showing. There is also a trash icon to clear the logs.
		<br /><br />
		This tab is useful for debugging if an LSP connection is working or not,
		and its current state.
	</p>
</div>

<!-- TODO: make ai tabs have better descriptions -->
<div id="ai">
	<h3>ai tab</h3>
	<p>The ai tab shows logs for usage of ghostwriter ai.</p>
</div>

<div id="aiChat">
	<h3>aiChat tab</h3>
	<p>The aiChat tab shows logs for usage of ghostwiter chat.</p>
</div>

<div id="ast">
	<h3>ast tab</h3>
	<p>
		The ast tab shows the ast tree for your current cursor position in the
		last file you were in.
	</p>
</div>

<div id="git">
	<h3>git tab</h3>
	<p>
		The git tab shows the information about your connected github account
		(if one is connected), as well as the status and output of all the
		commands being run to get the information needed by the git panel.
	</p>
</div>

<div id="history2">
	<h3>history2 tab</h3>
	<p>
		The history2 tab can help you debug the history panel for a file. It
		won't show anything until you go to the history of a file, while the
		history2 tab is open. It by default just shows some info about the
		current history point you are on, along with if you are currently in
		playback mode.
		<br /><br />
		Enabling the <code>Changes</code> toggle shows: the crc32, operation transforms,
		as well as the codemirror changeset for the current history point.
	</p>
</div>

<div id="metadata">
	<h3>metadata tab</h3>
	<p>
		The metadata tab shows you a decoded version of the connection token
		used to connect to the goval server. It includes information about the
		repl it's connecting to, who you the connector are, what flags to enable
		on the server, and more.
	</p>
</div>

<div id="override">
	<h3>override tab</h3>
	<p>
		This override is very useful when developing your own server
		implementation<a href="#sup-2" style="text-decoration: none"
			><sup><strong>2</strong></sup></a
		>. Using this tab you can override the goval server url that the
		workspace connects to, as well as the postgresql database url. Changing
		the postgresql database url lets you use the
		<code>PostgreSQL</code> pane for any postgresql database, even if it's not
		managed by/bought through replit.
	</p>
</div>

<div id="rum">
	<h3>rum tab</h3>
	<p>
		This is a tab for using
		<a href="https://www.datadoghq.com/product/real-user-monitoring/"
			>datadog's rum tool</a
		>. Don't mess with this tool, because it will likely make it harder for
		replit to use the data from it, and misuse of internal tools might
		result in them being made inaccessible for normal users.
	</p>
</div>

<div id="sup-1">
	<p>
		<sup>1</sup> A log item matches the search regex if either the body of the
		request, the channel service, or the channel name match the provided regex.
	</p>
</div>

<div id="sup-2">
	<p>
		<sup>2</sup> A list of existing client & server implementations for the
		goval protocol can be found <a href="/implementations">here</a>.
	</p>
</div>
