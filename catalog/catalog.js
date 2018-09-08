var target = document.querySelector("#root");
var childN = 0;
var rootArr = target.textContent.split("\n");
newArr(rootArr);

function selectItem(command) {
  switch (command) {
    case "down":
      var bufferElement = target.children[0];
      if (bufferElement) {
        replace();
        target.parentElement.classList.add("previous");
        target.parentElement.parentElement.classList.remove("previous");
        childN = 0;
      }
      break;
    case "up":
      bufferElement = target.parentElement;
      if (bufferElement && !(target.parentElement === document.body)) {
        replace();
        target.parentElement.classList.add("previous");
        target.classList.remove("previous");
        for (var i = 0; i < target.parentElement.children.length; i++) {
          if (target === target.parentElement.children[i]) {
            childN = i;
            break;
          }
        }
      }
      break;
    case "left":
      childN--;
      bufferElement = target.parentElement.children[childN];
      if (childN >= 0) {
        if (bufferElement && !(target.parentElement === document.body)) {
          replace();
        }
      } else {
        childN++;
      }
      break;
    case "right":
      childN++;
      bufferElement = target.parentElement.children[childN];
      if (childN < target.parentElement.children.length) {
        if (bufferElement) {
          replace();
        }
      } else {
        childN--;
      }
      break;

    case "add":
      for (var i = 0; ; i++) {
        if (rootArr.indexOf(i) < 0) {
          target.innerHTML += `<div>${i}</div>`;
          rootArr[rootArr.length] = i;
          break;
        }
      }
      break;

    case "delete":
      if (target !== document.querySelector("#root")) {
        var arr = target.textContent.split("\n");
        newArr(arr);
        bufferElement = target.parentElement;
        target.remove();
        replace();
        for (var i = 0; i < rootArr.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (rootArr[i] === arr[j]) {
              rootArr.splice(i, 1);
              i--;
              break;
            }
          }
        }
      } else {
        alert("нельзя удалить корневую папку");
      }
      break;
  }

  var j = 0;
  depth(target);
  console.log("в target " + j + " елементов");

  function replace() {
    //перезаписаывает стиль елемента
    target.classList.remove("active");
    target = bufferElement;
    target.classList.add("active");
  }

  function depth(e, index = 0) {
    //считает количество вложеных елементов в target
    if (e === target.parentElement) {
      return (j = j + target.children.length);
    }
    if (e.children[index]) {
      e = e.children[index];
    } else {
      for (var i = 0; i < e.parentElement.children.length; i++) {
        if (e === e.parentElement.children[i]) {
          index = i;
          break;
        }
      }
      e = e.parentElement;
      return depth(e, (index += 1));
    }
    if (e && e.children.length) {
      for (var i = 0; i < e.children.length; i++) {
        j++;
      }
      return depth(e);
    } else {
      e = e.parentElement;
      return depth(e, (index += 1));
    }
  }
}

function newArr(arr) {
  //собирает в массив номера папок
  for (var i = 0; i < arr.length; i++) {
    if (parseInt(arr[i]) === 0 || parseInt(arr[i])) {
      arr[i] = parseInt(arr[i]);
    } else {
      arr.splice(i, 1);
      i--;
    }
  }
}
