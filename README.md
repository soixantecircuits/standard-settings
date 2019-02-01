_**Standard settings** — automatic settings loader_

A standardised settings loader. 

No more `cp config.sample.json config.json` !

### Features
 - **Automatic**: load of default _settings.default.json_ file
 - **Easy**: customization of default settings (_settings.json_ file)
 - **Granular**: customization of settings through runtime arguments (--port=3000 --name=foo)
 - **Fast**: settings overide by environment variables
 - **Bulletproof**: runs in node and electron



## ❓Why ?

Keep the original **settings** and tinker easily with your own **settings**.

The app you developped will present a `settings/settings.default.json` which will always be included.

A user, or a developer wanting to tweak the settings, create a **settings.json** and `standard-settings` will load it and merge it with your default settings.

If a key is missing in custom settings, it won't trigger any error, because the default value is in `settings.default.json`.  

`standard-settings` offers multiple ways to change settings: 

- a `settings.json` file, 
- command line arguments, 
- environment variables.  

Discover below examples for usage and priority order.

## 🌍 Installation

`npm install standard-settings --save`  
or  
`yarn add standard-settings`

## ⚙ Configuration

In a project where you plan to allow easy and simple configuration option with a JSON file, create a folder named: `settings`.
Inside this folder, create a `settings.default.json`. `standard-settings` will load this file by default. 
Then create your own settings value and store them inside a `settings.json` file. This file will override the value of the `settings.default.json`

Do not forget to put the `settings/settings.json` inside your `.gitignore` file.

### Default files names
These files are always loaded if present:  
`settings/settings.json` first  
`settings/settings.default.json`

## Settings Load override order

As per `standard-settings` rules, **environement variable** will always take precedence over keys that could be set by command line argument or via file

1. The `settings.default.json` file which is in `settings` folder of your main app
2. The `settings.json` file which is in `settings` folder of your main app

3. Via a setting file through the command line
  
    Example:
  
    `$ node index.js --settings settings/settings.prod.json` to specify a settings file wich will override `server.port`

3. Via command line parameters (argv)
  
    Example:
    
    `$ node index.js --server.port 2000` to specify a field

    This means that if you pass a `settings` file with `--settings` argument, the target key will override the value in the settings.

5. ### Environment variables

    Example:

    `$ SERVER_PORT=2500 node index.js`  
    `$ service_spacebro_inputMessage=new-media node index.js` 

    `$SERVER_PORT=6666 node examples/index.js --settings ./settings/settings.production.json --server.port 2000`

    Here, the `SERVER_PORT` env will always win. You'll endup with a 6666 value for the key `port`of the key `server` 

    This means that if you pass a `settings` file with `--settings` argument, or a target key with command line like `--server.port` the environment variable will be the final value.

## 👋 Usage inside Node.js or Electron

We recommand to require it at the very beginning of your project file:

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

Under the hood, it is exactly the same as [nconf](https://github.com/indexzero/nconf).


## API

### getSettings()
  - **returns**: full settings, environement included (JSON Object)
  - **description**: This function creates a new object resulting from the overload of the `settings` (from settings.default) with the `settings` value (from settings.json) and returns its content.

### get(flatKey)
  - **parameters**: flatKey (String) representing the key with `:` separator access. For instance, if you have an object like: `{server:{port:80}}` you will access to port by supplying the string `server:port` to the `get` function.
  - **returns**: only the value of the targeted key. Could be a JSON, a number or a String.
  - **description**: This function converts the string you provide into a path allowing to access deeply to the JSON. If the value key exist it will returns the value, else undefined.

### getMeta(media)
  - **parameters**: media (Object)
  - **returns**: meta (Object)
  - **description**: This function creates a new object resulting from the overload of the `media.meta` (from settings) with the `media.meta` (from media parameter) and returns its content.

## Working all together with different settings

On your project, you may have other developers working with different settings.  
Pushing them in the repo is annoying. We know you've seen that before.  
Using standard-settings, developers can share common default settings, AND load custom settings.

Best practice is to add `settings/settings.default.json` in your repo, this file covers default settings, common for each developer.  
And `.gitignore` `settings/settings.json`, this file has custom settings inside. 

## Schema example for a setting file  

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

## 📦 Dependencies

`standard-settings` depends on:

* nconf
* assignment

## 🕳 Troubleshooting
- Why my settings don't match my JSON setting file?

A common trap is to forgot that your **settings/** folder contains `settings.json` and `settings.default.json`. Make sure what are the settings file you have in your app.

- Why my settings are undefined ?

If `standard-settings` can't find any `settings.json`or `settings.default.json`, a warning will output to the console. You should look for the sentence: `Settings not found`.

## ❤️ Contribute

Please do!
