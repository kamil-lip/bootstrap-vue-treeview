const fs = require('fs');
const del = require('del');
const path = require('path');

const basePath = path.resolve(__dirname, '..');
const distPath = path.resolve(basePath, 'dist');

const { camelCase } = require('lodash')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

const entryPointPath = path.resolve(basePath, 'src/index')
const { name, dependencies } = require('../package.json')

const VuePlugin = require('rollup-plugin-vue').default;

async function build() {
	if (fs.existsSync(distPath)) {
		await del([distPath])
	}
	
	const bundle = await rollup.rollup({
		input: entryPointPath,
		plugins: [
		VuePlugin()
		]
		// TODO: add external
	})
	// or write the bundle to disk
	await bundle.write(
		{
			format: 'cjs',
			name: camelCase(name),
			file: path.resolve(distPath, name + '.common.js'),
			sourcemap: true
		}
	);

	await bundle.write(
		{
			format: 'umd',
			name: camelCase(name),
			file: path.resolve(distPath, name + '.js'),
			sourcemap: true
		}
	);
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


