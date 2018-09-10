var user = [];
var computer = [];
var winner = [false];
var win = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

if (!localStorage.getItem("statistic")) {
  var game = {
    game: 0,
    user: 0,
    computer: 0
  };
  statistic = JSON.stringify(game);
  localStorage.setItem("statistic", statistic);
} else if (localStorage.getItem("statistic")) {
  statistic = JSON.parse(localStorage.getItem("statistic"));
  game = statistic;
}

currentItem = document.getElementById("winner");
currentItem.firstElementChild.textContent = `user = ${game.user} = ${parseInt(
  (game.user / game.game) * 100
) || 0}%`;
currentItem.lastElementChild.textContent = `computer = ${
  game.computer
} = ${parseInt((game.computer / game.game) * 100) || 0}%`;

function handler(n) {
  var currentItem = document.querySelector(`[data-n='${n}']`);
  if (currentItem.textContent.length === 0) {
    n < 3
      ? (win[0][n] = true)
      : n >= 3 && n < 6
        ? (win[1][n - 3] = true)
        : (win[2][n - 6] = true);
    currentItem.innerHTML = `<span>+</span>`;
    user.push(n);
    winner[0] = _winner(win);
    winner[1] = "user";
    if (user.length < 5 && !winner[0]) {
      var comp = comp(n);
      comp < 3
        ? (win[0][comp] = false)
        : comp >= 3 && comp < 6
          ? (win[1][comp - 3] = false)
          : (win[2][comp - 6] = false);
      currentItem = document.querySelector(`[data-n='${comp}']`);
      currentItem.innerHTML = `<span>0</span>`;
      computer.push(comp);
      winner[0] = _winner(win);
      winner[1] = "computer";
    }
  }

  setTimeout(() => {
    if (winner[0]) {
      game.game++;
      currentItem = document.getElementById("winner");
      if (winner[1] === "user") {
        game.user++;
        currentItem.firstElementChild.textContent = `user = ${game.user}`;
        statistic = JSON.stringify(game);
        localStorage.setItem("statistic", statistic);
      } else if (winner[1] === "computer") {
        game.computer++;
        currentItem.lastElementChild.textContent = `coomputer = ${game.user}`;
        statistic = JSON.stringify(game);
        localStorage.setItem("statistic", statistic);
      }
      winner[1][0] += 1;
      alert(winner[1] + " win");
      var res = confirm("сыграть еще");
      if (res) {
        location.reload();
      } else {
        location.reload();
        alert("пока");
      }
    }
  }, 25);

  function comp(n) {
    var arr = user.concat(computer);
    var random = parseInt(Math.random() * 9);
    if (arr.indexOf(random) >= 0) {
      return comp(n);
    }
    return random;
  }

  function _winner(win) {
    if (win[0][0] === win[0][1] && win[0][1] === win[0][2]) {
      return true;
    } else if (win[1][0] === win[1][1] && win[1][1] === win[1][2]) {
      return true;
    } else if (win[2][0] === win[2][1] && win[2][1] === win[2][2]) {
      return true;
    } else if (win[0][0] === win[1][0] && win[1][0] === win[2][0]) {
      return true;
    } else if (win[0][1] === win[1][1] && win[1][1] === win[2][1]) {
      return true;
    } else if (win[0][2] === win[1][2] && win[1][2] === win[2][2]) {
      return true;
    } else if (win[0][0] === win[1][1] && win[1][1] === win[2][2]) {
      return true;
    } else if (win[0][2] === win[1][1] && win[1][1] === win[2][0]) {
      return true;
    }
  }
  return false;
}

var html = "";
for (var i = 0; i < 9; i++) {
  html += `<div onclick='handler(${i})'data-n='${i}'></div >`;
}
document.querySelector("#root").innerHTML += html;
