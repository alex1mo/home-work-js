var boxes = {
  height: parseFloat(getComputedStyle(document.querySelector("#boxes")).height)
};

if (localStorage.getItem("players")) {
  var players = JSON.parse(localStorage.getItem("players"));
} else {
  var players = {};
}

var body = {
  tag: document.body,
  height: parseFloat(getComputedStyle(document.body).height),
  width: parseFloat(getComputedStyle(document.body).width)
};

var box_r = {
  tag: document.querySelector("#boxes div:first-child"),
  information: document
    .querySelector("#boxes div:first-child")
    .getBoundingClientRect(),
  color: getComputedStyle(document.querySelector("#boxes div:first-child"))
    .backgroundColor,
  sum: 0
};
var box_g = {
  tag: document.querySelector("#boxes div:nth-child(2)"),
  information: document
    .querySelector("#boxes div:nth-child(2)")
    .getBoundingClientRect(),
  color: getComputedStyle(document.querySelector("#boxes div:nth-child(2)"))
    .backgroundColor,
  sum: 0
};
var box_b = {
  tag: document.querySelector("#boxes div:last-child"),
  information: document
    .querySelector("#boxes div:last-child")
    .getBoundingClientRect(),
  color: getComputedStyle(document.querySelector("#boxes div:last-child"))
    .backgroundColor,
  sum: 0
};

var timer = {
  tag: document.querySelector("#timer"),
  time: 60,
  addBalls: 0,
  resetColor: 2
};

var ball = {
  tag: null,
  width: body.width / 20,
  information: null,
  color: null,
  count: 0,
  numberBall: 1
};

var color = ["red", "green", "blue"];
var resetColor;
var seconds;
var minute;
var t;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function start() {
  randomBalls(13);
  resetBall();
  seconds = setInterval(() => {
    timer.time--;
    timer.tag.textContent = timer.time;
  }, 1000);
  minute = setTimeout(() => {
    clearInterval(seconds);
    clearInterval(resetColor);
    clearTimeout(t);
    while (true) {
      if (document.querySelector("[ball]")) {
        document
          .querySelector("#balls")
          .removeChild(document.querySelector("[ball]"));
        continue;
      }
      break;
    }
    let html = `<span>Ваше имя</span><input type="text"><div><button>OK</button><button>CANCEL</button></div>`;
    let div = document.createElement("div");
    div.classList.add("window");
    div.innerHTML += html;
    body.tag.style.boxShadow = `inset 0px 0px 10px 100vw rgba(0,0,0,0.6)`;
    body.tag.appendChild(div);
    var userName = "";

    document
      .querySelector(".window")
      .firstElementChild.nextElementSibling.addEventListener("change", function(
        e
      ) {
        userName = this.value;
      });

    document
      .querySelector(".window")
      .lastElementChild.firstElementChild.addEventListener("click", function(
        e
      ) {
        if (userName) {
          players[userName] = {
            red: box_r.sum,
            green: box_b.sum,
            blue: box_g.sum,
            sum: box_r.sum + box_g.sum + box_b.sum
          };
          let local = JSON.stringify(players);
          localStorage.setItem("players", local);
          document.body.removeChild(document.querySelector(".window"));
        }
      });

    document
      .querySelector(".window")
      .lastElementChild.lastElementChild.addEventListener("click", function(e) {
        document.body.removeChild(document.querySelector(".window"));
      });
  }, 1000 * 60);
}
start();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var oX;
var oY;

window.addEventListener("mousedown", function(e) {
  if (e.target.hasAttribute("ball")) {
    ball.tag = e.target;
    ball.tag.setAttribute("ball", "active");
    ball.color = getComputedStyle(ball.tag).backgroundColor;
    oX = e.clientX - ball.tag.getBoundingClientRect().x;
    oY = e.clientY - ball.tag.getBoundingClientRect().y;
  }
});

window.addEventListener("mousemove", function(e) {
  if (ball.tag) {
    ball.information = ball.tag.getBoundingClientRect();
    ball.tag.style.left = e.clientX - oX + "px";
    ball.tag.style.top = e.clientY - oY + "px";
  }
});

