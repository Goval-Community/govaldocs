<h1>Goval Implementations</h1>

<h2>Clients</h2>

<ul>
	<li>
		<a href="https://github.com/replit/crosis">Crosis</a> - The official and
		still maintained javascript client for the goval protocol.
	</li>
	<li>
		<a href="https://github.com/PotentialStyx/pygoval">PyGoval</a> - An
		unofficial python client implementation, it is maintained and was
		written by
		<a href="https://replit.com/@PotentialStyx">PotentialStyx</a>.
	</li>
	<li>
		<a href="https://github.com/CoolCoderSJ/pyrepl">PyRepl</a> - An unofficial
		python client implementation, it is out of date, and currently unmaintained.
	</li>
</ul>

<h2>Servers</h2>
<p class="info">*listed by age</p>
<ul>
	<li>
		Official Implementation - This is the closed source implementation of
		the goval protocol, it consists of
		<code>conman</code> handling the websocket connections and forwarding
		messages to/from pid1. As well as <code>pid1</code> which runs inside
		the container as process 1, handling services and messages. Both
		<code>conman</code> and <code>pid1</code> are written in golang.
	</li>
	<li>
		Homeval - A currently closed source, in development, implementation
		written in golang by
		<a href="https://replit.com/@PotentialStyx">PotentialStyx</a>.
	</li>
	<li>
		Bunnyval - A closed source, in development, implementation written in
		Bun by <a href="https://replit.com/@bddy">bddy</a> and
		<a href="https://replit.com/@haroon">haroon</a>.
	</li>
	<li>
		<a href="https://github.com/lafkpages/Nodeval">Nodeval</a> - A GPL 3
		licensed, in development, server implementation written in NodeJS by
		<a href="https://replit.com/@LuisAFK">LuisAFK</a>.
	</li>
</ul>

<h4>Unmaintained Servers</h4>
<ul>
	<li>
		<a href="https://github.com/RoBlockHead/miroval">Miroval</a> - An open
		source, no longer in development, implementation written in deno by
		<a href="https://github.com/RoBlockHead">Miro</a>.
	</li>
</ul>

<hr />

<p>
	Have you written a client/server implementation and want it listed here? DM
	<code>PotentialStyx</code> on Discord with the information to get it listed here.
</p>
