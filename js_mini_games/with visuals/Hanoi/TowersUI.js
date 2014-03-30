(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var TowersUI = Hanoi.TowersUI = function () {
    this.game = new Hanoi.Game
    this.flag = true;
  };

  TowersUI.prototype.startGame = function() {
    this.render();
    this.clickHandler();
  }


  TowersUI.prototype.render = function() {
    $('.container').empty();
    var game = this.game;
    var towers = game.towers;

    for(var i = 0; i < towers.length; i++) {
      $('.container').append('<div class="pile"  data-num="' + i + '"></div>');
      for(var j = towers[i].length - 1; j >= 0; j--) {
        var size = 10 * towers[i][j];
        $('[data-num="' + i + '"]').append('<div class="disk' + towers[i][j] + '"></div> <br>')
      }
    }
  };

  TowersUI.prototype.clickHandler = function() {
    var that = this;
    var startTowerIdx = 0

    $('.container').on("click", "div.pile", function(event) {
      if(that.flag === true) {
        startTowerIdx = +$(event.currentTarget).data("num");
        that.flag = false;
      }
      else {
        var endTowerIdx = +$(event.currentTarget).data("num");
        that.flag = true;
        that.game.move(startTowerIdx, endTowerIdx);
        that.render();

        if (that.game.isWon()) {
          alert("You win!");
          return;
        }

      }
    });
  }

})(this);



// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

var that = this;
$(document).ready(function() {

  var h = new Hanoi.TowersUI();
  h.startGame();

});