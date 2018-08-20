// собирает строку из  массива по разделителю
function _join(arr, s) {
  // arr - масиив, s - разделитель
  var buf = "";
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr) && s) {
      buf += i !== arr.length - 1 ? "" + arr[i] + s : "" + arr[i];
    } else if (Array.isArray(arr)) {
      buf += i !== arr.length - 1 ? "" + arr[i] + "," : "" + arr[i];
    }
  }
  if (buf) {
    return buf;
  }
}

// собирает массив из строки по разделителю
function _split(str, s) {
  // str -стрка s - по разделителю
  var arr = [];
  if (!s || str.indexOf(s) === -1) {
    arr[0] = str;
    return arr;
  }
  s = "" + s;
  var i = 0;
  while (true) {
    var index = str.indexOf(s);
    if (index !== -1) {
      arr[i] = str.slice(0, index);
      str = str.slice(index + 1);
      i++;
    } else {
      str[i] = str;
      break;
    }
  }
  return arr;
}

// возращает копию массива от .. до ... не включая конец
function _slice(arr, start, end) {
  if (!end) {
    end = arr.length;
  }
  var newArr = [];
  for (var i = start; i < end; i++) {
    newArr.push(arr[i]);
    //newArr[newArr.length] = arr[i];
  }
  return newArr;
}

//метод сортировки числового массива , сортировка задается через функцию  (a>b или a<b)

function _sort(arr, cb) {
  for (var i = 0; i < arr.length; i++) {
    if (cb(arr[i], arr[i + 1])) {
      arr[i] = arr[i] + arr[i + 1];
      arr[i + 1] = arr[i] - arr[i + 1];
      arr[i] = arr[i] - arr[i + 1];
      for (var j = i; j > 0; j--) {
        if (!cb(arr[j], arr[j - 1])) {
          arr[j] = arr[j] + arr[j - 1];
          arr[j - 1] = arr[j] - arr[j - 1];
          arr[j] = arr[j] - arr[j - 1];
        }
      }
    }
  }
}

//перезаписуют массив в обратном порядке
function _reverse(arr) {
  var newArr = [...arr];
  newArr.forEach(function(e, i, newArr) {
    arr[i] = newArr[newArr.length - 1 - i];
  });
}

//соединяет массивы в один
function _contact() {
  var arrAll = [];
  for (var i = 0; i < arguments.length; i++) {
    for (j = 0; j < arguments[i].length; j++) {
      arrAll.push(arguments[i][j]);
    }
  }
  return arrAll;
}

//перебирает массив и создает новый масив из результат вызова callback функции
function _map(arr, cb) {
  var newArr = [];
  for (j = 0; j < arr.length; j++) {
    var e = arr[j];
    var i = j;
    newArr.push(cb(e, i, arr));
  }
  return newArr;
}

//проверяет массив и возращает true если все елементы возращат true результата вызова callback function
function _every(arr, cb) {
  for (j = 0; j < arr.length; j++) {
    var e = arr[j];
    if (!cb(e)) {
      return false;
    }
  }
  return true;
}

//проверяет массив и возращает true если хоть один елемент массива  возращат true результата вызова callback function.
var arr = [1, 2, 1, 2, 3, 10];
var arr2 = ["my", "first", "function", "contact"];

function _some(arr, cb) {
  for (j = 0; j < arr.length; j++) {
    var e = arr[j];
    if (cb(e)) {
      return true;
    }
  }
  return false;
}

console.log(
  _some(arr, function(e) {
    return e === 1;
  })
);
