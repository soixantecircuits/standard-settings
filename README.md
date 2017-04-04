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
