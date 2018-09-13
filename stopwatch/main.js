let pointer = document.getElementById("clock").firstElementChild;

let rotate = document.getElementById("control").children[0].firstElementChild;
let seconds = document.getElementById("control").children[1].firstElementChild;

let start = document.getElementById("control").children[2];
let stop = document.getElementById("control").children[3];

let iRotate;
let iSeconds;
let timerEnd;

start.addEventListener("click", e => {
  let i = 0;
  iRotate = setInterval(() => {
    rotate.textContent = ++i;
    startClock();
  }, 1000 * 60 + 25);
  startClock();
});

let reset = 0;
stop.addEventListener("click", e => {
  reset++;
  console.log(reset);
  if (reset > 1) {
    pointer.removeAttribute("style");
    timerEnd = 0;
    seconds.textContent = timerEnd;
    return;
  }
  setTimeout(() => {
    reset = 0;
  }, 500);
  stopClock();
  clearInterval(iRotate);
  clearInterval(iSeconds);
  let deg = timerEnd / (60 / 360);
  pointer.style.transform = `rotate(${deg}deg)`;
});

function startClock() {
  if (timerEnd > 0) {
    return;
  }
  pointer.removeAttribute("style");
  let timer = Date.now();
  pointer.classList.remove("stop");
  pointer.classList.add("active");
  iSeconds = setInterval(() => {
    timerEnd = (Date.now() - timer) / 1000;
    timerEnd = parseFloat(timerEnd.toFixed(3));
    seconds.textContent = timerEnd;
  }, 25);
  setTimeout(() => {
    stopClock();
    timer = Date.now();
  }, 1000 * 60);
}

function stopClock() {
  pointer.classList.remove("active");
  pointer.classList.add("stop");
}
