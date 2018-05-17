const fs = require('fs');
const del = require('del');
const rollup = require('rollup')

const options = require('./build-config.js')

async function build() {
	if (fs.existsSync(options.distPath)) {
		await del([options.distPath])
	}

	const bundle = await rollup.rollup(options.input);

	for (let opts of Object.values(options.output)) {
		await bundle.write(opts);
	}

}

async function main() {
	try {
		await build();
		console.log('Done. Success.')
	} catch(e) {
		console.error(e);
		process.exit(1);
	}
}

main();


