// first settings loaded are stronger than last one
// Priority order:
// env : `$ SERVER_PORT=2500 node index.js` or `$ service_spacebro_inputMessage=new-media node index.js`
// argv: `$ node index.js --server.port 2000`
// settings file with argv: `$ node index.js --settings settings/settings.prod.json`
// settings file located at `settings/settings.json`
// settings file located at `settings/settings.default.json`

// TODO: load settings in data too

'use strict'

const nconf = require('nconf')
const fs = require('fs')

module.exports = () => {
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

  nconf.file({ file: './settings/settings.json' })
  .file('default', './settings/settings.default.json')

  return nconf.get()
}
