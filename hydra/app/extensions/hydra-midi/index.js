

class Midi {
  constructor() {
    console.log('midi ctor');
    this.onMIDISuccess = this.onMIDISuccess.bind(this)
    this.getMIDIMessage = this.getMIDIMessage.bind(this)

    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
    //create an array to hold our cc values and init to a normalized value
    this.cc = Array(128).fill(0.5);
  };
    
 onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage;
    }
  }
  onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
  }

  getMIDIMessage(midiMessage) {
    var arr = midiMessage.data
    var index = arr[1]
    console.log('Midi received on cc#' + index + ' value:' + arr[2])
    var val = (arr[2] + 1) / 128.0  // normalize CC values to 0.0 - 1.0
    this.cc[index] = val
  }
}

module.exports = Midi


