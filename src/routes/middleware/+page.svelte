<h1>Middleware</h1>
<p>
	In Replit's <code>pid1</code> (their implementation of Goval), services can
	use different middlewares that wrap the service and provide various
	functions.<a href="#sup-1" style="text-decoration: none"
		><sup><strong>1</strong></sup></a
	>
	Not much is known about how exactly these middlewares behave but the
	<a href="https://crosis.turbio.repl.co/services#middleware"
		>old developer program docs</a
	>
	provide some insight. Below is a list of the known middleware that exist's in
	Replit's <code>pid1</code>.
</p>

<ul>
	<li>
		<a href="/middleware/scrollback">Scrollback</a> - Saves and recalls output
	</li>
	<li>
		<a href="/middleware/ratelimit">Ratelimit</a> - Limits outgoing messages
		from a service
	</li>
	<li>
		<a href="/middleware/termed">Termed</a> - Provides a service with a PTY
	</li>
	<li>
		<a href="/middleware/clippy">Clippy</a> - Injects messages based on regex
	</li>
</ul>

<div id="sup-1">
	<p>
		<sup>1</sup> This is completely implementation dependant, but it's how
		Replit's <code>pid1</code> does it.
	</p>
</div>
