var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function() {
    this.grid = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    this.current_player = "x";
  };

  Game.prototype.draw = function() {
    for(var i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i].join(" | "));
      if (i !== this.grid.length-1)
        console.log("---------");
    };
  };

  Game.prototype.boardFilled = function() {
    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === " ")
          return false;
      }
    }
    return true;
  }

  Game.prototype.win = function() {
    diagonals = this.diagonals();
    columns = this.columns();
    var rows = this.grid.concat(columns).concat(diagonals);
    for (var i=0; i<(rows.length); i++) {
      row = rows[i];
      if (this.check_row(row)) {
        this.winner = row[0];
        return true;
      }
    }

    return false;
  }

  Game.prototype.columns = function() {
      columns = [];
    for(var i = 0; i < this.grid.length; i++) {
      temp = [];
      for(var j = 0; j < this.grid.length; j++){
        temp.push(this.grid[j][i]);
      }
      columns.push(temp);
    }
    return columns;
  }

  Game.prototype.diagonals = function() {
    diagonals = [];
    diagonals.push([this.grid[0][0], this.grid[1][1], this.grid[2][2]]);
    diagonals.push([this.grid[2][0], this.grid[1][1], this.grid[0][2]]);
    return diagonals;
  }

  Game.prototype.check_row = function(row) {
    var anyBlank = row.some(function(el) {
      if (el === " ")
        return true
    });

    if (anyBlank === false)
      return row[0] === row[1] && row[1] === row[2];
    return false;
  }

  Game.prototype.switchPlayer = function() {
    this.current_player = (this.current_player === "x" ? "o" : "x");
  }

  Game.prototype.run = function() {
    var that = this;
    that.draw();
    console.log(this.current_player + " player's turn");
    READER.question("Pick your move: ", function(input) {
      pos = input.split(" ");
      var row = parseInt(pos[0]);
      var col = parseInt(pos[1]);
      var target = that.grid[row][col];
      if (target !== " ") {
        console.log("Invalid move. Try again.")
      }
      else
      {
        that.grid[row][col] = that.current_player;
        that.switchPlayer();
        if (that.win())
        {
          that.draw();
          console.log(that.winner + " won the game!");
          READER.close();
          return;
        }
      }
      if (that.boardFilled()) {
        that.draw();
        console.log("It's a tie! =_=");
        READER.close();
        return;
      }
      that.run();
    });


  }

})(this);

var game = new this.TTT.Game();
game.run();