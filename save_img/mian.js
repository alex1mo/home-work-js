const SERCH_B = document.querySelector("#add .serch button");
const SERCH_T = document.querySelector("#add .serch input");
const IMG = document.querySelector("#add .serchIMG");
const PAGE = document.querySelectorAll("#settings [name='onPage']")
const LEFT = document.querySelector("#settings .left")
const RIGHT = document.querySelector("#settings .right")
const VIEW = document.getElementById("view")

let url = "https://pixabay.com/api/?key=10255087-ad858ae5e4adfc8ab26a27a9e&image_type=photo";

var arrIMG = localStorage.getItem("img") ? JSON.parse(localStorage.getItem("img")) : [];

if (arrIMG.length > 0) {
  let html = "";
  arrIMG.forEach(e => {
    html += `
  <div>
    <img src="${e}">
  </div>
  `
  });
  VIEW.innerHTML = html;
}

SERCH_B.onclick = function (e) {
  page = 1;
  if (SERCH_T.value) {
    url += `&q=${sub(SERCH_T.value)}`
  }
  var per_page;
  Array.call(PAGE.forEach(e => {
    if (e.checked) {
      per_page = e.value;
      url += `&per_page=${e.value}`
    }
  }))

  serch(url);
}

IMG.addEventListener("click", function (e) {
  if (e.target !== this) {
    if (arrIMG.indexOf(e.target.src) < 0) {
      e.target.style.opacity = "0.3"
      VIEW.innerHTML += `<div><img src="${e.target.src}"><div>`;
      arrIMG.push(e.target.src);
    } else {
      e.target.style.opacity = null;
      VIEW.removeChild(VIEW.querySelector(`[src='${e.target.src}']`).parentElement)
      arrIMG.splice(arrIMG.indexOf(e.target.src), 1)
    }
    localStorage.setItem("img", JSON.stringify(arrIMG))
  }
})

VIEW.onclick = function (e) {
  if (e.target !== this) {
    if (IMG.querySelector(`[src='${e.target.src}']`)) {
      IMG.querySelector(`[src='${e.target.src}']`).style.opacity = null;
    }
    VIEW.removeChild(VIEW.querySelector(`[src='${e.target.src}']`).parentElement)
    arrIMG.splice(arrIMG.indexOf(e.target.src), 1)
    localStorage.setItem("img", JSON.stringify(arrIMG))
  }
}

let page = 1;
let max_page;
RIGHT.addEventListener("click", function (e) {
  let p = url;
  if (page < max_page) {
    p += `&page=${++page}`;
    serch(p)
  }
})

LEFT.addEventListener("click", function (e) {
  let p = url;
  if (page !== 1) {
    p += `&page=${--page}`;
    serch(p)
  }
})



function sub(str) {
  str = str.split(" ");
  str = str.join("+");
  return str;
}

function serch(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      max_page = parseInt(data.totalHits / data.hits.length);
      let html = "";
      data.hits.forEach(e => {
        html += `
      <div>
        <img src="${e.previewURL}">
      </div>
      `
      });
      IMG.innerHTML = html;
      Array.call(IMG.querySelectorAll("img").forEach(i => {
        arrIMG.forEach(j => {
          if (i.src === j) {
            i.style.opacity = "0.3"
          }
        })
      }))
      url = "https://pixabay.com/api/?key=10255087-ad858ae5e4adfc8ab26a27a9e&image_type=photo"
    })
}