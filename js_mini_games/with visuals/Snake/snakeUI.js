(function (root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  var SnakeUI = Snakes.SnakeUI = function () {
  };

  SnakeUI.prototype.start = function () {
    this.board = new Snakes.Board();
    var that = this;
    var moveDir = this.board.snake.dir


    $(document).on("keydown", function(event) {
      if(+event.which === 37) {
        that.board.snake.dir = "W";
      }
      else if(+event.which === 38) {
       that.board.snake.dir = "N";
      }
      else if(+event.which === 39) {
        that.board.snake.dir = "E";
      }
      else if(+event.which === 40) {
        that.board.snake.dir = "S";
      }


      setInterval(that.step.bind(that), 1000);

    });


  }

  SnakeUI.prototype.step = function() {
    this.board.snake.move();
    this.board.render();
  }



})(this);


$(document).ready(function() {

  var s = new Snakes.SnakeUI();
  s.start();

});
