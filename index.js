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
const primarySettingsPath = path.join('settings', 'settings.json')
const secondarySettingsPath = path.join('settings', 'settings.default.json')
const assignment = require('assignment')
const main = require('require-main-filename')()

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
  main
]
if (process.argv[0] !== undefined) {
  lookUpPaths.push(path.dirname(process.argv[0]))
  lookUpPaths.push(path.resolve(path.dirname(process.argv[0]), '..'))
}

if (process.argv[1] !== undefined) {
  lookUpPaths.push(path.dirname(process.argv[1]))
  lookUpPaths.push(path.resolve(path.dirname(process.argv[1])))
  lookUpPaths.push(path.resolve(path.dirname(process.argv[1]), '..'))
}

if (main) {
  lookUpPaths.push(path.resolve(path.dirname(main)))
  lookUpPaths.push(path.resolve(path.dirname(main), '..'))
  lookUpPaths.push(path.resolve(path.dirname(main), path.join('..', '..', '..'))) // inside electron legacy
  lookUpPaths.push(path.resolve(path.dirname(main), path.join('..', '..', '..', 'app.asar.unpacked'))) // inside electron with asar legacy
}
lookUpPaths.push(process.execPath)

// console.log(lookUpPaths)

for (let lookUpPath in lookUpPaths) {
  if (fs.existsSync(path.resolve(lookUpPaths[lookUpPath], secondarySettingsPath))) {
    settingsPath = lookUpPaths[lookUpPath]
    break
  }
}

if (!fs.existsSync(path.resolve(settingsPath, secondarySettingsPath))) {
  console.warn(`WARNING - Default settings not found at: ${path.resolve(settingsPath, secondarySettingsPath)}`)
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
