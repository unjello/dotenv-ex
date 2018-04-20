const test = require('tap').test
const mockRequire = require('./mock')
const mockFs = require('mock-fs')
const dotenv = require('../lib/')

test('in any environment', t => {
  t.test('will silently skip non-existing files', t => {
    mockFs({
      '.env.production': 'test',
      '.env.local': 'test',
    })

    const {calls, files} = mockRequire(() => dotenv())

    t.plan(2)
    t.equals(calls, 2)
    t.same(files, ['.env.production', '.env.local'])
  })

  t.test('will only load a single specified file instead of default', t => {
    mockFs({
      '.env.production': 'test',
      '.env.local': 'test',
      '.env': 'test',
      '.env.different': 'test'
    })

    const {calls, files} = mockRequire(() => dotenv({
      env: '.env.different'
    }))

    t.plan(2)
    t.equals(calls, 1)
    t.same(files, ['.env.different'])
  })

  t.test('will only load list of specified files instead of default', t => {
    mockFs({
      '.env.production': 'test',
      '.env.local': 'test',
      '.env': 'test',
      '.env.different': 'test',
      '.env.different.local': 'test',
      '.env.moar': 'test'
    })

    const {calls, files} = mockRequire(() => dotenv({
      env: ['.env.different', '.env.different.local', '.env.moar']
    }))

    t.plan(2)
    t.equals(calls, 3)
    t.same(files, ['.env.different', '.env.different.local', '.env.moar'])
  })

  t.end()
})