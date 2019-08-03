// Extensions
const PixelSynth = require('./extensions/PixelSynth.js')
const OscManager = require('./extensions/OscManager.js')

var hydra, editor

module.exports = {
  init: (hydra) => {
    console.log('init', hydra)
    // initiate extensions
    window.pixels = new PixelSynth({ gl: hydra.regl._gl, parent: document.getElementById('hydra-ui')})
    window.msg = new OscManager()
 },
  update: (dt) => {
    //hydra.tick(dt)
    window.pixels.update()
    if(window.update) window.update(dt) // provide global update function. This should probably eventually be added to hydra-synth
  }
}
