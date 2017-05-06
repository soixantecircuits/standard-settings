'use strict'

import test from 'ava';

const standardSettings = require('../')

test(t => {
	t.deepEqual(typeof standardSettings.getSettings, 'function')
})

test(t => {
	t.deepEqual(typeof standardSettings.getMeta, 'function')
})

test(t => {
	let settings = standardSettings.getSettings()
  t.pass()
})
