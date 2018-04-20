[![npm version][npm_badge]][npm_link] [![Build Status][travis_badge]][travis_link] [![downloads][npm_dl_badge]][npm_dl_link] [![js-standard-style][js_standard_badge]][js_standard_link]

# dotenv-ex

- Loads environment variables from hierarchy of .env files for Node.js projects.

## How to use it?

Use this somewhere possibly early in your program:

```javascript
require('dotenv-ex')();
```

this will load files based on `NODE_ENV`. If it's not set, `production` is used as default. The files are loaded in following order:

1. `.env.production.local`, `.env.development.local`
1. `.env.production`, `.env.development`, `.env.test`
1. `.env.local`
1. `.env`

`.env.local` is not used in `test` environment, as well as there is no `.env.test.local`. This is because, I believe tests should not be specific to local environment, and should work for everyone working on the module, in the very same, reproducible way.

You can also override default files, by specifying only one file to load:

```javascript
require('dotenv-ex')({env: '.env.one'})
```

or your own list of files:

```javascript
require('dotenv-ex')({env: ['.env.one', '.env.moar']})
```

Keep in mind, that environment variables specified in the files, are case sensitive.

## License

- Unlicense (~Public Domain)

## Related Work

- https://github.com/motdotla/dotenv - used under-the-hood, even tho it discourages using multiple `.end` files, let alone source controlling them
- https://github.com/motdotla/dotenv-expand - also used, for variable expansion
- https://github.com/facebook/create-react-app - `react-scripts` was immediate source of inspiration
- https://github.com/bkeepers/dotenv - hierarchy of `.env` files based on this ruby gem


[js_standard_badge]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[js_standard_link]:  https://github.com/feross/standard
[travis_badge]: https://travis-ci.org/unjello/dotenv-ex.svg?branch=master
[travis_link]:  https://travis-ci.org/unjello/dotenv-ex
[npm_badge]: https://img.shields.io/npm/v/dotenv-ex.svg?style=flat-square
[npm_link]:  https://npmjs.org/package/dotenv-ex
[npm_dl_badge]: http://img.shields.io/npm/dm/dotenv-ex.svg?style=flat-square
[npm_dl_link]: https://npmjs.org/package/dotenv-ex