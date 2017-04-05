# standard-settings
Standardised settings loader

Note: First settings loaded are stronger than last one  

## Priority order  

### env
`$ SERVER_PORT=2500 node index.js` or `$ service_spacebro_inputMessage=new-media node index.js`  

### argv
`$ node index.js --server.port 2000`  

### settings file with argv
`$ node index.js --settings settings/settings.prod.json`  

### settings files
`settings/settings.json`  
`settings/settings.default.json`


## Schema  

The following schema is an example of settings used in Soixante circuits apps:

```
{
  "server": {
      "host" : "myip",
      "port" : "3333"
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
      "port" : "6666"
    },
    "spacebro": {
      "host" : "192.168.1.6",
      "port" : "8888",
      "channel": "lachaine",
      "client" : "nomdelapp",
      "inputMessage": "new-media",
      "outputMessage": "new-media-processed"
    }
  }
}
```

See [soixantecircuits/standard](https://github.com/soixantecircuits/standard)
