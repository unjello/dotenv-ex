const test = require('tap').test
const dotenv = require('../lib/')

test('in real environment', t => {
  t.test('will load environment variables from dotenv files hierarchy', t => {
    // tap runs test in project directory. don't want to pollute it with test dotenv files
    process.chdir('test/data');
    
    dotenv()

    t.plan(4)
    t.equal(process.env.TEST_ENV, 'true')
    t.equal(process.env.TEST_ENV_LOCAL, 'true')
    t.equal(process.env.TEST_ENV_PRODUCTION, 'true')
    t.equal(process.env.TEST_ENV_PRODUCTION_LOCAL, 'true')
  })

  t.end()
})
