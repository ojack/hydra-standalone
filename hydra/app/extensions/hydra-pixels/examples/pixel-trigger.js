osc(100, 0).modulateScale(osc()).rotate(0, 0.1).out()

osc(100, 0.2).out()

p1 = pixels.create()

// set IP and port for outgoint messages
//msg.IP = '192.168.1.68'
msg.outgoingPort = 57120

p1.triggerThresh = 0.5
p2 = pixels.create()
p1.x = 300
p2.y = 300

s0.initScreen(1)

solid().out()

src(s0).repeat(1, 1).scrollY(0, 0.4).thresh(0.8).out()

update = () => {
  // only send message when certain threshold is crossed
  if(p1.trigger) msg.send({ address: "/kick", args: {type: 'float', value: p1.red}})
  if(p2.trigger) msg.send({ address: "/hh", args: {type: 'float', value: p1.red}})
  p2.x+=10

  if(p2.x > window.innerWidth) p2.x = 0
}
