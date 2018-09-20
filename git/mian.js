let command = [
  `git commit -m ""`,
  `git branch`,
  `git checkout`,
  `git merge`,
  `clear`
];

let target;
document.getElementById("console").addEventListener("click", function(e) {
  target = document.querySelector("#command").firstElementChild;
  window.addEventListener("keypress", addSymbol);
  window.addEventListener("keydown", addString);
});

document.getElementById("branch").addEventListener("click", function(e) {
  window.removeEventListener("keypress", addSymbol);
  window.removeEventListener("keydown", addString);
  target = e.target;
});

document.getElementById("result").addEventListener("click", function(e) {
  window.removeEventListener("keypress", addSymbol);
  window.removeEventListener("keydown", addString);
  target = null;
});

//FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION////FUNCTION//
function addSymbol(e) {
  if (e.keyCode == 32) {
    target.innerHTML += `&nbsp;`;
  } else if (
    e.keyCode !== 13 &&
    document.querySelector("#command").firstElementChild === target
  ) {
    target.innerHTML += e.key;
  }
}
function addString(e) {
  if (target) {
    if (e.keyCode === 8) {
      if (target.textContent.length > 2) {
        target.textContent = target.textContent.slice(
          0,
          target.textContent.length - 1
        );
      }
    } else if (e.keyCode === 13) {
      target.innerHTML = target.innerHTML.slice(
        target.innerHTML.indexOf("$&nbsp;") + 1,
        target.innerHTML.length - 1
      );
      document.getElementById("history").innerHTML += `<div>${
        target.innerHTML
      }</div>`;

      target.innerHTML = "$&nbsp;";
    }
  }
}
