////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////////ПУЗЫРЬ////
console.log("ожидайте")

function random() {
  return parseInt(-1000 + Math.random() * 2000); // ОТ -1000 ДО 1000
}

var arr1 = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];



for (var i = 0; i < 1000; i++) {
  arr1[i] = [];
  arr2[i] = [];
  arr3[i] = [];
  arr4[i] = [];
  for (var j = 0; j < 1000; j++) {
    var r = random();
    arr1[i].push(r);
    arr2[i].push(r);
    arr3[i].push(r);
    arr4[i].push(r);
  }
}


var t = Date.now();
for (var i = 0; i < allArr.length; i++) {
  BubbleSort(arr1[i]);
}
console.log(("пузырь = " + (Date.now() - t) / 1000) + "s");

function BubbleSort(A) // A - массив, который нужно
{ // отсортировать по возрастанию.
  var n = A.length;
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - 1 - i; j++) {
      if (A[j + 1] < A[j]) {
        var t = A[j + 1];
        A[j + 1] = A[j];
        A[j] = t;
      }
    }
  }
  return A; // На выходе сортированный по возрастанию массив A.
}
/////MERGE/////////MERGE/////////MERGE/////////MERGE/////////MERGE/////////MERGE/////////MERGE/////////MERGE////

var t = Date.now();
for (var i = 0; i < allArr.length; i++) {
  MergeSort(arr2[i]);
}
console.log(("merge = " + (Date.now() - t) / 1000) + "s");

function Merge(
  a,
  low,
  mid,
  high //Вспомогательная функция.
) {
  var b = new Array(high + 1 - low),
    j = mid + 1,
    h = low,
    i = 0;
  while (h <= mid && j <= high) {
    if (a[h] <= a[j]) {
      b[i] = a[h];
      h++;
    } else {
      b[i] = a[j];
      j++;
    }
    i++;
  }
  var k;
  if (h > mid) {
    for (k = j; k <= high; k++) {
      b[i] = a[k];
      i++;
    }
  } else {
    for (k = h; k <= mid; k++) {
      b[i] = a[k];
      i++;
    }
  }
  for (k = 0; k <= high - low; k++) a[k + low] = b[k];
  return a;
}

function MergeSort(
  A //Функция сортировки слиянияем.
) {
  function merge_sort(a, low, high) {
    if (low < high) {
      var mid = Math.floor((low + high) / 2);
      merge_sort(a, low, mid);
      merge_sort(a, mid + 1, high);
      Merge(a, low, mid, high);
    }
  }
  var n = A.length;
  merge_sort(A, 0, n - 1);
  return A;
}

////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////

var t = Date.now();
for (var i = 0; i < allArr.length; i++) {
  mergeArr2(arr3[i]);
}
console.log(("merge2 = " + (Date.now() - t) / 1000) + "s");


function mergeArr2(arr) {
  while (arr.length > 1) {
    var obj = [];
    for (var i = 0; arr.length > 0;) {
      if (!Array.isArray(arr[i])) {
        obj.push([arr[i]]);
      } else {
        obj.push([...arr[i]]);
      }
      arr.shift();
    }
    for (var i = 0; i < obj.length; i += 2) {
      if (obj[i] && obj[i + 1]) {
        arr.push(merge2(obj[i], obj[i + 1]));

      } else {
        arr[arr.length - 1] = merge2(arr[arr.length - 1], obj[obj.length - 1]);

      }
    }
  }
  obj = [...arr[0]];
  arr.shift();
  obj.forEach(e => {
    arr.push(e);
  })
}

function merge2(arr1, arr2) {
  var newArr = [];
  var i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else if (arr1[i] === arr2[j]) {
      newArr.push(arr1[i]);
      i++;
      newArr.push(arr2[j]);
      j++;
    } else {
      newArr.push(arr2[j]);
      j++;
    }
  }

  if (arr1.length > i) {
    for (var k = i; k < arr1.length; k++) {
      newArr.push(arr1[k]);
    }
  } else {
    for (var k = j; k < arr2.length; k++) {
      newArr.push(arr2[k]);
    }
  }
  return newArr;
}

////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////////MERGE//////

var t = Date.now();
for (var i = 0; i < allArr.length; i++) {
  mergeArr3(arr4[i]);
}
console.log(("merge3 = " + (Date.now() - t) / 1000) + "s");

function mergeArr3(arr) {
  var long = arr.length;
  for (var i = long; long > 0; long -= 2) {
    arr[arr.length] = merge3([arr[0]], [arr[1]]);
    arr.splice(0, 2)
  }
  while (arr.length > 1) {
    var long = arr.length;
    for (var i = long; long > 0; long -= 2) {
      arr[arr.length] = merge3(arr[0], arr[1]);
      arr.splice(0, 2)
    }
  }
  arr[0].forEach(e => {
    arr.push(e)
  })
  arr.shift();
}

function merge3(arr1, arr2) {
  var newArr = [];
  var i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else if (arr1[i] === arr2[j]) {
      newArr.push(arr1[i]);
      i++;
      newArr.push(arr2[j]);
      j++;
    } else {
      newArr.push(arr2[j]);
      j++;
    }
  }

  if (arr1.length > i) {
    for (var k = i; k < arr1.length; k++) {
      newArr.push(arr1[k]);
    }
  } else {
    for (var k = j; k < arr2.length; k++) {
      newArr.push(arr2[k]);
    }
  }
  return newArr;
}


console.log(arr1[999])
console.log(arr2[999])
console.log(arr3[999])
console.log(arr4[999])