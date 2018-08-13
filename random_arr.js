var arr = [];
var arrPosivite = [];
var arrNegative = [];
var randLeng = positive();
var randToken = [-1, 0, 1];
randToken = randToken[positive(3)];
var sum = 0;
var sumPositive = 0;
var sumNegative = 0;
var max;
var min;
var maxInPositive;
var minInPositive;
var maxInNegative;
var minInNegative;

for (var i = 0; i < randLeng; i++) {
  if (randToken > 0) {
    arrPosivite[i] = positive();
    sumPositive += arrPosivite[i];
    maxInPositive = maxInArr(arrPosivite);
    minInPositive = minInArr(arrPosivite);
  } else if (randToken < 0) {
    arrNegative[i] = negative();
    sumNegative += arrNegative[i];
    maxInNegative = maxInArr(arrNegative);
    minInNegative = minInArr(arrNegative);
  } else {
    arr[i] = randNum();
    sum += arr[i];
    max = maxInArr(arr);
    min = minInArr(arr);
    if (arr[i] >= 0) {
      arrPosivite[arrPosivite.length] = arr[i];
      sumPositive += arr[i];
      maxInPositive = maxInArr(arrPosivite);
      minInPositive = minInArr(arrPosivite);
    } else {
      arrNegative[arrNegative.length] = arr[i];
      sumNegative += arr[i];
      maxInNegative = maxInArr(arrNegative);
      minInNegative = minInArr(arrNegative);
    }
  }
}

arr = arr.length > 0 ? arr : "отсутствует";
arrPosivite = arrPosivite.length > 0 ? arrPosivite : "отсутствует";
arrNegative = arrNegative.length > 0 ? arrNegative : "отсутствует";
randToken =
  randToken === 0
    ? "все числа"
    : randToken > 0
      ? "положительные"
      : "отрицательые";

console.log("длина массива = " + randLeng);
console.log("знак в массиве = " + randToken + "\n" + " ");
console.log("общий массив = " + arr);
console.log("сумма массива = " + sum);
console.log("max = " + max);
console.log("min = " + min + "\n" + " ");
console.log("Положительный массив = " + arrPosivite);
console.log("сумма положетельных = " + sumPositive);
console.log("max = " + maxInPositive);
console.log("min = " + minInPositive + "\n" + " ");
console.log("Отрицательный массив = " + arrNegative);
console.log("сумма отрицательных = " + sumNegative);
console.log("max = " + maxInNegative);
console.log("min = " + minInNegative);

function randNum(limit) {
  limit = parseFloat(limit);
  if (limit) {
    return parseInt((Math.random() - 0.5) * 2 * limit);
  } else {
    return parseInt((Math.random() - 0.5) * 2 * 101);
  }
}

function positive(limit) {
  limit = parseFloat(limit);
  if (limit) {
    return parseInt(Math.random() * limit);
  } else {
    return parseInt(Math.random() * 101);
  }
}

function negative(limit) {
  limit = parseFloat(limit);
  if (limit) {
    return parseInt((Math.random() - 1) * limit);
  } else {
    return parseInt((Math.random() - 1) * 101);
  }
}

function maxInArr(arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    max = arr[i] > max ? arr[i] : max;
  }
  return parseFloat(max);
}

function minInArr(arr) {
  var min = arr[0];
  for (var i = 0; i < arr.length; i++) {
    min = arr[i] < min ? arr[i] : min;
  }
  return parseFloat(min);
}
