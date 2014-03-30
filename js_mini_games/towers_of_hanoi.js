var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function() {
    this.towers = [[3,2,1],[],[]];
    this.winTower = [3,2,1]
  };

  Game.prototype.draw = function() {
    for(var i = 0; i < this.towers.length; i++) {
      var tower = this.towers[i];
      console.log(tower.join(" "));
    };
  };

  Game.prototype.win = function() {
    var lastTower = this.towers[this.towers.length-1];
    if (lastTower.join(" ") === this.winTower.join(" "))
      return true;
    else
      return false;
  };



  Game.prototype.run = function() {
    var game = this;
    game.draw();
    READER.question("Select tower (0 to 2): ", function(answer1) {
      var disk = game.towers[answer1].pop();
      READER.question("Select destination tower (0 to 2): ", function(answer2) {
        var destinationTower = game.towers[answer2];
        if (destinationTower.length > 0)
        {
          var destinationDisk = destinationTower[destinationTower.length-1];
          if (destinationDisk < disk)
          {
            game.towers[answer1].push(disk);
            console.log("Invalid move! Try again.");
            game.run();
          }
          else
          {
            game.towers[answer2].push(disk);
            if (game.win())
            {
              game.draw();
              console.log("You've won!");
              READER.close();
            }
            else
              game.run();
          }
        }
        else
        {
          game.towers[answer2].push(disk);
          if (game.win())
          {
            game.draw();
            console.log("You've won!");
            READER.close();
          }
          else
            game.run();
        }
      });
    });


  };



})(this);

var game = new this.Hanoi.Game();
game.run();