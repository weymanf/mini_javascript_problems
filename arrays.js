var dupes = function(ar) {
  var results = [];
  for (var i = 0, n = ar.length; i < n; i++) {
   if (results.every(
     function(el) {
       if (el !== ar[i])
          return true;
        else
          return false;
      } ))
    {
      results.push(ar[i]);
   }
  }
  return results;
}


var twoSum = function(ar) {
  var results = [];
  for (var i = 0, n = ar.length; i < n - 1; i++) {
    for (var j = i + 1; j < ar.length; j++) {
      if (ar[i] + ar[j] === 0) results.push([i, j]);
    }
  }
  return results;
}

var transpose = function(arr){
  var transposed = [];
  for(var i = 0, n = arr.length; i < n; i ++){
    temp = []
    arr.forEach(function(el){
      temp.push(el[i]);
    });
    transposed.push(temp);
  }
  return transposed;
}

