/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.
const exampleKey = "a"; // the key that plays the example note
// prettier-ignore
let melody = ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"];
// Johan

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

let frequencyMultiplier = 1; // the multiplier for the frequency of the note, which can be changed by the player

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once
const baseFrequency = Tone.Frequency(exampleNote).toFrequency(); // the frequency of the example note
//const frequency = new Tone.Frequency(exampleNote).transpose(7); // the frequency of the example note, transposed up 7 semitones
//const transposedNote = frequency.toNote(); // returns the note name of the transposed frequency
//Tone.Frequency(transposedNote).harmonize([0, 3, 7]);

function playNote() {
  const newFrequency = baseFrequency * frequencyMultiplier;
  const final_frequency = Tone.Frequency(newFrequency).toNote(); // returns the note name of the transposed frequency
  synth.triggerAttackRelease(final_frequency, "8n");
  console.log("Playing note with frequency:", newFrequency, "Hz");
}

function raiseFrequency() {
  frequencyMultiplier *= 2;
//console.log(`Frequency multiplier is ${frequencyMultiplier}`);

  if (frequencyMultiplier > 4) {
      frequencyMultiplier = 1;
    console.log(`Frequency multiplier is ${frequencyMultiplier}`);
    //console.log("Frequency multiplier reset to 0.25.");
  }
  //playNote();
}
function lowerFrequency() {
  frequencyMultiplier /= 2;
  if (frequencyMultiplier < 0.25) {
      frequencyMultiplier = 4;
    console.log("Frequency multiplier reset to 4.");
  }
  //playNote();
}

//synth.triggerAttackRelease(baseFrequency, "8n"); // plays the transposed note for an eighth note duration



// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.
  //playNote()
  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function playMelody() {
  const start = Tone.now() + 0.1;
  for (let i = 0; i < melody.length; i++) {
    time = start + i * 0.4;

    if (i >= 7) {
      time = time + 0.6;
    }

    synth.triggerAttackRelease(melody[i], "8n", start + time);
  }
} // Johan

function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    //console.log("Key down:", event.key);
      if (event.key === "ArrowUp") {
  raiseFrequency();
  //console.log("ArrowUp pressed");
  }
  if (event.key === "ArrowDown") {
  lowerFrequency();
  //console.log("ArrowDown pressed");
  }
  if (event.key.toLowerCase() === exampleKey) {
  playNote();
  //console.log("Example key pressed");
  }

    // Example: replace this with your own instrument.
    if (event.key === exampleKey) {
      playMelody(); // synth.triggerAttack(exampleNote, Tone.now()); // keeps sounding until triggerRelease
    }

  }
}

// Runs every time a key comes up.
function keyUp(event) {
  //console.log("Key up:", event.key);

  // Example: replace this with your own instrument.
  if (event.key === exampleKey) {
    synth.triggerRelease(exampleNote, Tone.now());
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
