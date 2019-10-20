const utils = require('./core/utils.js')
const loop = require('raf-loop')

// Core
const HydraSynth = require('hydra-synth')
const Editor = require('./core/hydra-editor')

// Extensions
const PixelSynth = require('./extensions/hydra-pixels')
const OscManager = require('./extensions/hydra-osc')
const MidiManager = require('./extensions/hydra-midi')

function init () {
  // init hydra
  hydra = new HydraSynth({ canvas: initCanvas(), autoLoop: false })

  // special functions for running hydra in electron
  utils.initElectron(hydra)

  // initiate extensions, using 'window.' makes globally available
  window.pixels = new PixelSynth({ gl: hydra.regl._gl, parent: document.body})
  window.msg = new OscManager()

  // use like: osc( () => midi.cc[18]  ).out()
  window.midi = new MidiManager()
  
  editor = new Editor({ loadFromStorage: true})

// loop function run on each frame
  var engine = loop(function(dt) {
    hydra.tick(dt)
    window.pixels.update()

    if(window.update) {
      try { window.update(dt) } catch (e) {editor.log(e.message, "log-error")}
    }
    }).start()
}

function initCanvas() {
  // initiate hydra canvas
  var canvas = document.createElement('canvas')
//  getElementById('hydra-canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.setAttribute('id', 'hydra-canvas')
  document.body.appendChild(canvas)
  return canvas
}
//
window.onload = init
