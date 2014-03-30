(function (root) {
  var Snakes = root.Snakes = (root.Snake || {});
  var Snake = Snakes.Snake = function() {

    var ranNum = Math.floor(Math.random() * 4)
    this.dir = ["N", "E", "S", "W"][0];
    this.segments = [[5,5],[5,4],[5,3]];
  }

  var turn = function(dir) {
    this.dir = dir
  }

  Snake.prototype.move = function() {
    var moveCoord = [0, 0]
    if(this.dir === "N") {
      moveCoord = [-1, 0];
    }
    else if(this.dir === "S") {
      moveCoord = [1, 0];
    }
    else if(this.dir === "W") {
      moveCoord = [0, -1];
    }
    else if(this.dir === "E") {
      moveCoord = [0, 1];
    }

    for(var i = (this.segments.length - 1); i >= 1; i--) {
      this.segments[i][0] = this.segments[i-1][0];
      this.segments[i][1] = this.segments[i-1][1];
    }

    this.segments[0][0] += moveCoord[0];
    this.segments[0][1] += moveCoord[1];

    if(this.segments[0][0] > Snakes.Board.MAX_Y - 1) {
      this.segments[0][0] -= Snakes.Board.MAX_Y
    }
    if(this.segments[0][0] < 0) {
      this.segments[0][0] += Snakes.Board.MAX_Y
    }
    if(this.segments[0][1] > Snakes.Board.MAX_X - 1) {
      this.segments[0][1] -= Snakes.Board.MAX_X
    }
    if(this.segments[0][1] < 0) {
      this.segments[0][1] += Snakes.Board.MAX_X
    }
  }

  Snake.prototype.eatApple = function(board) {
    if ((this.segments[0][0] === board.apple[0]) && (this.segments[0][1] === board.apple[1])) {
      this.segments[this.segments.length - 1]
      this.segments.push()
      board.apple = [Math.floor(Math.random() * Board.MAX_X), Math.floor(Math.random() * Board.MAX_Y)];
    }
  }

  Snake.prototype.addTail = function() {

  }


  Snake.prototype.isSegment = function(pos) {
    var flag = false;
    this.segments.forEach(function(el) {
      if ((el[0] === pos[0]) && (el[1] === pos[1]))
        flag = true;
    });
    return flag;
  }


})(this);