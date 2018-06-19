const fs = require('fs');
const del = require('del');
const serve = require('rollup-plugin-serve')
const path = require('path');
const rollup = require('rollup')

let host = 'localhost'
let port = 10001;

function runDevServer() {
  serve({
    // Launch in browser (default: false)
    open: true,

    // Show server address in console (default: true)
    verbose: false,

    // Multiple folders to serve from
    contentBase: ['dist', 'dev/public', 'node_modules/vue-context-menu'],

    // Set to true to return index.html instead of 404
    historyApiFallback: false,

    // Options used in setting up server
    host,
    port,

    //set headers
    headers: {
      'Access-Control-Allow-Origin': '*'
    }

  })
}

// watch for files
async function watch() {

  const options = require('./build-config.js')

  if (fs.existsSync(options.distPath)) {
    await del([options.distPath])
  }

  const watchOptions = {
    ...options.input,
    output: options.output
  };

  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {
    switch(event.code) {
      case 'FATAL':
        console.error(event.error)
        watcher.close();
        process.exit(1);
        break;
      case 'ERROR':
        console.error(event.error)
        break;
      case 'BUNDLE_END':
        console.log('Finished building')
        break;
    }
  });
}

async function main() {
  try {
    runDevServer();
    await watch();
    console.log(`Started watching for file changes. Dev server started at http://${host}:${port}`)
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

main();