
const dgram = require('dgram')
const osc = require('osc-min')
const EventEmitter = require('events')


class Osc extends EventEmitter{
    constructor() {
      super()
      this.sock = dgram.createSocket('udp4', (buf) => {
      //  console.log('got osc!!', osc.fromBuffer(msg))
        //
        try {
          var msg = osc.fromBuffer(buf)
        //  console.log('msg', msg)
          this.emit('*', msg)
          this.emit(msg.address, msg.args)
        } catch (e) {
          console.log("ERROR", e)
        }
      })
      this.isBound = false
      this.IP = 'localhost'
      this.outgoingPort = '8000'
    //  this.sock.bind(8000);

    }

    // for livecoding, remove existing event listener
    on(addr, callback){
      this.removeAllListeners(addr)
      super.on(addr, callback)
    }

    setPort(port) {
      self = this
      if(self.isBound) {
        self.sock.close(() => {
          self.sock = dgram.createSocket('udp4', (buf) => {
            try {
              var msg = osc.fromBuffer(buf)
            //  console.log('msg', msg)
              this.emit('*', msg)
              this.emit(msg.address, msg.args)
            } catch (e) {
              console.log("ERROR", e)
            }
          });
          self.sock.bind(port)
          console.log('connected to socket', port)
        })
      } else {
        self.sock.bind(port)
      }
    //  self.sock.close()

      self.isBound = true
    }

    setOutgoingPort({
      IP = 'localhost',
      port = 8000
    }) {
      this.IP = IP
      this.outgoingPort = setOutgoingPort
    }

// msg should be formatted as documented at https://www.npmjs.com/package/osc-min
    send(msg) {
      console.log('sending', msg,   this.IP)
      var buf
      buf = osc.toBuffer(msg)
      this.sock.send(buf, 0, buf.length, this.outgoingPort, this.IP)
    }

}

  module.exports = Osc
