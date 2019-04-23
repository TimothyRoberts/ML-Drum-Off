let checkpointURL = "model";

if (dannySelected) {
  checkpointURL = "dannyModel";
}
console.log(checkpointURL);
let drums_rnn = mm.MusicRNN(checkpointURL);
// let vis2;
console.log(drums_rnn);

let player, player2, tempPlayer, viz, vis2, vizPLayer, vizPLayer2;
let music_rnn, rnnPlayer;
let generatedSequence;
// createSampleSequences();
// createSamplePlayers();
setupDrumsRNN();


// player = new mm.Player();


function createSampleSequences() {
  DRUMS_INPUT = {
  ticksPerQuarter: 220,
  totalTime: 5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: []
  }

  for(let i = 0; i < startInputs.length; i++) {
    DRUMS_INPUT.notes.push({
      startTime: startInputs[i], endTime: endInputs[i], pitch: inputPitches[i], velocity: 100, isDrum: true}, {
      instrument: 1,
      startTime: startInputs[i],
      endTime: endInputs[i],
      pitch: inputPitches[i],
      velocity: 100,
      isDrum: true
    })
  }

}

function playTempSequence(pitch, inputTime) {
  TEMPORARY_INPUT = {
  ticksPerQuarter: 220,
  totalTime: 0.005,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {startTime: 0, endTime: 0.005, pitch: pitch, velocity: 100, isDrum: true}, {
    instrument: 1,
    startTime: 0,
    endTime: 0.005,
    pitch: pitch,
    velocity: 100,
    isDrum: true}
  ]
  }
  tempPlayer = new mm.Player();
  tempPlayer.start(TEMPORARY_INPUT);
}

function createSamplePlayers() {
  // A plain NoteSequence player
  player = new mm.Player();

}

function createGeneratedSample(ns) {
  // A plain NoteSequence player
  // activeScene.allowInput = false;
  rnnPlayer.stop();
  player2 = new mm.Player();

  rnnPlayer.start(ns);
  // rnnPlayer.scheduledStop(10);
  // if(rnnPlayer.getPlayState() == "started") {activeScene.allowInput = false; console.log("noInput");}
  // else if (rnnPlayer.getPlayState() == "stopped") {
  // activeScene.allowInput = true; console.log("yay input");}
  // setTimeout(function(){ rnnPlayer.stop() }, 1000);
  // console.log(rnnPlayer.getPlayState());
}

function download() {

    saveAs(new File([mm.sequenceProtoToMidi(generatedSequence)], 'gns.mid'));

}


let rnn_steps = 30;
let rnn_temperature = 1.5;

function setupDrumsRNN() {
  // Initialize model
  drums_rnn = new mm.MusicRNN(checkpointURL);
  console.log(drums_rnn);
  drums_rnn.initialize();
  console.log(drums_rnn);

  // Create a player to play the sampled sequence.
  rnnPlayer = new mm.Player();
  console.log("done");
}

async function playRNN() {
  // activeScene.allowInput = false;
  // rnnPlayer.stop();
  console.log(DRUMS_INPUT);
  // The model expects a quantized sequence
  const qns = mm.sequences.quantizeNoteSequence(DRUMS_INPUT, 4);
  const gns = await drums_rnn.continueSequence(qns, rnn_steps, rnn_temperature);
  generatedSequence = gns;

  console.log(gns);
  createGeneratedSample(gns);
  viz2 = new mm.Visualizer(gns, document.getElementById('canvas'));

}
