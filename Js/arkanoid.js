  var paddle;

function startGame() {
paddle = new component(100, 15, "green", 0, 380);
  aGame.start();
  
}
var aGame = {
canvas : document.createElement('canvas'),
start : function(){
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateAGame, 20);
},
clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}

function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = aGame.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

  function updateAGame() {
    aGame.clear();
    paddle.x += 1;
    paddle.update();
  }