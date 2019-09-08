import scale from './scale.js';

let isMute = false;
const topPositionHz = scale.c4;

const AudioContext = window.AudioContext || window.webkitAudioContext,

ctx = new AudioContext();
const gainNode = ctx.createGain(); 
const oscillator = ctx.createOscillator();


const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
startButton.addEventListener('click', () => {
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.connect(ctx.destination);
  oscillator.start();
});

stopButton.addEventListener('click', () => {
  oscillator.stop();
})


const betaHelz = document.getElementById('helz'); 
window.addEventListener("deviceorientation", (e) => {
  // change start point function
  const adjustedBeta = Math.round((e.beta + 180))
  const percent = adjustedBeta / 90
  const hz = topPositionHz + (topPositionHz * percent);
  betaHelz.innerHTML = Math.round(hz)
  oscillator.frequency.value = hz;


// note
const note = document.getElementById('note');
    if (258 <= hz && hz <= 264 ) {
      note.innerHTML = "ド"
    } else if (290 <= hz && hz <= 296 ) {
      note.innerHTML = "レ"
    } else if (326 <= hz && hz <= 332 ) {
      note.innerHTML = "ミ"
    } else if (346 <= hz && hz <= 352 ) {
      note.innerHTML = "ファ"
    } else if (328 <= hz && hz <= 394 ) {
      note.innerHTML = "ソ"
    } else if (437 <= hz && hz <= 443 ) {
      note.innerHTML = "ラ"
    } else if (490 <= hz && hz <= 496 ) {
      note.innerHTML = "シ"
    } else if (520 <= hz && hz <= 526 ) {
      note.innerHTML = "ド"
    } else {
      note.innerHTML = "-"
    }
}, true);


// mute
const muteButton = document.getElementById('mute'); 
muteButton.addEventListener('touchstart', () => {
  isMute = true
  gainNode.gain.value = -1;
})
muteButton.addEventListener('touchend', () => {
  isMute = false
  gainNode.gain.value = 1;
})
