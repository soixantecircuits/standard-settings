'use strict'

import test from 'ava'

const standardSettings = require('../')

test('getSettings is a function', t => {
  t.deepEqual(typeof standardSettings.getSettings, 'function')
})

test('getMeta is a function', t => {
  t.deepEqual(typeof standardSettings.getMeta, 'function')
})

test('get is a function', t => {
  t.deepEqual(typeof standardSettings.get, 'function')
})

test('settings are correctly read', t => {
  let settings = standardSettings.getSettings()
  t.deepEqual(settings.server.host, '127.0.0.1')
  t.deepEqual(settings.server.port, 8888)
  t.deepEqual(settings.timeout, 0)
})
