const utils = require('./core/utils.js')
const loop = require('raf-loop')

// Core
const HydraSynth = require('hydra-synth')
// const Editor = require('./core/editor.js')
const Editor = require('./core/editor.js')

const main = require('./hydra-pixelsynth.js')

function init () {
  // initiate hydra canvas
  var canvas = document.createElement('canvas')
//  getElementById('hydra-canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.setAttribute('id', 'hydra-canvas')
  document.body.appendChild(canvas)
  hydra = new HydraSynth({ canvas: canvas, autoLoop: false })
  editor = new Editor({ loadFromStorage: true})

  //main.init(hydra)


  utils.initElectron(hydra)



  // set initial code in the editor
  //var code = `osc().out()`
   setTimeout(() => {
  //  editor.cm.setValue(code)
    editor.evalAll()
  }, 200)

// loop function
  var engine = loop(function(dt) {
    hydra.tick(dt)
    if(window.update) {
      try { window.update(dt) } catch (e) {editor.log(e.message, "log-error")}
    }
  //  main.update(dt)
    }).start()
}
//
window.onload = init
