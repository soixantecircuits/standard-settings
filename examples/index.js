'use strict'

const settings = require('../').getSettings()

console.log(`timeout: ${settings.timeout}`)
console.log(`get('server:port') -> ${require('../').get('server:port')}`)
