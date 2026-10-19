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
const testKey = "s";
const testMelody = ["C4", "D4", "E4", "A4", "G4", "B4", "D4", "C4"];


// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.

// (Ieva) I write code here:

// (Ieva) If we have a melody as an array, we need a way to pull specific notes from the melody to transpose them, to make the melody sound sad.


let notesToLower = [2, 3, 5]; // a separate array with selected notes from testMelody to lower.

// The following should play any melody.
function playTestMelody(melody) {
for (let i = 0; i < melody.length; i++) {
console.log("pass " + i + ": " + melody[i]);
synth.triggerAttackRelease(melody[i], "8n", Tone.now() + i * 0.4);
  }
}
// Here's a function to make a selected note lower by a semitone - we'll need this to transpose some notes in a scale to make it sound sad.
function lowerHalfStep(note) {
 return Tone.Frequency(note).transpose(-1).toNote();
}


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
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  setTimeout(use, 100); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);

    // Example: replace this with your own instrument.

    if (event.key === exampleKey) {
     playTestMelody(testMelody); // keeps sounding until triggerRelease
    }

if (event.key === testKey) {
    playTestMelody(makeSad(testMelody));
  }
}
}

  // Example: replace this with your own instrument.


// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);

}

setup(); // Always remember to call setup()!

