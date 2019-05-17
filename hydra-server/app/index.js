const PatchBay = require('./src/pb-live.js')
const HydraSynth = require('hydra-synth')
const Editor = require('./src/editor.js')
const Canvas = require('./src/canvas.js')
const loop = require('raf-loop')
const P5  = require('./src/p5-wrapper.js')
 const electron = require('electron')
//
const desktopCapturer = electron.desktopCapturer



//const Gallery  = require('./src/gallery.js')
//const Menu = require('./src/menu.js')

function init () {
//  window.pb = pb
  window.P5 = P5

  // initialize elements
  var canvas = Canvas(document.getElementById('hydra-canvas'))
  canvas.size()
//  var pb = new PatchBay()
  var hydra = new HydraSynth({ canvas: canvas.element, autoLoop: false })
  var editor = new Editor

  // // hijack source init screen event because doesn't work in Electron
   hydra.s.forEach((source) => {
     source.initScreen = (index) =>  desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
         if (error) throw error
      //   this.log(sources)
         if (sources.length > index) {
           navigator.mediaDevices.getUserMedia({
             audio: false,
             video: {
               mandatory: {
                 chromeMediaSource: 'desktop',
                 chromeMediaSourceId: sources[index].id,
               //  minWidth: 1280,
                 maxWidth: 1280,
             //    minHeight: 720,
                 maxHeight: 720
               }
             }
           }).then((stream) => {
             const video = document.createElement('video')
             video.src = window.URL.createObjectURL(stream)
             video.addEventListener('loadedmetadata', () => {
               video.play().then(() => {
                 source.src = video
                 source.tex = source.regl.texture(source.src)
               })
             })
           })
         }
       })
   })
  // var menu = new Menu({ editor: editor, hydra: hydra})
  //
  // // get initial code to fill gallery
  // var sketches = new Gallery(function(code, sketchFromURL) {
  //   editor.cm.setValue(code)
  //   editor.evalAll()
  //   editor.saveSketch = (code) => {
  //     sketches.saveSketch(code)
  //   }
  //   editor.shareSketch = menu.shareSketch.bind(menu)
  //   // if a sketch was found based on the URL parameters, dont show intro window
  //   if(sketchFromURL) {
  //     menu.closeModal()
  //   } else {
  //     menu.openModal()
  //   }
  // })
  // menu.sketches = sketches

//   var code = `
//   // initialize video element
// vid = document.createElement('video')
// vid.loop = true
// window.onclick = () => { vid.play()}
//
//
// // load video
// vid.src = 'https://ia801207.us.archive.org/24/items/spheres_201608/spheres_201608.mp4'
//
// // use video as source in hydra
// s0.init({src: vid})
//
// // luma key
// src(s0).luma().out()
//
// // circular mask on the video
// src(s0).mask(shape(30, 0.6, 0.2)).out()
// `

var code = `osc().luma().out()`

// setTimeout(() => {
  editor.cm.setValue(code)
  editor.evalAll()
// }
//   , 2000)
  // define extra functions (eventually should be added to hydra-synth?)

  // hush clears what you see on the screen
  window.hush = () => {
    solid().out()
    solid().out(o1)
    solid().out(o2)
    solid().out(o3)
    render(o0)
  }


  // pb.init(hydra.captureStream, {
  //   server: window.location.origin,
  //   room: 'iclc'
  // })

  var engine = loop(function(dt) {
    hydra.tick(dt)
  }).start()


}

window.onload = init
