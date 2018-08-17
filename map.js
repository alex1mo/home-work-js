function _map(arr, cb) {
  var newArr = [];
  for (j = 0; j < arr.length; j++) {
    var e = arr[j];
    var i = j;
    newArr.push(cb(e, i, arr));
  }
  return newArr;
}

var arr = ["HTML", "CSS", "JavaScript"];

var len = _map(arr, function(e) {
  return e.length;
});

console.log(len);
