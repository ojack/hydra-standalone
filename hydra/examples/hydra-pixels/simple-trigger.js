p0 = pixels.create()
msg.outgoingPort = 57120

s0.initCam()

p0.triggerThresh = 0.5
update = () => {
  // only send message when certain threshold is crossed
  if(p0.trigger) msg.send({ address: "/kick", args: {type: 'float', value: p0.red}})
}


osc(10, -0.2, 1.2).mult(osc(100, 0.04).rotate(0, 0.4).scrollX(0, -0.2)).out()

osc(60, -0.1, 1.2).mult(osc(200, 0.1)).out()
