'use strict'

import test from 'ava'

const standardSettings = require('../')

test(t => {
  t.deepEqual(typeof standardSettings.getSettings, 'function')
})

test(t => {
  t.deepEqual(typeof standardSettings.getMeta, 'function')
})

test(t => {
  let settings = standardSettings.getSettings()
  t.deepEqual(settings.server.host, '127.0.0.1')
  t.deepEqual(settings.server.port, 8888)
  t.deepEqual(settings.timeout, 6060)
})
