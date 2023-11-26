<!-- TODO: rewrite this not as a direct cite -->
<h1>Ratelimit Middleware</h1>

<q cite="https://crosis.turbio.repl.co/services#ratelimit">
	<p>
		The ratelimit middleware exists to reduce the maximum messages send by a
		service per second. This is typically placed in from of a process
		sending output from a user process to avoid overwhelming clients with
		too many messages.
		<br /><br />
		It's rate limited on a per message basis causing back pressure which ideally
		slows down the sending program program and causes output to be coalesced
		into fewer messages.
		<br /><br />
		To improve interactivity when a user sends a message (like input) the service
		receives a burst of extra allowed outgoing messages. This way interactive
		terminal games stay fast.
		<br /><br />
		There's also an initial burst allowing many messages to be sent instantly
		until the burst is used up. The burst recovers when messages are sent slower
		than the max output rate.
	</p>
</q>
<p>
	<strong>Directly</strong> from the
	<a href="https://crosis.turbio.repl.co/services#ratelimit"
		>old developer docs</a
	>. <br /><br />
	At this time it is unknown which services use this middleware
</p>
