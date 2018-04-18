// entire module is inspired by `react-scripts` way of hanling `.env` files.
const debug = require('debug')('dotenv-ex')
const fs = require('fs')

if (!process.env.NODE_ENV) {
  debug('NODE_ENV not specified, assume "production"')
}
const NODE_ENV = process.env.NODE_ENV || 'production';

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const defaultOptions = {
  env: [
    // Do not include neither `.env.test.local`...
    NODE_ENV !== 'test' && `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // nor `.env.local` since you'd expect tests to produce
    // same results for everyone. `.env*.local` files are not
    // meant to be checked in
    NODE_ENV !== 'test' && `.env.local`,
    '.env',
  ].filter(Boolean)
}

// Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
const requireDotFile = file => {
  if (fs.existsSync(file)) {
    debug(`${file} found, loading`)
    require('dotenv-expand')(
      require('dotenv').config({
        path: file,
      })
    );
  } else {
    debug(`${file} not found, skipping`)
  }
}

module.exports = options => {
  const opts = Object.assign({}, defaultOptions, options)
  if (Array.isArray(opts.env)) {
    opts.env.forEach(f => {
      requireDotFile(f)
    })
  } else if (typeof opts.env === 'string') {
    requireDotFile(opts.env)
  }
}
