var multiplies = function(ar){
  var results = [];
  ar.forEach(function(el) {
    results.push(el * 2);
  });
  return results;
}


var myEach = function(ar, callback) {
  for(var i = 0, n = ar.length; i < n; i++){
    callback(ar[i]);
  }
  return ar
}


var myMap = function(ar, callback) {
  debugger
  var results = [];
  myEach(ar, function(el){
    results.push(callback(el));
  });
  return results;
}

var myInject = function(ar, callback) {
  var accum = ar[0];
  counter = 0
  myEach(ar.slice(1,ar.length), function(el) {
      accum = callback(accum, el);
  });
  return accum;
}


