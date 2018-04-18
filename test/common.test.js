const test = require('tap').test
const mockRequire = require('mock-require')
const mockFs = require('mock-fs')
const dotenv = require('../lib/')

test('in any environment', t => {
  t.test('will silently skip non-existing files', t => {
    mockFs({
      '.env.production': 'test',
      '.env.local': 'test',
    })
    let files = []
    let calls = 0
    mockRequire('dotenv', { config: c => files.push(c.path) })
    mockRequire('dotenv-expand', () => calls++)

    dotenv()

    t.plan(2)
    t.equals(calls, 2)
    t.same(files, ['.env.production', '.env.local'])
  })

  t.end()
})