const test = require('tap').test
const mockRequire = require('./mock')
const mockFs = require('mock-fs')
process.env['NODE_ENV'] = 'development'
const dotenv = require('../lib/')

test('in development environment', t => {
  t.test('will use default hierarchy of files', t => {
    mockFs({
      '.env.development.local': 'test',
      '.env.development': 'test',
      '.env.local': 'test',
      '.env': 'test'
    })

    const {calls, files} = mockRequire(() => dotenv())

    t.plan(2)
    t.equals(calls, 4)
    t.same(files, ['.env.development.local', '.env.development', '.env.local', '.env'])
  })

  t.end()
})
