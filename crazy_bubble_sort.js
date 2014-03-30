var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



var askLessThan = function(el1, el2, callback) {
  READER.question("Is " + el1 + " < " + el2 + "?", function(answer) {
    if (answer == 'yes')
      callback(true);
    else
      callback(false);
  });
};

var performSortPass = function(arr, i, madeAnySwaps, callback) {
  if (i < (arr.length - 1)) {
    askLessThan(arr[i], arr[i+1], function(lessThanAnswer) {
      if (lessThanAnswer === false) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }
      performSortPass(arr, i+1, madeAnySwaps, callback);
    });
  }
  if (i === (arr.length - 1)) {
    callback(madeAnySwaps);
  }
}

var crazyBubbleSort = function(arr, sortCompletionCallback) {

  var sortPassCallBack = function(madeAnySwaps) {
    if (madeAnySwaps === true) {
      performSortPass(arr, 0, false, sortPassCallBack);
    } else {
      sortCompletionCallback(arr);
      READER.close();
    }
  }

  sortPassCallBack(true);
}


crazyBubbleSort([2,1,3,9,1,0,3], function (arr) { console.log(arr) });

// arr = [3,2,1]
// performSortPass(arr, 0, false, function(madeAnySwaps) {
//   console.log(madeAnySwaps);
//   console.log(arr);
// });
