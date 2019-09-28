import scale from './scale.js';
import io from 'socket.io-client';
import throttle from 'lodash.throttle';

import { backendOrigin } from './config';

const socket = io(backendOrigin);

socket.on("connect", function() {
  console.debug("socket connected");
});

let isMute = true;
const topPositionHz = scale.c4;

const AudioContext = window.AudioContext || window.webkitAudioContext
const ctx = new AudioContext();
const oscillator = ctx.createOscillator();
const gainNode = ctx.createGain(); 
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', () => {
  oscillator.connect(gainNode);
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  oscillator.start();
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
});

stopButton.addEventListener('click', () => {
  oscillator.stop();
  startButton.style.display = 'block';
  stopButton.style.display = 'none';
})

const betaHelz = document.getElementById('helz'); 
window.addEventListener("deviceorientation", (e) => {
  const adjustedBeta = Math.round((e.beta + 180))
  const percent = adjustedBeta / 90
  const hz = topPositionHz + (topPositionHz * percent);
  betaHelz.innerHTML = Math.round(hz)

  if (isMute) return;
  oscillator.frequency.value = hz;
  gainNode.gain.value = e.gamma;

}, true);


window.addEventListener('devicemotion', throttle((e) => {
  if(isMute) return;
  if (5 < e.acceleration.x) {
    socket.emit("shake");
  };
}, 100))

// mute
const muteButton = document.getElementById('mute'); 
muteButton.addEventListener('touchstart', () => {
  socket.emit("audio-start")
  isMute = false
  gainNode.gain.value = 1;
})
muteButton.addEventListener('touchend', () => {
  socket.emit("audio-stop")
  isMute = true
  gainNode.gain.value = 0;
})
