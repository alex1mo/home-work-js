var nums = [];
var itemBuffer = [];

function rand() {
  return 100 + parseInt(Math.random() * 100);
}

for (var i = 0; i < 5; i++) {
  var div = document.createElement("div");
  var buffer = rand();
  nums.push(buffer);
  div.innerHTML = buffer;
  div.style.height = `${buffer}px`;
  document.querySelector("section").appendChild(div);
  div.addEventListener("click", function(e) {
    e.target.classList.add("change");
    itemBuffer.push(e.target);
    // if (itemBuffer.length > 2) {
    //   var item = itemBuffer.shift();
    //   item.classList.remove("change");
    // }
    if (itemBuffer.length === 2) {
      var bufferHTML = itemBuffer[0].innerHTML;
      var first = nums.indexOf(parseInt(itemBuffer[0].innerHTML));
      var second = nums.indexOf(parseInt(itemBuffer[1].innerHTML));
      nums.splice(first, 1, parseInt(itemBuffer[1].innerHTML));
      nums.splice(second, 1, parseInt(itemBuffer[0].innerHTML));

      itemBuffer[0].innerHTML = itemBuffer[1].innerHTML;
      itemBuffer[0].style.height = itemBuffer[1].style.height;

      itemBuffer[1].innerHTML = bufferHTML;
      itemBuffer[1].style.height = bufferHTML + "px";

      itemBuffer[0].classList.remove("change");
      itemBuffer[1].classList.remove("change");
      itemBuffer = [];
    }
    if (
      nums.join() === sortNums[0].join() ||
      nums.join() === sortNums[1].join()
    ) {
      setTimeout(() => {
        alert("YOU WIN");
        location.reload();
      }, 25);
    }
  });
}

// document.querySelector("button").addEventListener("click", function() {
//   if (itemBuffer.length === 2) {
//     var bufferHTML = itemBuffer[0].innerHTML;

//     itemBuffer[0].innerHTML = itemBuffer[1].innerHTML;
//     itemBuffer[0].style.height = itemBuffer[1].style.height;

//     itemBuffer[1].innerHTML = bufferHTML;
//     itemBuffer[1].style.height = bufferHTML + "px";

//     itemBuffer[0].classList.remove("change");
//     itemBuffer[1].classList.remove("change");
//     itemBuffer = [];
//   }
// });

var sortNums = [[...nums], []];
sortNums[0].sort((a, b) => {
  return a - b;
});
sortNums[1] = [...sortNums[0]];
sortNums[0].reverse();
