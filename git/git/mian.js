let userCommand = "";
let command = [`$ git branch `, `$ git checkout `, `$ git commit -m "`];
let outputC = [
  `создана ветка `,
  `выполнен переход на ветку `,
  `создан коммит `
];
let branchName = [];

document.querySelector("#command").addEventListener("input", function(e) {
  userCommand = this.value;
});

document.querySelector("#command").addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    if (
      comparison(command, userCommand) >= 0 &&
      userCommand.length > command[comparison(command, userCommand)].length &&
      branchName.indexOf(newCommand()) < 0 &&
      command[comparison(command, userCommand)] === command[0]
    ) {
      edditDOM();
      branchName[branchName.length] = newCommand();
      addBranch(branchName[branchName.length - 1]);
    } else if (
      command[comparison(command, userCommand)] === command[1] &&
      branchName.indexOf(newCommand()) >= 0
    ) {
      edditDOM();
      target = checkout(newCommand());
    } else if (command[comparison(command, userCommand)] === command[2]) {
      edditDOM();
      addCommit();
    } else {
      document.querySelector(
        "#history"
      ).innerHTML += `<div>${userCommand} нету такой команды</div>`;
    }

    document.querySelector("#command").value = "$ ";
  }
});

function edditDOM() {
  document.querySelector("#result").innerHTML += `<div>${outputC[
    comparison(command, userCommand)
  ] + newCommand()}</div>`;
  document.querySelector("#history").innerHTML += `<div>${userCommand}</div>`;
}

function comparison(str1, str2) {
  // стравнивает строки
  for (var i = 0; i < str1.length; i++) {
    if (str2.indexOf(str1[i]) >= 0) {
      return i;
    }
  }
  return -1;
}

function newCommand() {
  // записывает команды user в массив
  let str = "";
  for (var i = 0; i < command.length; i++) {
    if (numberStr(userCommand, command[i]) >= 0) {
      str = userCommand.slice(
        numberStr(userCommand, command[i]) + 1,
        (function() {
          if (userCommand[userCommand.length - 1] === `"`) {
            return -1;
          }
        })()
      );
      return str;
    }
  }
}

function numberStr(str, strI) {
  //номер строки с которой начиается команда пользывателя
  let s = "";
  for (let i = 0; i < str.length; ++i) {
    s += str[i];
    if (s === strI) {
      return i;
    }
  }
  return -1;
}

let branch = {};
let pos = ["up", "down", true];
function addBranch(name) {
  var color = function() {
    return parseInt(Math.random() * 200);
  };
  let div = document.createElement("div");
  div.setAttribute("color", `rgb(${color()},${color()},${color()});`);
  div.setAttribute("name", name);
  positionE(pos, div, name);
}

let target = null;
function checkout(name) {
  return document.querySelector(`[name=${name}]`);
}

function addCommit() {
  if (target.childElementCount > 0) {
    let div = document.createElement("div");
    div.setAttribute(
      "style",
      `background-color:${target.getAttribute("color")}`
    );
    target.appendChild(div);
  }
  let div = document.createElement("div");
  div.setAttribute("style", `background-color:${target.getAttribute("color")}`);
  target.appendChild(div);
}

function positionE(pos, div, name) {
  if (pos[2] === true) {
    positionEup(pos, div, name);
  } else {
    positionEdown(pos, div, name);
  }
}

function positionEup(pos, div, name) {
  branch[name] = {
    name: name,
    color: div.getAttribute("color"),
    position: pos[0]
  };
  document.querySelector("#branch").appendChild(div);
  endPosition(div, div.previousElementSibling, branch[name].position);
}

function positionEdown(pos, div, name) {
  branch[name] = {
    name: name,
    color: div.getAttribute("color"),
    position: pos[1]
  };
  document.querySelector("#branch").appendChild(div);
  endPosition(div, div.previousElementSibling, branch[name].position);
}

function endPosition(div, target, pos) {
  debugger;
  var xy1 = div.getBoundingClientRect();
  if (target && pos === "up") {
    var xy2 = target.getBoundingClientRect();
    div.style.left = `${xy2.right + 30}px`;
    div.style.top = `${xy2.top -
      document.querySelector("#branch").getBoundingClientRect().top -
      30}px`;
  } else if (target && pos === "down") {
    var xy2 = target.getBoundingClientRect();
    div.style.left = `${xy2.right + 30}px`;
    div.style.top = `${xy2.top -
      document.querySelector("#branch").getBoundingClientRect().top +
      30}px`;
  }
}
