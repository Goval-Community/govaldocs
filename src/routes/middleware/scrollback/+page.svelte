<h1>Scrollback Middleware</h1>

<p>
	The scrollback middleware saves a services output, and sends it to any new
	clients that connect. It stores a maximum of <code>1,000</code> lines
	(denoted by a raw <code>\n</code>), of unlimited length. If the history is
	full new lines will push out old ones. The output is handled by lines to try
	and prevent split escape sequences.

	<br />
	At this time the full list of services which use this middleware is unknown,
	but it is likely that <a href="/services/shell">shell</a>, and
	<a href="/services/shellrun2">shellrun2</a> use it.
</p>
<p>
	Info from the
	<a href=" https://crosis.turbio.repl.co/services#scrollback"
		>old developer docs</a
	>.
</p>
