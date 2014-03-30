var range = function(start, end) {
  if (start === end)
    return [end];

  return range(start , end - 1).concat(end);

}


var recSum = function(arr){
  if (arr.length === 1)
    return arr[0];
  return arr[0] + recSum(arr.slice(1, arr.length))
}


var itSum = function(ar) {
  count = 0;
  ar.forEach(function(el) {
    count += el;
  })
  return count;
}

var recExp1 = function(b, n) {
  if (n === 0)
    return 1;
  return b * recExp1(b, n-1)
}

//FUCK THIS ONE
// var recExp2 = function(b, n) {
//   if (n === 0)
//     return 1;
//   if (n % 2 === 0)
//     return Math.pow(recExp2(b, n / 2), 2);
//   else
//     return Math.pow(b * (recExp2(b, (n - 1) / 2)), 2);
// }

var fib = function(n) {
  switch(n)
  {
  case 0:
    return [];
    break;
  case 1:
    return [0];
    break;
  case 2:
    return [0,1];
    break;
  default:
    var temp = fib(n-1)
    temp.push(temp[temp.length-1] + temp[temp.length-2]);
    return temp;
  }
}

var bSearch = function(arr, target){

  var midIdx = Math.floor(arr.length / 2);
  debugger
  if (arr[midIdx] === target)
    return midIdx;
  else if(arr[midIdx] < target)
    return midIdx + bSearch(arr.splice(midIdx, arr.length), target);
  else
    return bSearch(arr.splice(0, midIdx), target);
}


var mergeSort = function(ar) {
  if (ar.length === 0)
    return ar;
  if (ar.length === 1)
    return ar;

  midIdx = Math.floor(ar.length / 2);

  var left = ar.slice(0, midIdx),
      right = ar.slice(midIdx, ar.length);

  return merge(mergeSort(left), mergeSort(right));
}


var merge = function(left, right) {
  result = []
  while ((left.length > 0) && (right.length > 0)){
    if (left[0] > right[0])
      result.push(right.shift());
    else
      result.push(left.shift());
  }
  if (left.length === 0)
    result = result.concat(right);
  else
    result = result.concat(left);

  return result;
}



var subsets = function(ar) {
  debugger
  if (ar.length === 0)
    return [];

  var results = subsets(ar.slice(0, ar.length - 2));
  var new_stuff = results.map(function(el) {
    console.log(el);
    return el.push(ar[ar.length-1]);
  });
  results.concat(new_stuff)

  return results;
}

console.log(subsets([1,2,3]))