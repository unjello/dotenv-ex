const test = require('tap').test
const mockRequire = require('./mock')
const mockFs = require('mock-fs')
const dotenv = require('../lib/')

test('in production environment', t => {
  t.test('will use default hierarchy of files', t => {
    mockFs({
      '.env.production.local': 'test',
      '.env.production': 'test',
      '.env.local': 'test',
      '.env': 'test'
    })

    const {calls, files} = mockRequire(() => dotenv())

    t.plan(2)
    t.equals(calls, 4)
    t.same(files, ['.env.production.local', '.env.production', '.env.local', '.env'])
  })

  t.end()
})
