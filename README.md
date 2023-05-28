<div align="center">
	<img src="./public/banner.svg" width="80%"/>
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

- `/views` - Contains all the webpage files, each page will use the `_layout.ejs` file in it's directory as the base template.
- `/ssg` - Contains information used by `render.ts` to properly highlight the protobuf definition.
- `/public` - Contains all the static files for the site.
- `/out` - The output directory for `render.ts`

## Project Architecture

This project uses [Bun](https://bun.sh/) and ejs for the preview server and render scripts. Cloudflare pages is used for hosting.  

The project is compiled into static files with a custom script located at `render.ts`, which is run by `render.sh`. This script, renders out every page with the right layout, and pre-syntax highlights all code blocks. 

## Contributing

- Use `bun run dev` to start the dev server on `localhost:3000`.
- You can build the site with `bun run build`.
  - `bun run preview` will then preview the output.
  - `bun run deploy` will deploy it to cloudflare pages.
  - `bun run package` will package the output into a zip file.

## Todo

- [x] Switch to [Bun](https://bun.sh/)
- [x] Better output from `render.ts`
- [x] Extract actual template rendering logic from `render.ts` into it's own file so it can be shared by the dev server.
- [x] Replace current `koa` dev server with one that uses same render logic as `render.ts`
- [ ] Minify all static files during build
- [ ] Make `render.js` only rebuild changed files