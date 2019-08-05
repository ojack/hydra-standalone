const utils = require('./core/utils.js')
const loop = require('raf-loop')

// Core
const HydraSynth = require('hydra-synth')
const Editor = require('./core/hydra-editor')

function init () {
  // init hydra
  hydra = new HydraSynth({ canvas: initCanvas(), autoLoop: false })
  editor = new Editor({ loadFromStorage: true})

  // special functions for running hydra in electron
  utils.initElectron(hydra)

// loop function run on each frame
  var engine = loop(function(dt) {
    hydra.tick(dt)
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
