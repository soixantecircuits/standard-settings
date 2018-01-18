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

let settingsPath = '.'
let lookUpPaths = [
  process.cwd(),
  require.main.filename,
  path.dirname(process.argv[1]),
  path.resolve(path.dirname(require.main.filename), '../../../'), // inside electron
  path.resolve(path.dirname(require.main.filename), '../../../app.asar.unpacked/') // inside electron with asar
]
for (let lookUpPath in lookUpPaths) {
  if (fs.existsSync(path.resolve(lookUpPaths[lookUpPath], secondarySettingsPath))) {
    settingsPath = lookUpPaths[lookUpPath]
    break
  }
}

if (!fs.existsSync(path.resolve(settingsPath, secondarySettingsPath))) {
  console.warn('Settings not found ' + secondarySettingsPath)
}

nconf.file({file: path.resolve(settingsPath, primarySettingsPath)})
  .file('default', path.resolve(settingsPath, secondarySettingsPath))

var getMeta = media => {
  let defaultMeta = nconf.get('media:meta')
  if (defaultMeta === undefined) {
    defaultMeta = {}
  }
  defaultMeta = JSON.parse(JSON.stringify(defaultMeta))
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
