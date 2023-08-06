# Idea

Boilerplate for:
pnpm monorepo with
	Front-End project: React.js
	Back-End project: Node.js
	Common Libraries project: A separate, reusable project or JavaScript module, but is used in the Front-End and in the Back-End projects as well.

Other dependencies
	debug (logging) megnézni, terheli e a kódot, v buildnél kikapcsolható-e.
	ajv (another json-schema validator)

Dev dependencies
	esbuild
	jest

# ToDos
* TODO: Preiodically recheck https://github.com/charlieduong94/interface-js/issues/14. If accepted and fixed, the "interface-js" package can be removed from the monorepo and replaced with importing the charlieduong94/interface-js instead.
* TODO: Correctly set the esbuild "--external:xxx" parameter
* TODO: pnpm upgrade esbuild-jest (remove deprecated libs)
