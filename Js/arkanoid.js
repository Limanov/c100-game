var paddle, ball, block0, testBall, drawB;
var canvasWidth = 640, canvasHeight = 480, paddleHeight = 15, paddleWidth = 100, result = 0, life = 3, interval = 20;
function startGame() {
paddle = new component(paddleWidth, paddleHeight, "green", canvasWidth/2 - paddleWidth/2, canvasHeight - paddleHeight);
ball = new componentCircle(55, canvasHeight - paddleHeight - 3, "red",3 , 0 , 2 * Math.PI);
testBall = new componentCircle(60, canvasHeight - paddleHeight - 3, "black",3 , 0 , 2 * Math.PI);
block0 = new componentBlock(45, 15, "blue", 0, 0); 
drawB = new drawBall(canvasWidth/2, canvasHeight - paddleHeight - 5,2 ,-2 ,5 ,"black");
  aGame.start();
}
function resetStats(){
  result = 0, life = 3;dx =2, dy = -2;
}
var aGame = {
resultDiv : document.createElement('div'),
resultText : document.createTextNode('RESULT: ' + result + ' LIFE: ' + life ),
canvas : document.createElement('canvas'),
start : function(){
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    if(this.interval == undefined){
    this.interval = setInterval(updateAGame, interval);
    }
    this.resultDiv.appendChild(this.resultText);
    document.body.insertBefore(this.resultDiv, this.canvas);
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
    this.resultText.textContent = 'RESULT: ' + result + ' LIFE: ' + life ;
}
}

function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedx = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = aGame.context;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        this.newPosition = function() {
        this.x += this.speedx;
    }
    }
    function componentBlock(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.speedx = 0;
      this.x = x;
      this.y = y;
      this.update = function () {
          ctx = aGame.context;
          ctx.fillStyle = color;
          ctx.fill();
          ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }

    function componentCircle(x, y, color, radius, start, end) {
      this.speedx = 0;
      this.speedy = 0;
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
        this.x += this.speedx;
      }
      else 
      {
      if (this.goUp){
      this.y += this.speedy;
      }
      else {
      this.y -= this.speedy;
      }
      }
      if(this.isTestBall){
      if(this.goUp) {
      this.x -= this.speedx;
      this.y += this.speedy;
      }
       else{
       this.x += this.speedx;

      }
       if(this.x >= 640  && this.speedx == -3)
       {  
         this.speedx = 3; 
         this.speedy = 3; 
       }
       else if(this.x <= 0){
        this.speedx = 3; 
        this.speedy = -3; 
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
  function drawBall(x, y,dx ,dy , ballRadius, ballColor) {
    this.x = x;
    this.y = y;
    this.start = false;
    this.update = function () {
    ctx = aGame.context;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
    }
    this.newPosition = function() {
    if(this.start)
    {
    if (x + dx > aGame.canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if ( y + dy < ballRadius) {
      dy =-dy;
    }
    else if (y + dy > aGame.canvas.height - ballRadius){
      if (x > paddle.x && x < paddle.x + paddle.width) {
        dy = -dy;
    }
    else{
      life -= 1;
      startGame();
    }
    if(life == 0){
      alert("YOU lose!!!");
      resetStats();
    }
    }
     x += dx;
     y += dy;
    }
    }
  }
  
  
  function updateAGame() {
    aGame.clear();
    if (aGame.keys && aGame.keys[39]) 
      {
        if(paddle.x <= canvasWidth - paddle.width)
          {paddle.speedx = 3}
        else{paddle.speedx = 0}; 
        if(!ball.start)
        {ball.speedx = 3; testBall.speedx = 3;}
        if(!drawB.start)
        {drawB.x += 3;}
      }
    else {paddle.speedx = 0;ball.speedx = 0; testBall.speedx = 0;}
    if (aGame.keys && aGame.keys[37]) 
    {
      if(paddle.x >= 0)
      {paddle.speedx = -3}
      else{paddle.speedx = 0}; 
      if(!ball.start)
      {ball.speedx = -3; testBall.speedx = -3;}
      if(!drawB.start)
      {drawB.x += -3;}
    }
    if (aGame.keys && aGame.keys[32]) 
    {
      ball.speedy = -3; ball.start = true;
      testBall.speedx = -3; testBall.speedy = -3;
      testBall.start = true;testBall.isTestBall = true; drawB.start =true;
    }

    paddle.newPosition();
    paddle.update();
    ball.newPosition();
    ball.update();
    block0.update();
    testBall.newPosition();
    testBall.update();
    drawB.update();
    drawB.newPosition();
}
