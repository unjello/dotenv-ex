const test = require('tap').test
const mockRequire = require('./mock')
const mockFs = require('mock-fs')
process.env['NODE_ENV'] = 'test'
const dotenv = require('../lib/')

test('in test environment', t => {
  t.test('will not use .local files', t => {
    mockFs({
      '.env.test': 'test',
      '.env': 'test'
    })

    const {calls, files} = mockRequire(() => dotenv())

    t.plan(2)
    t.equals(calls, 2)
    t.same(files, ['.env.test', '.env'])
  })

  t.end()
})
