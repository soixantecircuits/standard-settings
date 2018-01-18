// first settings loaded are stronger than last one
// Priority order:
// env : `$ SERVER_PORT=2500 node index.js` or `$ service_spacebro_inputMessage=new-media node index.js`
// argv: `$ node index.js --server.port 2000`
// settings file with argv: `$ node index.js --settings settings/settings.prod.json`
// settings file located at `settings/settings.json`
// settings file located at `settings/settings.default.json`

'use strict'

const nconf = require('nconf')
const fs = require('fs')
const path = require('path')
const primarySettingsPath = 'settings/settings.json'
const secondarySettingsPath = 'settings/settings.default.json'
const assignment = require('assignment')
let lookUpPath = '.'

nconf.env({
  lowerCase: true,
  separator: '_'
})
.argv()

if (nconf.get('settings') !== undefined) {
  if (!fs.existsSync(nconf.get('settings'))) {
    console.warn('File ' + nconf.get('settings') + ' does not exist and was not loaded. Other settings applied.')
  } else {
    nconf.file('cli', nconf.get('settings'))
  }
}

if (!fs.existsSync(path.resolve(lookUpPath, secondarySettingsPath))) {
  console.warn('Cannot find ' + path.resolve(lookUpPath, secondarySettingsPath))
}

if (fs.existsSync(path.resolve(process.cwd(), secondarySettingsPath))) {
  lookUpPath = process.cwd()
} else if (fs.existsSync(path.resolve(path.dirname(require.main.filename), secondarySettingsPath))) {
  lookUpPath = path.dirname(require.main.filename)
}

nconf.file({file: path.resolve(lookUpPath, primarySettingsPath)})
  .file('default', path.resolve(lookUpPath, secondarySettingsPath))

var getMeta = media => {
  let defaultMeta = nconf.get('media:meta')
  if (defaultMeta === undefined) {
    defaultMeta = {}
  }
  if (media) {
    return assignment(defaultMeta, media.meta)
  } else {
    return defaultMeta
  }
}

module.exports = {
  getMeta,
  get: (key) => {
    return nconf.get(key)
  },
  getSettings: () => {
    return nconf.get()
  }
}
