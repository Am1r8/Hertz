const synth = new Tone.Synth().toDestination();
var pad = document.getElementById('pad');
var label = document.getElementById('label');
var dragging = false;

function getBackgroundColor(x){
  if (dragging) {
    let fraction = x/window.innerWidth;
    return "hsl("+(fraction*360)+", 100%, 50%)";
  }
  else return "#222";
}

function getLabelColor(x){
  if (dragging) {
    let fraction = x/window.innerWidth;
    return "hsl("+(fraction*360+180)+", 100%, 50%)";
  }
  else return "white";
}

function down(event) {
  dragging = true;
  var x = event.pageX;
  synth.triggerAttack(x);
  label.innerHTML = Math.round(x) + 'Hz';
  label.style.color = getLabelColor(x);
  pad.style.background = getBackgroundColor(x);
}
function up(event) {
  dragging = false;
  synth.triggerRelease();
  label.innerHTML = 'CLICK / DRAG';
  label.style.color = getLabelColor();
  pad.style.background = getBackgroundColor();
}
function move(event) {
  if (dragging) {
    var x = event.pageX;
    synth.setNote(x);
    label.innerHTML = Math.round(x) + 'Hz';
    label.style.color = getLabelColor(x);
    pad.style.background = getBackgroundColor(x);
  }
}

pad.addEventListener('pointerdown', down);
pad.addEventListener('pointerup', up);
pad.addEventListener('pointermove', move);