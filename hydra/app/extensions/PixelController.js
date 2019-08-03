// gets pixels colors from a canvas and uses to control values

class PixelController {
  constructor ({ctx, x, y, gl}) {
    this.x = x
    this.y = y
    this.ctx = ctx
  // width of pixels to use as input
    this.width = 1
    this.pixels = new Uint8Array(4*this.width)
    this.value = 0
    this.gl = gl
    this.ctx.strokeStyle = "#FF0000";
    this.value = 0
    this.triggerThresh = 0.5
    this.trigger = false
  //  this.pixels = 0
  }

  update() {
     this.gl.readPixels(this.x, this.ctx.canvas.height - this.y, this.width, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixels)

     this.red = this.pixels[0]/255
     this.green = this.pixels[1]/255
     this.blue = this.pixels[2]/255

     var newVal = (this.red + this.green + this.blue)/3

     if(this.value < this.triggerThresh && newVal > this.triggerThresh) {
       this.trigger = true
     } else {
       this.trigger = false
     }
       // average of red, green, and blue pixels
     this.value = newVal

     var width = 10 + this.red * 100
     this.ctx.strokeStyle = "#FF0000";
     this.ctx.strokeRect(this.x - width/2, this.y - width/2, width, width)
     this.ctx.strokeRect(this.x - 4, this.y - 4, 4, 4)

     var width = 10 + this.green * 100
     this.ctx.strokeStyle = "#00FF00";
     this.ctx.strokeRect(this.x - width/2, this.y - width/2, width, width)
     this.ctx.strokeRect(this.x - 4, this.y - 4, 4, 4)

     var width = 10 + this.blue * 100
     this.ctx.strokeStyle = "#0000FF";
     this.ctx.strokeRect(this.x - width/2, this.y - width/2, width, width)
     this.ctx.strokeRect(this.x - 4, this.y - 4, 4, 4)

     var sampleWidth = 90
     for(var i = 0; i < this.width; i++){
       this.ctx.fillStyle = 'rgb(' + this.pixels[0+4*i] + ',' + this.pixels[1+4*i] + ',' + this.pixels[2+4*i] + ')'
       this.ctx.fillRect(1000 + sampleWidth * i, 20, sampleWidth, sampleWidth)

       // draw red channel
       this.ctx.fillStyle = 'rgb(' + this.pixels[0+4*i] + ', 0, 0)'
       this.ctx.fillRect(1000 + sampleWidth * i, 20 + sampleWidth, sampleWidth/3, sampleWidth/3)

       // draw green channel
       this.ctx.fillStyle = 'rgb(0,' + this.pixels[1+4*i] + ', 0)'
       this.ctx.fillRect(1000 + sampleWidth * i + sampleWidth/3, 20 + sampleWidth, sampleWidth/3, sampleWidth/3)

       // draw green channel
       this.ctx.fillStyle = 'rgb(0, 0,' + this.pixels[2+4*i] + ')'
       this.ctx.fillRect(1000 + sampleWidth * i + sampleWidth * 2/3, 20 + sampleWidth, sampleWidth/3, sampleWidth/3)

     }


  }

  // draw() {
  //   this.ctx.fillRect(this.x - this.value[0]/2, this.y - this.value[0]/2, this.value[0], this.value[0])
  // }

}

module.exports = PixelController
