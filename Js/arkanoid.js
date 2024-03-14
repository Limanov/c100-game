  var paddle, ball, block0, testBall;

function startGame() {
paddle = new component(100, 15, "green", 0, 380);
ball = new componentCircle(55, 376, "red",3 , 0 , 2 * Math.PI);
testBall = new componentCircle(60, 376, "black",3 , 0 , 2 * Math.PI);
block0 = new component(45, 15, "blue", 0, 0); 
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
    window.addEventListener('keydown', function (e) {
      e.preventDefault();
      aGame.keys = (aGame.keys || []);
      aGame.keys[e.keyCode] = (e.type == "keydown");
  })
  window.addEventListener('keyup', function (e) {
    aGame.keys[e.keyCode] = (e.type == "keydown");
  })
},
clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}

function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = aGame.context;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        this.newPosition = function() {
        this.x += this.speed;
    }
    }

    function componentCircle(x, y, color, radius, start, end) {
      this.speed = 0;
      this.x = x;
      this.y = y;
      this.goUp = true;
      this.isTestBall = false;
      this.update = function () {
          ctx = aGame.context;
          ctx.beginPath();
          ctx.arc(this.x, this.y, radius, start, end);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
      }
      this.start = false;
      this.newPosition = function() {
      if(!ball.start)
      {
        this.x += this.speed;
      }
      else 
      {
      if(this.goUp){
      this.y += this.speed;
      }
      else{
      this.y -= this.speed;
      }
      }
      if(this.isTestBall){
      if(this.goUp) 
      this.x -= this.speed;
       else
       this.x += this.speed;
       if(this.x >= 640  && this.speed == -3)
       {  

         this.speed = 3; 
       }
      //  else if (this.x >= 376 && this.speed)  
      //  {
      //    this.goUp = testBall.speed;
      //  }
      }
      if(this.y <= 1)
      {  
        this.goUp = false; 
      }
      else if (this.y >= 376)  
      {
        this.goUp = true;
      }
    }
  }

  function updateAGame() {
    aGame.clear();
    if (aGame.keys && aGame.keys[39]) {paddle.speed = 3; if(!ball.start){ball.speed = 3; testBall.speed = 3;}}
    if (aGame.keys && aGame.keys[37]) {paddle.speed = -3; if(!ball.start){ball.speed = -3; testBall.speed = -3;}}
    if (aGame.keys && aGame.keys[32]) {ball.speed = -3; ball.start = true; testBall.speed = -3; testBall.start = true;testBall.isTestBall = true;}

    paddle.newPosition();
    paddle.update();
    ball.newPosition();
    ball.update();
    block0.newPosition();
    block0.update();
    testBall.newPosition();
    testBall.update();
}
