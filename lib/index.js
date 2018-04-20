/**
 * Loads environment variables from hierarchy of .env files for Node.js projects.
 *
 * Entire module is inspired by `react-scripts` way of hanling `.env` files.
 *
 * @example
 * // includes default hierarchy of dotenv files
 * require('dotenv-ex')()
 * @example
 * // includes custom file
 * require('dotenv-ex')({env: '.env.custom'})
 * @example
 * // includes multiple custom files
 * require('dotenv-ex')({env: ['.env.custom', '.env.moar']})
 *
 * @author andrzej lichnerowicz <andrzej@lichnerowicz.pl>
 * @module dotenv-ex
 */
const debug = require('debug')('dotenv-ex')
const fs = require('fs')

if (!process.env.NODE_ENV) {
  debug('NODE_ENV not specified, assume "production"')
}
/**
 * If `NODE_ENV` environment variable is not set, use defaults for `production` environment.
 * @constant
 * @type {!string}
 * @default production
 */
const NODE_ENV = process.env.NODE_ENV || 'production'

/**
 * Default options, based on detected environment in `NODE_ENV`. For test environment, we do not
 * include neither `.env.test.local`, nor `.env.local`, reason being the tests should be
 * @constant
 * @type {!string[]}
 */
const defaultOptions = {
  env: [
    // Do not include neither `.env.test.local`...
    NODE_ENV !== 'test' && `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // nor `.env.local` since you'd expect tests to produce
    // same results for everyone. `.env*.local` files are not
    // meant to be checked in
    NODE_ENV !== 'test' && `.env.local`,
    '.env'
  ].filter(Boolean)
}

/**
 * Delegates loading `.env*` files to `dotenv` module, and expansion of variables
 * to `dotenv-expand`.
 *
 * @function
 * @param {!string} name of the file to load
*/
const requireDotFile = file => {
  if (fs.existsSync(file)) {
    debug(`${file} found, loading`)
    require('dotenv-expand')(
      require('dotenv').config({
        path: file
      })
    )
  } else {
    debug(`${file} not found, skipping`)
  }
}

/**
 * Load and expand environment variables in `.env` files
 * @param {object} options - Object with different parameters
 */
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
