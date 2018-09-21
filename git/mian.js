let command = [
  `$&nbsp;git&nbsp;commit&nbsp;-m&nbsp;"`,
  `$&nbsp;git&nbsp;branch`,
  `$&nbsp;git&nbsp;checkout`,
  `$&nbsp;git&nbsp;merge`,
  `$&nbsp;clear`
];

let outputC = [
  `добавлен commit "`,
  `добавлена branch "`,
  `выполнен checkout "`,
  `выполнен merge "`
];

let buffer;
let branch = {};
let counterB = 0;
let target = null;
let targetB = null;

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
      output(command, outputC);
      if (target.innerHTML.indexOf(command[0]) >= 0) {
        addCommit();
      } else if (target.innerHTML.indexOf(command[1]) >= 0) {
        addBrach(buffer);
      } else if (target.innerHTML.indexOf(command[2]) >= 0) {
        checkout();
      }
      target.innerHTML = target.innerHTML.slice(
        target.innerHTML.indexOf("$&nbsp;") + 1,
        target.innerHTML.length
      );
      document.getElementById("history").innerHTML += `<div>${
        target.innerHTML
      }</div>`;
      target.innerHTML = "$&nbsp;";
    }
  }
}

function output(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (target.innerHTML.indexOf(arr1[i]) >= 0) {
      if (i === 0) {
        buffer = target.innerHTML.slice(
          arr(target.innerHTML, arr1[i]) + 1 - "&nbsp;".length,
          target.innerHTML.length - 1
        );
      } else {
        buffer = target.innerHTML.slice(arr(target.innerHTML, arr1[i]) + 1);
      }
      document.querySelector("#result").innerHTML += `<div>${arr2[i] +
        buffer}"</div>`;
      break;
    }
  }
}

function arr(arr, index) {
  let str = "";
  for (let i = 0; i < arr.length; ++i) {
    str += arr[i];
    if (str === index) {
      return i + "&nbsp;".length;
    }
  }
}

function addCommit() {
  let div;
  if (targetB.childElementCount !== 0) {
    div = document.createElement("div");
    div.style.cssText += `
    background-color:${targetB.getAttribute("background-color")};
    `;
    targetB.appendChild(div);
  }
  div = document.createElement("div");
  div.style.cssText += `
  background-color: ${targetB.getAttribute("background-color")};
  `;
  targetB.appendChild(div);
  branch[targetB.getAttribute("name")].commit++;
}

////////////////////////////////////////////////////////////
let coordinates = [];
function addBrach(name) {
  let y;
  let x;
  let color = function() {
    return parseInt(Math.random() * 200);
  };
  let div = document.createElement("div");
  div.setAttribute("name", name);
  div.setAttribute("background-color", `rgb(${color()},${color()},${color()})`);
  div.style.cssText += `
      top: 0px;
      left: 0px;
    `;
  if (targetB && targetB.lastElementChild) {
    y = parseFloat(targetB.style.top);
    x = parseFloat(targetB.lastElementChild.getBoundingClientRect().x);
    coordinates[0] = targetB.lastElementChild.getBoundingClientRect();
    div.style.cssText += `
      top: ${(y + 30) * counterB}px;
      left: ${x + 30}px;
    `;
    branch[targetB.getAttribute("name")].branch++;
  }
  branch[name] = {
    name: name,
    commit: 0,
    branch: 1
  };
  document.querySelector("#branch").appendChild(div);
  counterB++;
  if (document.querySelector("#branch").lastElementChild.lastElementChild) {
    debugger;
    coordinates[1] = document
      .querySelector("#branch")
      .lastElementChild.lastElementChild.getBoundingClientRect();
    let x1 = coordinates[0].x;
    let y1 = coordinates[0].y;
    let x2 = coordinates[1].x;
    let y2 = coordinates[1].y;
  }
}

function checkout() {
  targetB = document.querySelector(`[name=${buffer}]`);
}

// document.body.getBoundingClientRect
