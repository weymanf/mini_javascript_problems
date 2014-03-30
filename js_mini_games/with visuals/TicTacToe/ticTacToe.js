// NB: This doesn't include any AI.

(function (root) {
  if (!(typeof(require) === "undefined")) {
    // _ = require('./underscore.js');
  }

  // var readline = require('readline');
 //  var READER = readline.createInterface({
 //    input: process.stdin,
 //    output: process.stdout
 //  });

  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TT() {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  }

  Game.marks = ["x", "o"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.isEmptyPos = function (pos) {
    return (this.board[pos[0]][pos[1]] === null);
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.move = function (pos, target) {



    if (!this.isEmptyPos(pos)) {
      return false;
    }


    this.placeMark(pos);
    this.switchPlayer(target);
    return true;
  };

  Game.prototype.placeMark = function (pos) {
    console.log("current player=", this.player);
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function (target) {
    if (this.player === Game.marks[0]) {
      var squareColor = "red-square";
      target.addClass(squareColor);
      this.player = Game.marks[1];
    } else {
      var squareColor = "blue-square";
      target.addClass(squareColor);
      this.player = Game.marks[0];
    }
  };

  Game.prototype.valid = function (pos) {
    // Check to see if the co-ords are on the board and the spot is
    // empty.

    function isInRange (pos) {
      return (0 <= pos) && (pos < 3);
    }

    return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.printBoard = function () {
    var game = this;

    game.board.forEach(function(row){
      var first = row[0] == null ? " " : row[0];
      var second = row[1] == null ? " " : row[1];
      var third = row[2] == null ? " " : row[2];

      console.log(first + " | " + second + " | " + third);
    })
  }

  Game.prototype.run = function () {
    var game = this;

    game.turn(function(){
      if (game.winner()) {
        return alert(game.player + " won!");

      } else {
        game.printBoard();
        game.run();
      }
    });
  }

  Game.prototype.turn = function (callback) {
    var game = this;

    $("div").on('click','div', function(event) {
      var $target = $(event.target);
      var $data = $target.data("coords");
      var coords = [+$data[0], +$data[3]];

      game.move(coords, $target);
      callback();

    });




  }
})(this);


// First we instantiate a new object with the this.TTT.Game() constructor function.
var that = this;
$(document).ready(function() {
  var TTT = new that.TTT.Game();
  TTT.run();
});
