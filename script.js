// ---------- Settings ----------
const exampleKey = "a";
const sadKey = "s";

let melody = [
  "C4",
  "C4",
  "G4",
  "G4",
  "A4",
  "A4",
  "G4",
  "F4",
  "F4",
  "E4",
  "E4",
  "D4",
  "D4",
  "C4",
]; // (as0477 Johan)

// ---------- State ----------

let vibrato = 0.0;
//(at0162)
let frequencyMultiplier = 1; // the multiplier for the frequency of the note, which can be changed by the player

let notesToLower = [4, 5, 9, 10]; // (as8164) a separate array with selected notes from testMelody to lower.

// (as8164) A function to make a selected note lower by a semitone - we'll need this to transpose some notes in a scale to make it sound sad.
function lowerHalfStep(note) {
  return Tone.Frequency(note).transpose(-1).toNote();
}

// (as8164)
// The following runs through the melody array and checks if the item position corresponds to the position from "notesToLower" array.
// If it does, it transposes it down by a semitone and pushes it to a new array "sadMelody"; if it doesn't, it pushes the original note.
// In that way we have a sad copy without messing with the OG melody.
function makeSad(melody) {
  const sadMelody = [];
  for (let i = 0; i < melody.length; i++) {
    if (notesToLower.includes(i)) {
      sadMelody.push(lowerHalfStep(melody[i]));
    } else {
      sadMelody.push(melody[i]);
    }
  }
  return sadMelody;
}

// ---------- Sound ----------

const synth = new Tone.PolySynth(Tone.Synth);

let vibratoEffect = new Tone.Vibrato(3, vibrato); //Isabella
synth.chain(vibratoEffect, Tone.Destination); //Isabella

//(at0162)
function raiseFrequency() {
  frequencyMultiplier *= 2;

  if (frequencyMultiplier > 4) {
    frequencyMultiplier = 1;
    console.log(`Frequency multiplier is ${frequencyMultiplier}`);
  }
}

//(at0162)
function lowerFrequency() {
  frequencyMultiplier /= 2;
  if (frequencyMultiplier < 0.25) {
    frequencyMultiplier = 4;
    console.log("Frequency multiplier reset to 4.");
  }
}

// ---------- Update ----------
function update() {
  setTimeout(update, 100);
}

// ---------- Use ----------

function use() {
  setTimeout(use, 100);
}

// ---------- Controls (Event Handlers) ----------

// (as0477 Johan)
function playMelody(melody) {
  // Defines a function that takes the melody from the arrays in let melody.
  const start = Tone.now() + 0.1; // adds a slight buffer when a keynote is pressed
  for (let i = 0; i < melody.length; i++) {
    // goes through the notes in the melody
    time = start + i * 0.4; // creates a rhytm so there 0.4 seconds between every note

    if (i >= 7) {
      time = time + 0.6; // creates a paus between note 7 and 8 for 1 second indicates the start the second melody
    }
    //(at0162)
    const notebasefrequency = Tone.Frequency(melody[i]).toFrequency();
    const newFrequency = notebasefrequency * frequencyMultiplier;
    const final_frequency = Tone.Frequency(newFrequency).toNote();

    synth.triggerAttackRelease(final_frequency, "8n", time);
  }
}

function keyDown(event) {
  Tone.start();

  if (event.repeat === false) {
    //console.log("Key down:", event.key);
    //(at0162)
    if (event.key === "ArrowUp") {
      raiseFrequency();
      console.log("ArrowUp pressed");
    }
    //(at0162)
    if (event.key === "ArrowDown") {
      lowerFrequency();
      console.log("ArrowDown pressed");
    }
    // (as0477 Johan)
    if (event.key === exampleKey) {
      playMelody(melody);
      console.log(exampleKey);
    }
    //Isabella
    if (event.key === "v") {
      vibratoEffect.depth.value = 0.5;
    }
    // (as8164)
    if (event.key === sadKey) {
      playMelody(makeSad(melody));
    }
  }
}

function keyUp(event) {
  //console.log("Key up:", event.key);

  if (event.key === exampleKey) {
    synth.triggerRelease(melody, Tone.now());
  }
  //Isabella
  if (event.key === "v") {
    vibrato = 0.0;
    vibratoEffect.depth.value = 0;
    console.log(" vibrato stops");
  }
}

// ---------- Setup ----------

function setup() {
  update(); // start the update loop
  use(); // start the use loop
  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
