

const checkpointURL = "model";
console.log(checkpointURL);
let drums_rnn = mm.MusicRNN(checkpointURL);
console.log(drums_rnn);
let DRUMS_INPUT;
let player, player2, viz, vis2, vizPLayer, vizPLayer2;
let music_rnn, rnnPlayer;
createSampleSequences();
createSamplePlayers();
setupDrumsRNN();


// player = new mm.Player();

function createSampleSequences() {
  DRUMS_INPUT = {
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  notes: [
    {startTime: 0, endTime: 0.5, pitch: 40, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 0.5,
      endTime: 1.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    },
    {startTime: 1.0, endTime: 1.5, pitch: 35, velocity: 100, isDrum: true}, {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 39,
      velocity: 100,
      isDrum: true
    },
    {
      instrument: 0,
      startTime: 1.5,
      endTime: 2.0,
      pitch: 43,
      velocity: 100,
      isDrum: true
    }
  ]
}
}

function createSamplePlayers() {
  // A plain NoteSequence player
  player = new mm.Player();

  // A Visualizer
  config = {
  noteHeight: 12,
  pixelsPerTimeStep: 30,  // like a note width
  noteSpacing: 50,
  noteRGB: '8, 41, 64',
  activeNoteRGB: '250, 190, 0',
}

  // viz = new mm.Visualizer(DRUMS_INPUT, document.getElementById('canvas'), config);

  // This player calls back two functions:
  // - run, after a note is played. This is where we update the visualizer.
  // - stop, when it is done playing the note sequence.
  // vizPlayer = new mm.Player(false, {
  //   run: (note) => viz.redraw(note),
  //   stop: () => {}
  // });
}

function createGeneratedSample(ns) {
  // A plain NoteSequence player
  player2 = new mm.Player();

  // A Visualizer
//   config = {
//   noteHeight: 12,
//   pixelsPerTimeStep: 60,  // like a note width
//   noteSpacing: 1,
//   noteRGB: '8, 41, 64',
//   activeNoteRGB: '240, 84, 119',
// }

  viz2 = new mm.Visualizer(ns, document.getElementById('canvas2'), config);

  // This player calls back two functions:
  // - run, after a note is played. This is where we update the visualizer.
  // - stop, when it is done playing the note sequence.
  vizPlayer2 = new mm.Player(false, {
    run: (note) => viz.redraw(note),
    stop: () => {}
  });
  rnnPlayer.start(ns);
}


var rnn_steps = 15;
var rnn_temperature = 1.2;

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

async function playRNN(event) {
  console.log(DRUMS_INPUT);
  // if (rnnPlayer.isPlaying()) {
  //   rnnPlayer.stop();
  //   event.target.textContent = 'Play';
  //   return;
  // } else {
  //   event.target.textContent = 'Stop';
  // }

  // The model expects a quantized sequence
  const qns = mm.sequences.quantizeNoteSequence(DRUMS_INPUT, 4);
  const gns = await drums_rnn.continueSequence(qns, rnn_steps, rnn_temperature);

  console.log(gns);
  createGeneratedSample(gns);
  // .then((sample) => rnnPlayer.start(sample))
  // .then(console.log(sample));

  // console.log(gns.toNoteSequence());
  // writeNoteSeqs('drums-cont-results', [gns]);
  // player2 = new mm.Player();
  // console.log(gns);
  // console.log(mm.sequences.isQuantizedSequence(gns));

  // A Visualizer

  // viz2 = new mm.Visualizer(gns, document.getElementById('canvas2'));

  // This player calls back two functions:
  // - run, after a note is played. This is where we update the visualizer.
  // - stop, when it is done playing the note sequence.
  // vizPlayer2 = new mm.Player(false, {
  //   run: (note) => viz2.redraw(note),
  //   stop: () => {}
  // });

}



function startOrStop(event, p, seq) {
  if (p.isPlaying()) {
    p.stop();
    event.target.textContent = 'Play';
  } else {
    p.start(seq).then(() => {
      // Stop all buttons.
      const btns = document.querySelectorAll('.controls > button');
      for (let btn of btns) {
        btn.textContent = 'Play';
      }
    });
    event.target.textContent = 'Stop';
  }
}

// function play() {
//   console.log("playing input");
//   player.start(DRUMS_INPUT);
//   // player.stop();
// }
