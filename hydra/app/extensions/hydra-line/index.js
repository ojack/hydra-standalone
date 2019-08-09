// gets pixels colors from a canvas and uses to control values
var PixelController = require('./PixelController.js')

class PixelSynth {
  constructor ({ gl, parent}) {
   this.gl = gl
   this.canvas = document.createElement('canvas')
   this.canvas.width = this.gl.drawingBufferWidth
   this.canvas.height = this.gl.drawingBufferHeight
   this.canvas.style.width = '100%'
   this.canvas.style.height = '100%'
   this.canvas.style.background = 'rgba(0, 0, 0, 0)'
  // this.canvas.style.zIndex = 100
   this.canvas.style.position = 'absolute'
   this.canvas.style.top = '0px'
   this.canvas.style.left = '0px'

   this.ctx = this.canvas.getContext('2d')
  // document.body.appendChild(this.canvas)

   parent.appendChild(this.canvas)
  // this.pixels = new Uint8Array(this.gl.drawingBufferWidth * this.gl.drawingBufferHeight * 4);

//   this.pixels = new Uint8Array(4)

   this.ctx.fillStyle = "rgb(255, 255, 255)";

   this.ctx.fillRect(10, 10, 55, 50);

   this.update = this.update.bind(this)

   this.centerX = 300
   this.centerY = 100

   this.controllers = []

   // create a scaled canvas to extract small amounts of pixel info
  //  this.scaledCanvas = document.createElement('canvas')
  //  this.scaledCanvas.width = 10
  //  this.scaledCanvas.height = 1
  //  this.scaledCanvas.style.width = '100%'
  //  this.scaledCanvas.style.height = '100px'
  //  this.scaledCanvas.style.background = 'rgba(0, 0, 0, 0)'
  // // this.scaledCanvas.style.zIndex = 100
  //  this.scaledCanvas.style.position = 'absolute'
  //  this.scaledCanvas.style.top = '0px'
  //  this.scaledCanvas.style.right = '0px'
  //
  //  this.scaledCtx = this.scaledCanvas.getContext('2d')
  //  this.scaledCtx.imageSmoothingEnabled = false;

   this.scaling = 1
  // document.body.appendChild(this.scaledCanvas)

  // parent.appendChild(this.scaledCanvas)
  }

  create({x = Math.random()*this.canvas.width, y = 200} = {}) {
    var p = new PixelController({
      gl: this.gl,
      ctx: this.ctx,
      x: x,
      y: y
    })

    this.controllers.push(p)
    return p
  }

  update() {

    //console.log(this)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.controllers.forEach((controller) => controller.update())

  // this.scaledCtx.drawImage(this.gl.canvas, 0, 0, this.scaledCanvas.width, this.scaledCanvas.height)
    //this.scaledCtx.drawImage(this.gl.canvas, 0, 0, this.canvas.width/this.scaling, this.canvas.height/this.scaling)
  }

  read() {
  //  this.gl.readPixels(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixels);

  //  this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixels)
  //  console.log(this.pixels); // Uint8Array
  }
}

module.exports = PixelSynth