window.addEventListener("mouseup", function(e) {
  if (ball.tag) {
    if (
      crash(box_r.information, ball.information) &&
      box_r.color === ball.color
    ) {
      animation(ball);
    } else if (
      crash(box_g.information, ball.information) &&
      box_g.color === ball.color
    ) {
      animation(ball);
    } else if (
      crash(box_b.information, ball.information) &&
      box_b.color === ball.color
    ) {
      animation(ball);
    }
    ball.tag = null;
  }
});

window.document.querySelector("#start").addEventListener("click", function(e) {
  clearInterval(seconds);
  clearInterval(resetColor);
  clearTimeout(minute);
  clearTimeout(t);
  while (true) {
    if (document.querySelector("[ball]")) {
      document
        .querySelector("#balls")
        .removeChild(document.querySelector("[ball]"));
      continue;
    }
    break;
  }
  timer.time = 60;
  timer.tag.textContent = timer.time;
  box_r.sum = 0;
  box_r.tag.textContent = box_r.sum;
  box_g.sum = 0;
  box_g.tag.textContent = box_g.sum;
  box_b.sum = 0;
  box_b.tag.textContent = box_b.sum;
  body.tag.removeAttribute("style");
  if (document.querySelector(".window")) {
    document.body.removeChild(document.querySelector(".window"));
  }
  start();
});

//submit
//................FUNCTION......................///////////////////////////////////////////////////////////

function randomBalls(v) {
  //создает определенное количетсво шаров на поле
  if (v) {
    var div = document.createElement("div");
    div.setAttribute("ball", "negative");
    div.classList.add(color[parseInt(Math.random() * 3)]);
    div.style.top =
      boxes.height +
      parseFloat(Math.random() * (body.height - boxes.height - ball.width)) +
      "px";
    div.style.left =
      parseFloat(Math.random() * (body.width - ball.width)) + "px";
    balls.appendChild(div);
    ball.count++;
    return randomBalls(--v);
  }
}

function crash(obj1, obj2) {
  //точка косания шара и коробки
  var XColl = false;
  var YColl = false;

  if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width)
    XColl = true;
  if (obj1.y + obj1.height >= obj2.y && obj1.y <= obj2.y + obj2.height)
    YColl = true;
  if (XColl & YColl) {
    return true;
  }
  return false;
}

function animation(ball) {
  //анимация шаров
  var box;
  if (ball.color === box_r.color) {
    box = box_r;
  } else if (ball.color === box_g.color) {
    box = box_g;
  } else if (ball.color === box_b.color) {
    box = box_b;
  }
  ball.tag.style.top = box.information.y + box.information.height / 2 + "px";
  ball.tag.style.left = box.information.x + box.information.width / 2 + "px";
  ball.tag.classList.add("animation");
  ball.tag.setAttribute("ball", ball.numberBall++);
  if (ball.numberBall > 3) {
    deleteBall();
  }
  ball.tag = null;
  box.sum++;
  box.tag.firstElementChild.textContent = box.sum;
  addBalls();
}

function addBalls() {
  //добовляет допольнительные шары
  timer.addBalls++;
  t = setTimeout(function() {
    timer.addBalls = 0;
    ball.numberBall = 1;
    while (true) {
      if (document.querySelector(".animation")) {
        document
          .querySelector("#balls")
          .removeChild(document.querySelector(".animation"));
        continue;
      }
      break;
    }
  }, 1000 * 5);
  if (timer.addBalls === 2) {
    timer.addBalls = 0;
    randomBalls(3);
    clearTimeout(t);
  }
}

function deleteBall() {
  //удаляет выкинутые шарики
  document
    .querySelector("#balls")
    .removeChild(document.querySelector(`[ball = "1"]`));
  document.querySelector(`[ball="2"]`).setAttribute("ball", "1");
  document.querySelector(`[ball="3"]`).setAttribute("ball", "2");
  ball.numberBall--;
}

function resetBall() {
  // меняте цвет
  resetColor = setInterval(function() {
    let i = 0;
    let balls = document.querySelector("#balls").children;
    while (true) {
      if (document.querySelector(`[ball="negative"]`)) {
        document
          .querySelector("#balls")
          .removeChild(document.querySelector(`[ball="negative"]`));
        i++;
        continue;
      }
      break;
    }
    randomBalls(i);
  }, 1000);
}

///
