### Standalone version of hydra built using electron

The goal of this repo is to create a standalone version of Hydra that is easier to modify and extend, and define a method for creating and sharing extensions related to live coding with hydra. For further documentation of hydra, please see: https://hydra-editor.glitch.me/

### To install:
- 1. clone this repo
- 2. install nodejs https://nodejs.org/en/
- 3. cd into the directory and run `npm install` from the command line

### To run:
Run `npm run start` from the command line. By default, the app uses the file '/hydra/app/startup.js' to run hydra. You can edit this file to change configuration.

### Extensions:
Extensions can be specified as separate modules in the 'hydra/app/extensions' folder, and used from '/hydra/app/startup.js'.
Common methods to be implemented in extensions are an 'init' method which receives a hydra instance as a parameter, and an 'update' function, which receives dt (change in time). For an example startup file which makes use of extensions, see 'hydra/app/startup-pixels.js'. This uses the extensions hydra-pixels and hydra-osc to send pixel colors to other applications via Open Sound Control (see modules hydra-osc and hydra-pixels in 'hydra/app/extensions' for example module structure).

For more information about Electron, and available APIs, see the documentation at: https://electronjs.org/

### Troubleshooting
If you get the error (regl) webgl not supported, add the following line to './hydra/electron-start.js, after the line
`const {app, BrowserWindow} = electron`:
```app.commandLine.appendSwitch('ignore-gpu-blacklist')```


### To do:
The standalone version of hydra is just getting started. The following are things that have yet to be implemented:
- way to save and load local files from the main window menu
- example for loading images and videos, way of adjusting scaling of images and videos
- flash highlight code on execution
- better documentation
- help menu with links to documentation
- documentation for developing and publishing extensions
- README for individual extensions
