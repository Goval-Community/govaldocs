# The Unofficial Goval Docs
This is a WIP project by [PotentialStyx](https://github.com/PotentialStyx), to write up-to-date docs for replit's goval protocol.

## Project Structure

- `/views` - Contains all the webpage files, each page will use the `_layout.ejs` file in it's directory as the base template.
- `/ssg` - Contains information used by `render.js` to properly highlight the protobuf definition.
- `/public` - Contains all the static files for the site.
- `/out` - The output directory for `render.js`

## Project Architecture

The preview server is powered by `koa`. The project is compiled into static files with a custom script located at `render.js`, which is run by `render.sh`. This script, renders out every page with the right layout, and pre-syntax highlights all code blocks. 

## Contributing

- Use `yarn run dev` to start the dev server on `localhost:3000`.
- You can build the site with `yarn run build`.
  - `yarn run preview` will then preview the output.
  - `yarn run deploy` will deploy it to cloudflare pages.
  - `yarn run package` will package the output into a zip file.

## Todo

- [x] Better output from `render.js`
- [x] Extract actual template rendering logic from `render.js` into it's own file so it can be shared by the dev server.
- [x] Replace current `koa` dev server with one that uses same render logic as `render.js`
- [ ] Minify all static files during build
- [ ] Make `render.js` only rebuild changed files