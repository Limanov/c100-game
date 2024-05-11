var paddle, drawB, drawBr, dx = 0, dy = 0; gameSpeed = 10, stage = 0, bonus =0;
var canvasWidth = 640, canvasHeight = 480, paddleHeight = 15, paddleWidth = 120, result = 0, life = 3, interval = 20;
const brickRowCount = 8;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 1;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
var bricks = [];
function newBricks(){
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 , IsVisible: 1, hits: 2};
  }
}
}
function oneBrick(){
  bricks[0][0] = { x: 0, y: 0 , IsVisible: 1, hits: 1};
}
newBricks();
function startGame() {
paddle = new component(paddleWidth, paddleHeight, "green", canvasWidth/2 - paddleWidth/2, canvasHeight - paddleHeight);
drawB = new drawBall(canvasWidth/2, canvasHeight - paddleHeight - 5,5 ,"black");

drawBr = new drawBricks();
  aGame.start();
}
function resetStats(){
  newBricks();
  result = 0, life = 3; dx =0, dy = -gameSpeed;
}

var aGame = {
resultDiv : document.createElement('div'),
resultText : document.createTextNode('RESULT: ' + result + ' LIFE: ' + life  + ' STAGE: ' + stage),
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
    this.resultText.textContent = '>RESULT: ' + result + ' LIFE: ' + life + ' STAGE: ' + stage ;
}
}
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.IsVisible === 1) {
        if (canvasWidth > b.x && canvasWidth < b.x + brickWidth && canvasHeight > b.y && canvasHeight < b.y + brickHeight) 
        {
          b.hits--;
          dy = -dy;
          if(b.hits === 0)
          {
            b.IsVisible = 0;
          }
        }
      }
    }
  }
  if(IsAllNotVisible()){
   stage++;
   newBricks();
   startGame();
   }
}

function IsAllNotVisible(){
  let IsNV = true;
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.IsVisible === 1) {
       IsNV = false;
      }
    }
}
return IsNV;
}
function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedx = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = aGame.context;
            ctx.fillStyle = x*y;
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
function drawBricks() {
  this.update = function(){
    if(stage === 0){
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if(r % 2 === 1 && c % 2 === 1){
          if(bricks[c][r].IsVisible === 1){
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx = aGame.context;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095"+ c + r;
          ctx.fill();
          ctx.closePath();
        }
      }
      }
      }
    }
    if(stage === 0){
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if(r % 2 === 1 && c % 2 === 1){
          if(bricks[c][r].IsVisible === 1){
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx = aGame.context;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095"+ c + r;
          ctx.fill();
          ctx.closePath();
        }
      }
      }
      }
    }
  if(stage === -1){
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].IsVisible === 1){
      let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx = aGame.context;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095"+ c + r;
      ctx.fill();
      ctx.closePath();
    }
  }
  }
  }
  if(stage === 1){
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if(c % 2 === 1){
        if(bricks[c][r].IsVisible === 1){
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx = aGame.context;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095"+ c + r;
        ctx.fill();
        ctx.closePath();
      }
    }
    }
    }
  }
  if(stage === 3){
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if(r % 2 === 1){
        if(bricks[c][r].IsVisible === 1){
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx = aGame.context;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095"+ c + r;
        ctx.fill();
        ctx.closePath();
      }
    }
    }
    }
  }
  this.collisionDetection = function(){
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.IsVisible === 1) {
          if (drawB.x > b.x && drawB.x < b.x + brickWidth && drawB.y > b.y && drawB.y < b.y + brickHeight) 
        {
          b.hits--;
          dy = -dy;
          if(b.hits === 0)
          {
            b.IsVisible = 0;
          }
            result += 100;
          }
        }
      }
    }
  }
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
  function drawBall(x, y, ballRadius, ballColor) {
    this.x = x;
    this.y = y;
    this.start = false;
    this.update = function () {
    ctx = aGame.context;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#009"+this.x+this.y;
    ctx.fill();
    ctx.closePath();
    collisionDetection();
    }
    this.newPosition = function() {
    ctx.fillStyle = "#009"+this.x+this.y;
    if(this.start)
    {
    if (x + dx > aGame.canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if ( y + dy < ballRadius) {
      dy =-dy;
    }
    else if (y + dy > aGame.canvas.height - ballRadius -  paddleHeight){
      if (x > paddle.x && x < paddle.x + paddle.width) {
        if (drawB.x <= paddle.x + paddle.width/2){
        dy = -gameSpeed;
        dx = -1 * dx;
      }
      else if (drawB.x > paddle.x + paddle.width/2){
        dy = -gameSpeed/2 ;
 
      }
    }
    else{
      life -= 1;
      startGame();
    }
    if(life == 0){
      alert("YOU lose!!! You have " + result + "  points");
      resetStats();
    }
    }     
      this.x += dx;
      this.y += dy;
      x += dx;
      y += dy;
    }
    else{
      this.x += dx;
      x += dx;
    }
    }
  }
  
  
  function updateAGame() {
    aGame.clear();
    if(!drawB.start)
    {
      dx = 0;
    }
    if (aGame.keys && aGame.keys[39]) 
      {
        if(paddle.x <= canvasWidth - paddle.width)
          {paddle.speedx = gameSpeed}
        else{paddle.speedx = 0}; 
        if(!drawB.start && paddle.x <= canvasWidth - paddleWidth)
        { dx = gameSpeed;}

      }
    else {paddle.speedx = 0;}
    if (aGame.keys && aGame.keys[37]) 
    {
      if(paddle.x >= 0)
      {paddle.speedx = -gameSpeed} 
      else{paddle.speedx = 0}; 
      if(!drawB.start && paddle.x - paddle.x/2 >= 0)
      {dx = -gameSpeed;}
    }
    if (aGame.keys && aGame.keys[32] && !drawB.start) 
    {
      drawB.start =true;
      dx = 5; dy = -gameSpeed;
    }

    paddle.newPosition();
    paddle.update();
    drawB.update();
    drawB.newPosition();
    drawBr.update();
    drawBr.collisionDetection();
}
