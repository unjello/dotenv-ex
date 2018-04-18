const test = require('tap').test
const mockRequire = require('mock-require')
const mockFs = require('mock-fs')
process.env['NODE_ENV'] = 'test'
const dotenv = require('../lib/')


test('in test environment', t => {
  t.test('will not use .local files', t => {
    mockFs({
      '.env.test': 'test',
      '.env': 'test'
    })
    let files = []
    let calls = 0
    mockRequire('dotenv', { config: c => files.push(c.path) })
    mockRequire('dotenv-expand', () => calls++)

    dotenv()

    t.plan(2)
    t.equals(calls, 2)
    t.same(files, ['.env.test', '.env'])
  })

  t.end()
})