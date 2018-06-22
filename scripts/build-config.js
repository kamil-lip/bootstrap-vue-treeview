const path = require('path');
const VuePlugin = require('rollup-plugin-vue').default;
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const { camelCase } = require('lodash')
const { name, dependencies } = require('../package.json')
const css = require('rollup-plugin-css-porter')
const basePath = path.resolve(__dirname, '..');
const distPath = path.resolve(basePath, 'dist');
const entryPointPath = path.resolve(basePath, 'src/index')

// input options to export
const input = {
	input: entryPointPath,
	plugins: [
		VuePlugin(),
		css(),
	    resolve({ external: ['vue'] }),
	    commonjs(),
	    babel({
	      plugins: [
	      	'external-helpers',
	      	'transform-runtime'
	      	],
	      runtimeHelpers: true,
	      exclude: 'node_modules/**'
	    })
	],
	external: Object.keys(dependencies)
}

//output options to export
const output = [
	{
		exports: 'named',
		format: 'cjs',
		name: camelCase(name),
		file: path.resolve(distPath, name + '.common.js'),
		sourcemap: true,
		globals: {
			"vue": "Vue",
			"vue-context-menu": "VueContextMenu"
		}
	},
	{
		exports: 'named',
		format: 'umd',
		name: camelCase(name),
		file: path.resolve(distPath, name + '.js'),
		sourcemap: true,
		globals: {
			"vue": "Vue",
			"vue-context-menu": "VueContextMenu"
		}
	},
	{
		exports: 'named',
		format: 'es',
		name: camelCase(name),
		file: path.resolve(distPath, name + '.esm.js'),
		sourcemap: true,
		globals: {
			"vue": "Vue"
		}
	}
]

module.exports = { input, output, distPath }

