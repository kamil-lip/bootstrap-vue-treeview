const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname, '..');
const distPath = path.resolve(basePath, 'dist');

const { camelCase } = require('lodash')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

if (fs.existsSync(distPath)) {
	fs.rmdirSync('dist')
}

const entryPointPath = path.resolve(basePath, 'src/index')
const { name, dependencies } = require('../package.json')

const VuePlugin = require('rollup-plugin-vue').default;

async function build() {
	const bundle = await rollup.rollup({
		input: entryPointPath,
		plugins: [
		VuePlugin()
		],
		output: [
		{
			format: 'cjs',
			name: camelCase(name),
			file: path.resolve(distPath, name + '.common.js'),
			sourcemap: true
		},
		{
			format: 'umd',
			name: camelCase(name),
			file: path.resolve(distPath, name + '.js'),
			sourcemap: true
		}
		]
		// TODO: add external
	})
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


