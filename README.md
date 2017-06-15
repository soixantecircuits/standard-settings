# standard-settings
Standardised settings loader


## Installation

`npm install standard-settings --save`  
or  
`yarn add standard-settings`

## Why

No more `cp config.sample.json config.json`

Your app presents a `settings/settings.default.json` which is always included.
User or other developer needing custom settings loads his custom settings which overrides the default settings.
If a key is missing in user settings, it won't trigger errors, as a default value is in `settings.default.json`
`standard-settings` offers multiple ways to change settings: `settings.json` file, command line arguments, environment variables. Check below examples for usage and priority order.

## Usage

This module loads settings and store them using [nconf](https://github.com/indexzero/nconf).  
It should be required at the very beginning of your project:
```
  const standardSettings = require('standard-settings')
```
Then your settings are accessible from any file in your project using:
```
  const settings = standardSettings.getSettings()
```
If you need to directly access a specific field inside your settings, you can use:
```
  const port = standardSettings.get('server:port')
```

Under the hood, it is exactly the same as nconf.


## API

### getMeta(media)
  - **parameters**: media (Object)
  - **returns**: meta (Object)
  - **description**: This function creates a new object resulting from the overload of the `media.meta` (from settings) with the `media.meta` (from media parameter) and returns its content.


## Priority order  

### Environment variables
Example:  
`$ SERVER_PORT=2500 node index.js`  
`$ service_spacebro_inputMessage=new-media node index.js`  

### Command line parameters (argv)
Example:  
`$ node index.js --server.port 2000` to specify a field  
`$ node index.js --settings settings/settings.prod.json` to specify a settings file  

### Files
These files are loaded if no `--settings` option is provided:  
`settings/settings.json` first  
`settings/settings.default.json` (if the first one does not exists)  


## Schema  

The following schema is an example of settings used in Soixante circuits apps:

```
{
  "server": {
      "host" : "myip",
      "port" : 3333
  },
  "timeout": {
    "lookbook": 5,
    "popup": 4
  },
  "folder": {
    "kcDownloader": "path-to/data",
    "lookbook": "path-to/lookbook"
  },
  "flag": {
    "stabalize": true,
    "devMode": true
  },
  "customKey": {
    "maxImageNumber": 64
  },
  "meta": {
      "title": "",
      "description": "",
      "message": "...",
      "source": ""
  },
  "service": {
    "altruist": {
      "host" : "192.168.1.6",
      "port" : 6666
    },
    "spacebro": {
      "host" : "192.168.1.6",
      "port" : 8888,
      "channel": "my-channel",
      "client" : "my-app",
      "inputMessage": "new-media",
      "outputMessage": "new-media-processed"
    }
  }
}
```

See [soixantecircuits/standard](https://github.com/soixantecircuits/standard)
