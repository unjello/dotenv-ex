const mockRequire = require('mock-require')

module.exports = cb => {
  let files = []
  let calls = 0
  mockRequire('dotenv', { config: c => files.push(c.path) })
  mockRequire('dotenv-expand', () => calls++)

  cb()

  mockRequire.stopAll()

  return { files, calls }
}