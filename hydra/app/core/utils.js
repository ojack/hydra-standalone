const electron = require('electron')
//
const desktopCapturer = electron.desktopCapturer

module.exports = {
  initElectron: function (hydra) {

      // // hijack source init screen event because doesn't work in Electron
       hydra.s.forEach((source) => {
         source.initScreen = (index) =>  desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
             if (error) throw error
             console.log(sources)
             if(index == undefined) index = 0
             if (sources.length > index) {
               navigator.mediaDevices.getUserMedia({
                 audio: false,
                 video: {
                   mandatory: {
                     chromeMediaSource: 'desktop',
                     chromeMediaSourceId: sources[index].id
                   }
                 }
               }).then((stream) => {
                 const video = document.createElement('video')
                 console.log(video, video.width)
                 video.srcObject =stream
                 video.addEventListener('loadedmetadata', () => {
                   video.play().then(() => {
                     source.src = video
                     source.tex = source.regl.texture(source.src)
                   })
                 })
               })
               //document.body.appendChild(video)
             }
           })
       })

       // define hush function
         window.hush = () => {
           solid().out()
           solid().out(o1)
           solid().out(o2)
           solid().out(o3)
           render(o0)
         }
  }
}
