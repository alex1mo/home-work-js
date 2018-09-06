var ball_1 = document.querySelector(".ball_1");
var ball_2 = document.querySelector(".ball_2");

posDown(ball_1);
posLeft(ball_2);

function posDown(e) {
  var random = parseInt(Math.random() * 60 + 20);
  e.style.cssText = `
  top : calc(90% - 25px);
  left: calc(${random}% - 25px);
  `;
  e.setAttribute("pos", 1);
}

function posRight(e) {
  var random = parseInt(Math.random() * 60 + 20);
  e.style.cssText = `
  top : calc(${random}% - 25px);
  left: calc(90% - 25px);
  `;
  e.setAttribute("pos", 2);
}

function posUp(e) {
  var random = parseInt(Math.random() * 60 + 20);
  e.style.cssText = `
  top : calc(10% - 25px);
  left: calc(${random}% - 25px);
  `;
  e.setAttribute("pos", 3);
}

function posLeft(e) {
  var random = parseInt(Math.random() * 60 + 20);
  e.style.cssText = `
  top : calc(${random}% - 25px);
  left: calc(10% - 25px);
  `;
  e.setAttribute("pos", 0);
}

var arrPos = [posDown, posRight, posUp, posLeft];
var arrPosRev = [...arrPos].reverse();

setInterval(function() {
  var step = +ball_1.getAttribute("pos");
  arrPos[step](ball_1);
  arrPosRev[step](ball_2);
  setInterval(() => {
    var ball1 = ball_1.getBoundingClientRect();
    var ball2 = ball_2.getBoundingClientRect();
    var X = crash(ball1, ball2);
    if (X) {
      if (ball2.y >= ball1.y && ball2.x <= ball1.x) {
        ball_2.style.cssText = `
        transition: all 1s linear;
        left : calc(10% - 25px);
        top: calc(90% - 25px)`;
      } else if (ball2.y <= ball1.y && ball2.x >= ball1.x) {
        ball_2.style.cssText = `
        transition: all 1s linear;
        left : calc(90% - 25px);
        top: calc(10% - 25px)`;
      } else if (ball2.y <= ball1.y && ball2.x <= ball1.x) {
        ball_2.style.cssText = `
        transition: all 1s linear;
        left : calc(10% - 25px);
        top: calc(10% - 25px)`;
      } else if (ball2.y >= ball1.y && ball2.x >= ball1.x) {
        ball_2.style.cssText = `
        transition: all 1s linear;
        left : calc(90% - 25px);
        top: calc(90% - 25px)`;
      }
    }
  }, 1);
}, 2000);

function crash(obj1, obj2) {
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
