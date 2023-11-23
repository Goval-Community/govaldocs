<div align="center">
	<img src="./static/banner.svg" width="80%"/>
	<br />
	<a href="https://choosealicense.com/licenses/mit">
		<img
			alt="License: MIT"
			src="https://img.shields.io/badge/license-MIT-e49252"
		/>
	</a>
	<!-- <a href="https://github.com/PotentialStyx/govaldocs/issues/4">
		<img
			alt="Services fully documented: 1"
			src="https://img.shields.io/badge/services%20fully%20documented-1-e49252"
		/>
	</a> -->
	<hr />
	<br />
	<p>
		This is a WIP project by
		<a href="https://github.com/PotentialStyx">PotentialStyx</a>, to write
		up-to-date docs for replit's goval protocol.
	</p>
	<h6>Disclaimer: This project is entirely unofficial and not endorsed by replit</h6>
</div>

## Project Structure

-   `/src` - Contains all the webpage files
-   `/static` - Contains all the static files for the site.
-   `/out` - The output directory

## Project Architecture

This project uses SvelteKit and [Bun](https://bun.sh/). Cloudflare Pages is used for hosting.

## Contributing

-   Use `bun run --bun dev` to start the dev server on `http://localhost:5173`.
-   You can build the site with `bun run build`.
    -   `bun run preview` will then preview the output.
    -   `bun run deploy` will deploy it to Cloudflare Pages.

## Todo

-   [x] Switch to [Bun](https://bun.sh/)
-   [x] Better output from `render.ts`
-   [x] Extract actual template rendering logic from `render.ts` into it's own file so it can be shared by the dev server.
-   [x] Replace current `koa` dev server with one that uses same render logic as `render.ts`
-   [ ] Minify all static files during build
-   [ ] Protobuf diffing
