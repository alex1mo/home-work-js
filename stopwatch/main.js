let pointer = document.getElementById("clock").firstElementChild;

let rotate = document.getElementById("control").children[0].firstElementChild;
let seconds = document.getElementById("control").children[1].firstElementChild;

let start = document.getElementById("control").children[2];
let stop = document.getElementById("control").children[3];

let iRotate;
let iSeconds;
let iNextRotate;
let timerEnd = 0;

start.addEventListener("click", e => {
  if (timerEnd == 0) {
    start.firstElementChild.style.background = "red";
    let i = 0;
    startClock();
    iRotate = setInterval(() => {
      rotate.textContent = ++i;
      startClock();
    }, 1000 * 60);
  }
});
///////////////////////////////
let reset = 0;
stop.addEventListener("click", e => {
  reset++;
  if (reset === 2) {
    stopClock();
    rotate.textContent = 0;
    timerEnd = 0;
    seconds.textContent = timerEnd;
    stop.firstElementChild.removeAttribute("style");
  } else {
    stop.firstElementChild.style.background = "red";
    stopClock();
    pointer.style.transform = `rotate(${timerEnd / (60 / 360)}deg)`;
  }

  setTimeout(() => {
    reset = 0;
  }, 500);

  start.firstElementChild.removeAttribute("style");
  clearInterval(iNextRotate);
  clearInterval(iRotate);
});

function startClock() {
  let timer = Date.now();
  pointer.classList.remove("stop");
  pointer.classList.add("active");
  iSeconds = setInterval(() => {
    timerEnd = (Date.now() - timer) / 1000;
    timerEnd = timerEnd.toFixed(3);
    seconds.textContent = timerEnd;
  }, 25);
  iNextRotate = setTimeout(() => {
    stopClock();
  }, 1000 * 60 - 25);
}

function stopClock() {
  clearInterval(iSeconds);
  pointer.removeAttribute("style");
  pointer.classList.remove("active");
  pointer.classList.add("stop");
}
