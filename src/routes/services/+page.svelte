<h1>Services</h1>
<p>
	Services play a crucial role in the goval protocol, they provide the
	implementation for everything that a goval server can do.<a
		href="#sup-1"
		style="text-decoration: none"><sup><strong>1</strong></sup></a
	>
	Some services let their channels be attached to by multiple clients, while others
	don't let that happen. If they allow multiple clients to attach they normally
	have a well-known channel name, that will be indicated on it's page.
	<br />
	<br />
	The most important service is <a href="/services/chan0">channel 0</a>, this
	is a special service that provides the opening and closing of other
	channels, it is usually not implemented as a service but just directly
	implemented in the function that handles messages. It is the only service
	here that a new channel cannot be created with, as it exists only as the
	channel with id <code>0</code> for every client.
	<br />
	<br />
	All the currently documented services:
</p>

<ul>
	<li>
		<a href="/services/chan0">Channel 0</a> - Manages channels, and pongs pings.
	</li>
	<li>
		<a href="/services/chat">Chat</a> - Now only used for
		<code>.draw</code> file multiplayer, but used to power repl chat.
	</li>
	<li>
		<a href="/services/ot">OT</a> - Powers file editing. (docs are a WIP)
	</li>
	<li>
		<a href="/services/goval-ident">Goval Ident (unofficial)</a> - A
		<strong>unofficial</strong> protocol for identifying the goval server you
		are connected to.
	</li>
</ul>

<p>
	<br />
	All the currently undocumented services<a
		href="#sup-2"
		style="text-decoration: none"><sup><strong>2</strong></sup></a
	>:
</p>

<ul>
	<li>Shellrun2 - Powers the console tab.</li>
	<li>Shell - Powers the shell tab.</li>
	<li>
		Exec - Let's the client run commands. Powers the git pane, as well as
		the resource pane.
	</li>
	<li>GCSFile - Powers the filetree.</li>
	<li>FSEvents - Let's the client know of file modification events.</li>
	<li>
		dotreplit - Lets the editor read and edit the state of the
		<code>.replit</code> file.
	</li>
	<li>
		toolchain - Lets the client know what LSP's, package managers,
		debuggers, and run commands are available.
	</li>
	<li>LSP - Powers code intelligence.</li>
	<li>
		Presence - Let's the client know who else is in the repl, and what file
		they are in.
	</li>
	<li>Audio - Powers non-VNC audio in repls.</li>
	<li>
		Snapshot - Let's the client tell the server when to snapshot and persist
		all file changes.
	</li>
	<li>Packager3 - Powers the packager tab.</li>
	<li>Socket - Opens a TCP/UDP socket in the container, rarely ever used.</li>
</ul>

<div id="sup-1">
	<p>
		<sup>1</sup> There are a few exceptions here,
		<code>ContainerState</code> and <code>BootStatus</code> are normally not
		handled via services.
	</p>
</div>

<div id="sup-2">
	<p><sup>2</sup> This list may be incomplete.</p>
</div>
