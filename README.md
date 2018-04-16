[![Build Status][travis_badge]][travis_link] [![js-standard-style][js_standard_badge]][js_standard_link]

# dotenv-ex

- Loads environment variables from hierarchy of .env files for Node.js projects.

## Example

```javascript
const Mock = require('openapi-mockk')

Mock(args.api).responses({
  path,
  operation,
  response: '200',
  content,
}).then(mock => {
  console.log(mock[path][operation].responses)
})
```

## License

- Unlicense (~Public Domain)

## Related Work

- https://github.com/motdotla/dotenv - used under-the-hood, even tho it discourages using multiple `.end` files, let alone source controlling them
- https://github.com/facebook/create-react-app - `react-scripts` was immediate source of inspiration 


[js_standard_badge]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[js_standard_link]:  https://github.com/feross/standard
[travis_badge]: https://travis-ci.org/unjello/dotenv-ex.svg?branch=master
[travis_link]:  https://travis-ci.org/unjello/dotenv-ex
