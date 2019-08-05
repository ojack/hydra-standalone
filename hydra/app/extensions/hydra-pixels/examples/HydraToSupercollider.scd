~dato = 0;
(
OSCdef(\test, {|msg, time, addr, recvPort|
	msg.postln;
	~dato = msg[1].linlin(0, 1, 220, 440);
	//a.set(\frec, ~dato);
	//b = Synth(\trig);
	c = Synth(\kick_808);
}, '/trigger', n);
)

(
OSCdef(\test, {|msg, time, addr, recvPort|
	msg.postln;
	~dato = msg[1].linlin(0, 1, 220, 440);
	//a.set(\frec, ~dato);
	//b = Synth(\trig);
	c = Synth(\kick_808, [\freq1, msg[1].linlin(0, 1, 100, 1000)]);
}, '/kick', n);
)

(
OSCdef(\test2, {|msg, time, addr, recvPort|
	msg.postln;
	~dato = msg[1].linlin(0, 1, 220, 440);
	//a.set(\frec, ~dato);
	//b = Synth(\trig);
	d = Synth(\hihatClosed);
}, '/hh', n);
)

/////////////////////////////////////////////////////////////////////////
(
SynthDef(\prueba, {|gate 1, frec 220, mod 1, mix 0.1, room 1|
	var sen, env;

	sen = Pulse.ar(VarLag.kr(frec, 0.1, 0, \lin)) * SinOsc.ar(mod).range(0,1);
	sen = FreeVerb.ar(sen, mix, room);
	env = EnvGen.kr(Env.asr(0.1, 1, 0.1), gate, doneAction:2);

	Out.ar(0, sen, env)
}
).add;
)

a=Synth(\prueba)

(
SynthDef(\trig,{|gate 1|
	var sen, env;

	sen = WhiteNoise.ar(0.25);
	env = EnvGen.kr(Env.perc(0.01,1), gate, doneAction:2);

	Out.ar(0, sen*env)
}).add;
)
b = Synth(\trig)


(
SynthDef(\kick_808, {arg out = 0, freq1 = 240, freq2 = 60, amp = 1, ringTime = 10, rel = 1, dist = 0.5, pan = 0;
    var snd, env;
	snd = Ringz.ar(
		in: Impulse.ar(0), // single impulse
		freq: XLine.ar(freq1, freq2, 0.1),
		decaytime: ringTime);
	env = EnvGen.ar(Env.perc(0.001, rel, amp), doneAction: 2);
	snd = (1.0 - dist) * snd + (dist * (snd.distort));
	snd = snd * env;
	Out.ar(0, Pan2.ar(snd, pan));
//
//By Bruno Ruviaro
//https://github.com/brunoruviaro/SynthDefs-for-Patterns/blob/master/kick808.scd
}).add;
)

(
SynthDef(\hihatClosed, {|amp=0.5,out=0, rel=0.125,pan=0|

	    var hatosc, hatenv, hatnoise, hatoutput;

	    hatnoise = {LPF.ar(WhiteNoise.ar(1),6000)};

	    hatosc = {HPF.ar(hatnoise,2000)};
	    hatenv = EnvGen.kr(Env.perc(0.01,rel),doneAction:2);

	    hatoutput = (hatosc * hatenv)/2;

	    Out.ar(out,
	    Pan2.ar(hatoutput*amp, pan)

	    )
	}).add;
)