
var level;
const canvasWidth = 800;
const canvasHeight = 500;
let levelNum = 0;
let levels;
var scoreCade = 0;
var missCade = 0;
var bricks = [];
var gameState = 'bb';
var prisonEscape;
var enemyPrisoners;
var infiniteScroller;
var titleScreenP;
var endScreenP;
var playerHeartbeat = false;
//var titlePagePic;

function preload() 
{
  fact1 = new Facts(0);
  fact2 = new Facts(1);
  fact3 = new Facts(2);
  fact4 = new Facts(3);
  brickBreaker = new BrickBreaker();
  infiniteScroller = new InfiniteScroller();
  prisonEscape = new PrisonEscape();
  captureTheKeys = new CaptureTheKeys();
  enemyPrisoners = new Enemy();
  titleScreenP = new TitleScreen();
  endPagePic = loadImage('images/End.png');
  //titlePagePic = loadImage('images/TitleScreen.png')
  
  fact1.preload();
  fact2.preload();
  fact3.preload();
  fact4.preload();
  captureTheKeys.preload();

}
function setup () 
{
  const theCanvas = createCanvas(canvasWidth, canvasHeight);
  theCanvas.parent = "gameContainer";
  //canvas.parent('canvas');

  theCanvas.style('display', 'block');
  theCanvas.style('margin-left', 'auto');
  theCanvas.style('margin-right', 'auto');
  theCanvas.style('margin-top', '50px');
  theCanvas.style('margin-bottom', '50px');
  theCanvas.style('border', '10px solid rgb(206, 81, 9)');

  noStroke();

  levels = [titleScreenP, fact1, brickBreaker, fact2, prisonEscape, fact3, captureTheKeys, fact4, infiniteScroller];
  levelNum = 0;
  level = levels[levelNum];
  level.setup();
}

function draw() 
{

  level.draw();

}

class Facts {
	constructor(x) {
	  this.screen = x;
	  this.timer = 5;
	}
  
	preload() {
	  this.font = loadFont('fonts/octin prison rg.ttf');
	}
  
	setup() {
		  createCanvas(800, 500);
	  
		  noStroke();
	  background(0);
  
	  if (this.screen == 0) {
		textAlign(CENTER);
			textFont(this.font);
			textSize(75);
			fill(255);
			text('FACT #' + int(random(1000)), width/2, height/2 - 50);
			textSize(25);
			text("Over 2.2 million people are currently in U.S. jails or prisons.\nThat's the highest prison population in the entire world.", width/2, height/2 + 50);
	  } else if (this.screen == 1) {
		textAlign(CENTER);
			textFont(this.font);
			textSize(75);
			fill(255);
			text('FACT #' + int(random(1000)), width/2, height/2 - 50);
			textSize(35);
		text("Over 2.7 million children in the U.S.\nhave a parent behind bars.", width/2, height/2 + 50);
	  } else if (this.screen == 2) {
		textAlign(CENTER);
			textFont(this.font);
			textSize(75);
			fill(255);
			text('FACT #' + int(random(1000)), width/2, height/2 - 50);
			textSize(35);
			text("There are more jails than\ncolleges in the U.S.", width/2, height/2 + 50);
	  } else if (this.screen == 3) {
		textAlign(CENTER);
			textFont(this.font);
			textSize(75);
			fill(255);
			text('FACT #' + int(random(1000)), width/2, height/2 - 50);
			textSize(35);
		text("The U.S. prison population has more than\nquadrupled since the early 1980s.", width/2, height/2 + 50);
	  }
	  textAlign(LEFT);
	}
	
	draw() {
  
	  if (frameCount % 60 == 0 && this.timer > 0) {
			  this.timer--;
	  }
	  
	  if (this.timer <= 0) {
		levelNum++;
		level = levels[levelNum];
    level.setup();
	  }
	}
  }


class TitleScreen 
{
 
  constructor() {

      this.x = width/2;
      this.y = height/2;
      this.width = 800;
      this.height = 500;
      this.titlePagePic = loadImage('images/TitleScreen.png');
      this.distancePlayWhole;

  }
  setup() {
      createCanvas(800, 500);
  }

  draw() {

    image(this.titlePagePic,this.x,this.y,this.width,this.height);
    ellipse(400, 270, 30, 30);
    this.distancePlayWhole = dist(400, 270, mouseX,mouseY);
    text("Play",389,273);
      if (mouseIsPressed && this.distancePlayWhole < 50)

          {
              fill(0);
              background(0);
              // gameState = 'pe'; 
              // levelNum++;

              // this is the template for how to go to the next level
              levelNum++;
              level = levels[levelNum];
              level.setup();


          }


  }

}
class BrickBreaker 
{
  //Cade Richmond
  //Interactive Computing Tutor Will Monohan helped me with this project
  //too end the game quickly, go to javascript console and type bricks.length = 0;
  //this will transition between the levels until the final page is loaded
  //(the game can take a while)
  //establish variables
  //watch out for naming variables
  //once youve combined games => make a note when you make small changes 

  constructor() {
    
    //preload images
    this.bg = loadImage("img/prisoncell.jpg");
    this.ballImage = loadImage("img/pickaxe.png");
    this.coinA = loadImage("img/coin.png");
    this.barS = loadImage('img/jailbars.jpg');
    //load sounds
    this.vanish = loadSound("sound/vanish.ogg");
    this.boingS = loadSound("sound/drain.ogg");
    this.coinS = loadSound("sound/coin.ogg");
    this.death = loadSound("sound/boing.ogg");
    //preload font
    this.alc = loadFont('fonts/ALCATRAZ.ttf');
    
    
  }

  setup() {
    
    //create canvas
    createCanvas(800,500);
    //set coin start values
      this.xCoin = random(40, 360);
      this.yCoin = random(40, 200);
      //set origin of images in the center of the pic
      imageMode(CENTER);
      //establish variabkes for random colors of bricks upon reload
      this.r = random(0,255);
      this.g = random(0,255); 
      this.b = random(0,255);
      this.r1 = random(0,255);
      this.g1 = random(0,255);  
      this.b1 = random(0,255);
      //push out a paddle
      this.paddle = new Paddle();
      //push ball
      this.ball = new Ball();
      this.play = new Play();
      this.end = new End();
      this.bricks = [];
      this.theta = 0;
      this.score = 0;
      //populate first level
      this.populateLevel();
      this.levelState = 'titleScreen';
      this.misses = 0;
      this.scores = 0;
      this.level1 =[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,5,5,5,5,5,5,5,5,5,5,5,5],
      [0,0,5,5,5,5,5,5,5,5,5,5,5,5],
      [0,0,5,5,5,5,5,5,5,5,5,5,5,5]
      ];
    this.level2 = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,5,5,0,5,0,5,0,0,5,0,5,0,5,5,0],
      [0,5,5,0,5,0,5,0,0,5,0,5,0,5,5,0],
      [0,5,5,0,5,0,5,0,0,5,0,5,0,5,5,0]
      ];
    this.level3 = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,5,5,5,5,5,5,0,0,5,5,5,5,5,5],
      [0,5,5,5,5,5,5,0,0,5,5,5,5,5,5],
      [0,5,5,5,5,5,5,0,0,5,5,5,5,5,5]
      ];
  }

  populateLevel() {

  
    //use if statements to check the state of the level.
    if (this.levelState == "levelOne"){
      //iterate through the for loop
      for (var i = 0; i < this.level1.length; i++) {
        //goes through the different bricks within level1[i]
        for (var j = 0; j < this.level1[i].length; j++){
          //
          var b = this.level1[i][j];

          if (b!=0){
            this.bricks.push(new Brick(j*50, i*50, b));
           }
        

        }
        }
    }
    //use if statements to check the state of the level.
    if (this.levelState == "levelTwo"){
      //goes through the different rows in the level array
      for (var i = 0; i < this.level2.length; i++) {
        //goes through the different bricks within level2[i]
          for (var j = 0; j < this.level2[i].length; j++){

           var b = this.level2[i][j];

           if (b!=0){
               this.bricks.push(new Brick(j*50, i*50, b));
          }
        

          }
       }
    }
    //use if statements to check the state of the level.
    if (this.levelState == "levelThree"){
      //goes through the different rows in the level array
      for (var i = 0; i < this.level3.length; i++) {
        //goes through the different bricks within level2[i]
          for (var j = 0; j < this.level3[i].length; j++){

           var b = this.level3[i][j];

           if (b!=0){

              this.bricks.push(new Brick(j*50, i*50, b));

          }
        }
       }
    }
    if (this.levelState == "endGame"){
        
    }
  }

  draw() {

    if (this.levelState == 'titleScreen') {

        this.titleScreen();
        this.distancePlay = dist(this.play.x, this.play.y, mouseX,mouseY);
        if (mouseIsPressed && this.distancePlay < 50)

        {

          this.levelState = 'levelOne';
          this.populateLevel();


        }


    }
    
    else if (this.levelState == 'endGame')
    {
      
      this.endGame();
      this.distanceEnd = dist(this.end.x, this.end.y, mouseX,mouseY);
      if (mouseIsPressed && this.distanceEnd < 50)

          {
              fill(0);
              background(0);
              // gameState = 'pe'; 
              // levelNum++;

              // this is the template for how to go to the next level
              levelNum++;
              level = levels[levelNum];
              level.setup();


          }

    }
    else
    {
      //set origin of images in the center of the pic
      imageMode(CENTER);
      //call background and put draw on canvas
      image(this.bg,400,200,800,500);
      fill(this.r,this.g,this.b);
      //distance from coin to ball
        var d = dist(this.ball.x+25, this.ball.y+25, this.xCoin, this.yCoin);
        //if ball collides with the coin
      if (d <= 25+12.5) {
        //play coin sound
          this.coinS.play();
          //add one to score 
          this.scores += 1;
          //coin appears at random coordiantes
        this.xCoin = random(40, 360);
          this.yCoin = random(40, 200);
          
    }
        //visual coin (.5); assign variables
        image(this.coinA, this.xCoin, this.yCoin, 45,45);
      text("Misses: " + missCade, 20,35);
      text("Scores: " + scoreCade, 120, 35);
      fill(this.r,this.g,this.g);
      strokeWeight(2);
      stroke(101,19,142);
      if (this.paddle.state == 'aim' && keyIsDown(32)) 
      {
        this.paddle.state = 'launched';
        this.ball.xSpeed = this.ball.Speed * cos(this.paddle.theta);
        this.ball.ySpeed = -1 * this.ball.Speed * sin(this.paddle.theta);
      }
      this.paddle.update(this.ball,this.boingS,this.death);
      this.paddle.display(this.boingS);
      this.ball.update(this.paddle,this.boingS,this.death);
      this.ball.display(this.ballImage);
      this.ball.checkHit(this.bricks,this.scores,this.misses,this.boingS,this.vanish);
      for (var i = 0; i < this.bricks.length; i++) 
      {
        this.bricks[i].display();
      }
      if (this.bricks.length == 0)
      {
        if (this.levelState == "levelOne")
        {
          this.levelState = "levelTwo";
          this.populateLevel();
        }
        else if (this.levelState == "levelTwo") 
        {
          this.levelState = "levelThree";
          this.populateLevel();
        }
        else if (this.levelState == "levelThree") 
        {
          this.levelState = "endGame";
          this.populateLevel();
        }
       }
       noStroke();
       fill('#111224');
       rect(0,450,800,50);
       stroke(255);
       fill(this.r,this.g,this.b);
       //top border
       rect(0,0,800,10);
       //left border
       rect(0,0,10,490);
       //right border
       rect(790,0,10,490);
       //bottom border
       rect(0,490,800,10);

  
    }

  }

  titleScreen() 
  {
    image(this.barS,width/2,height/2,800,460);
    textFont(this.alc);
    fill(255);
    textSize(150);
    text("Brick Breaker",width/2-400,height/2-75);
    textSize(100);
    text("Escape the Institution",width/2-396,height/2+35);
    textSize(20);
    text("By Cade Richmond",680,440);
    ellipse(this.play.x,this.play.y,this.play.width,this.play.height);
    stroke(0);
    fill(0);
    text("Play",387,410);
    textFont('arial');
  }

  endGame() 
  {
    background(0);
    imageMode(CENTER);
    image(this.barS,width/2,height/2,800,460);
    textFont(this.alc);
    fill(255);
    textSize(150);
    text("Brick Breaker",width/2-400,height/2-75);
    textSize(100);
    text("Misses",width/2-396,height/2+35);
    text("Hits",width/2-396,height/2+140);
    textFont('arial');    
    text(missCade,200,height/2+35);
    text(scoreCade,125,height/2+140);
    textSize(20);
    textFont(this.alc);
    stroke(5);
    ellipse(this.end.x,this.end.y,this.end.width,this.end.height);
    text("By Cade Richmond",680,440);
    fill(0);
    text("Play",width/2-13,height/2+57)
    textFont('arial');
  }

  mousePressed() {

  }
}
  
class Paddle 
{


  constructor() 
  {
    this.x = 400;
    this.y = 402;
    this.width = 100;
    this.height = 20;
    this.state = 'aim';
    this.theta = 0.25;
    this.lineSpeed = 0.01;
  }
  
  display() 
  {
    stroke(255);
    rect(this.x,this.y,this.width,this.height);
    if (this.state == 'aim') 
    {
      this.aim();
    }
  }
  moveLeft() {
    this.x -= 8;
  }
  moveRight() {

    this.x += 8;

  }
  update(ball,boingS) {

    if (keyIsDown(65)) {
      
      this.moveLeft();

    }
    else if (keyIsDown(68)){


      this.moveRight(); 
    }

    if (this.state == 'aim'){
      ball.x = this.x+37.5;
      ball.y = this.y-25;
    }
    if (this.x+100 >= 800){

      this.x = 700;
    }

    if (this.x <= 0){

      this.x = 0;
    }
    //DO NOT PUT BOING IN HERE
    if (ball.y >= this.y+10 && ball.x >= this.x && ball.x <= this.x+100) {
        //bounce sound (.5)
      //increase Y speed upon bounce
        this.ball.ySpeed *= -1.1;
        //ball.y = this.x+50;
  
      
      if (this.ball.x > this.x+50  && this.ball.x < this.x+100 ) {
        //multiply by -1 eqauls reverse, but that does not apply here
        //we add the postivie value to make the ball go to the right 
        this.ball.xSpeed += abs(this.ball.xSpeed)
        boingS.play();
      }
      else if (this.ball.x > this.x && this.ball.x < this.x+50){
        
        //make ball go to the left
        this.ball.xSpeed += abs(ball.xSpeed) * -1;
        boingS.play();
      }
    }
    }
 
  aim() {

    var length = 100;
    var startX = this.x+50;
    var startY = this.y-20;
    var endX = startX+length*cos(this.theta);
    var endY = startY-length*sin(this.theta);
    line(startX,startY,endX,endY);

    if (this.theta > 3.05 || this.theta < 0.10) {
      this.lineSpeed *= -1;
    }

    this.theta += this.lineSpeed;



  }
}
class Brick 
{

  constructor(x,y, max) {

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    //this.color = (r,g,b);
    this.hitValue = int(random(1,max));
    
  }
  display() {
    
    
    rect(this.x,this.y,this.width,this.height,10);
    textSize(20);
    text(this.hitValue,this.x+19,this.y+30);
    
  
  }
  checkHit(ballX, ballY) {
        // if this "if" statement is true, then we know we have SOME kind of collision
        // we still need to figure out if it's a vertical collision or a horizontal collision
        if (ballY+25 > this.y && ballY < this.y+50 && ballX+25 > this.x && ballX < this.x+50) 
        {
            // if the ball is intersecting the top or the bottom side of the brick
            var y = false;
            var x = false;
            if ((ballY < this.y + 50 && ballY + 25 > this.y + 50) || (ballY < this.y && ballY + 25 > this.y)) 
            {
                // bounce vertically
                y = true;
            }
            
            // if the ball is intersecting the left or the right side of the brick
            if ((ballX < this.x + 50 && ballX + 25 > this.x + 50) || (ballX < this.x && ballX + 25 > this.x)) 
            {
                // bounce horizontally
                x = true;
            }
            
            if (y && !x) 
            {
                return 'y';
            }
            if (x && !y) 
            {
                return 'x';
            }
            
            // we need to check which corner it intersects
            x = 0;
            y = 0;
            
            if (ballX < this.x && ballY < this.y) 
            {
                x = 25-(this.x - ballX);
                y = 25 - (this.y - ballY);
            } 
            else if (ballX > this.x && ballY < this.y) 
            {
                x = this.x + 50 - ballX;
                y = 25 - (this.y - ballY);
            } 
            else if (ballX < this.x && ballY > this.y)
            {
                x = 25 - (this.x - ballX);
                y = this.y + 50 - ballY;
            } 
            else 
            {
                x = this.x + 50 - ballX;
                y = this.y + 50 - ballY;
            }
            
            
            if (x>y) 
            {
                return 'y';
            } 
            else 
            {
                return 'x';
            }
        }
    }

}

class Ball 
{

  constructor()
  {

    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.Speed = 7;

  }

  display(ballImage)
  {

    imageMode(CORNER);
    fill(this.r,this.g,this.b);
    image(ballImage,this.x,this.y,25,25);

  }

  update(paddle,death,boingS) 
  {

    this.x += this.xSpeed;
    this.y += this.ySpeed;
      //Hit the top border reverse Y speed (.5)
      if (this.y <= 22.5) 
      {
        this.ySpeed *= -1;
        boingS.play();
      }
      //hit side border and reverse X speed
      if (this.x < 22.5 || this.x > 770.5) 
      {
        this.xSpeed *= -1;
        boingS.play();

        if (this.x < 22.5) {
          this.x = 22.5;
        } else {
          this.x = 770.5;
        }
   
      }
      if (this.y >= 405 && this.x < paddle.x-1) 
      {
        death.play();
        missCade++;
        this.xSpeed = 0;
        this.ySpeed = 0;
        paddle.state = "aim";
      }
      if (this.y >= 405 && this.x > paddle.x+100) 
      {
        death.play();           
        missCade++;
        this.xSpeed = 0;
        this.ySpeed = 0;
        paddle.state = "aim";
      }
      
      // if (this.y >= 400) {
          
      //    this.misses +=1;
      //    this.xSpeed = 0;
      //    this.ySpeed = 0;
      //    paddle.state = "aim";
      // }

      //DO NOT PUT BOING IN HERE CADE
      if (this.y + 25 >= paddle.y && this.x > paddle.x-25 && this.x < paddle.x+100) {

        this.ySpeed *= -1;
        this.y = this.y-12.5;



        if (this.x < paddle.x+37.5) {
            this.xSpeed = abs(this.xSpeed)*-1;
          
            
        }
        else {

            this.xSpeed = abs(this.xSpeed);
            

        }
      }
    }

  checkHit(bricks,scores,misses,boingS,vanish) 
  {
  
    for (var i=0; i < bricks.length; i++)
    {

        var hit = bricks[i].checkHit(this.x,this.y);

        if (hit == "x"){
          bricks[i].hitValue--;
          this.xSpeed *= -1;
          if (bricks[i].hitValue <= 0) {
            bricks.splice(i, 1);
            i--;
            scoreCade++;
            //Sound for when a brick vanishes
            vanish.play();
          
          }
          break;
        }
        if (hit == "y") 
        {
          bricks[i].hitValue--;
          this.ySpeed *= -1;
          if (bricks[i].hitValue <= 0) 
          {
            bricks.splice(i, 1);
            i--;
            scoreCade++;
            //Sound for when a brick vanishes
            vanish.play();
          }
          break;
        }
    }

  }

}
class Play 
{

  constructor()
   {

    this.x = 400;
    this.y = 400;
    this.height = 50;
    this.width = 50;

  }

}
 class End 
{

  constructor()
   {

    this.x = width/2;
    this.y = height/2+50;
    this.height = 50;
    this.width = 50;

  }
  display()
  {
    ellipse(this.x,this.y,this.width,this.height)
  }

}

function mousePressed() 
{
  if (level.mousePressed) {
    level.mousePressed();
  }
    //infiniteScroller.mousePressed();
    //prisonEscape.mousePressed();

}
function keyPressed() 
{

  if (keyCode === 80) {
    if (level instanceof BrickBreaker) brickBreaker.bricks.length = 0;
    if (level instanceof PrisonEscape) prisonEscape.state = "gameComplete";
    if (level instanceof CaptureTheKeys) captureTheKeys.state = 2;
    if (level instanceof InfiniteScroller) infiniteScroller.playerX = 801;

    // this.playerX >= canvasWidth
  }

if (level.keyPressed) {
    level.keyPressed(key);
  }


}

//creating my class game
class PrisonEscape 
{
  constructor()
  {
    //setting up my constructor with all of my variables
    //the number of tiles in my tiles folder
    this.numTiles = 9;
    this.tiles = [];
    // load in all tiles using a loop
    for (var i = 0; i < this.numTiles; i++) 
    {
      this.tiles.push(loadImage('tiles/' + i + '.png'));
    }  
    
    //loading all of my images and sounds
    this.begin = loadImage("images/startPic.jpg");
    this.madeDummy = loadImage("images/madeDummy.jpg");
    this.outOfTime = loadImage("images/outOfTime.jpg");
    this.youKilled = loadImage("images/shanked.jpg");
    this.prisoner = loadImage("images/prisoner.png");
    this.glueCollect = loadImage("images/glue.png");
    this.paperCollect = loadImage("images/toiletPaper.png");
    this.paintCollect = loadImage("images/paint.png");
    this.jumpsuitCollect = loadImage("images/jumpsuit.png");
    this.combine = loadImage("images/yes.png");
      
    this.itemCollect = loadSound("sounds/pickUp.mp3");
    this.prisonFont = loadFont("fonts/Grooving.ttf");
    this.openDoorSound = loadSound("sounds/door.mp3");
    this.menuMusic = loadSound("sounds/beginningTheme.mp3");
    this.gameMusic = loadSound("sounds/gameMusic.mp3");
    this.voices = loadSound("sounds/voices.mp3");
    this.playerHitSound = loadSound("sounds/hitSound.mp3");
    this.dyingSound = loadSound("sounds/heartBeat.mp3");
    this.healthSound = loadSound("sounds/healthPick.mp3");
    this.ranOutOfTime = loadSound("sounds/noTime.mp3");
    this.deathMusic = loadSound("sounds/killedSound.mp3");
    this.escape = loadSound("sounds/winner.mp3");

  }

  setup()
  {
    imageMode(CORNER);
    // set up an array to hold all of our tiles
    this.levels = [];
    this.k = 1;
    this.state = "start";
    this.startTime;
    this.level;
    //setting up my health bar for the player
    this.health;
    this.healthBar = 100;
    //making the tile size and player coordinates
    this.tileSize = 50;
    this.playerX = 250;
    this.playerY = 250;
    this.prisoner;
    this.prisoners = [];
    this.enemyPrisoner;
    //counting the number of items the player has-4 means you win
    this.itemsCount = 0;
    this.enemyArray = enemyPrisoners.prisoners;
    this.menuMusic.loop();
    //setting up a loop so that 5 enemy prisoners show up
    for (var i = 0; i < 5; i++) 
    {
          
        //create a prisoner
        var newenemyPrisoner = new Enemy();
        
        //put the prisoner into the array
        this.prisoners.push(newenemyPrisoner);
    }

  }

  draw()
  {
    //setting up my different states
    if (this.state === "start")
    {
      image(this.begin,0,0);
    }

    if (this.state === "gameComplete")
    {
      image(this.madeDummy,0,0);
      this.startTime = 0;
      this.gameMusic.stop();
      this.voices.stop();
    }

    if (this.state === "dead")
    {
      image(this.outOfTime,0,0);
      this.startTime = 0;
      this.gameMusic.stop();
      this.voices.stop();
    }

    if (this.state === "prisonerDeath")
    {
      image(this.youKilled,0,0);
      this.startTime = 0;
      this.gameMusic.stop();
      this.voices.stop();
    }

    if (this.state === "play")
    {
      //printing out my tiles for each level
      this.menuMusic.stop();
      this.level = this.levels[this.k];

      for (this.row = 0; this.row < this.level.length; this.row++) 
      {
          for (this.col = 0; this.col < this.level[this.row].length; this.col++) 
          {
            // figure out which tile we want to draw (this will extract an integer from the level array that relates to the tile that should be drawn here)
            this.img = this.level[this.row][this.col];

            // now compute the position we should be drawing at
            // col = x, row = y
            // multiply by tileSize to figure out the correct offset
            this.xPos = this.col * this.tileSize;
            this.yPos = this.row * this.tileSize;
            // draw the correct tile at this position
            image(this.tiles[this.img], this.xPos, this.yPos, this.tileSize, this.tileSize);
          }
        }

        //printing out the player
        image(this.prisoner,this.playerX,this.playerY,50,50);

        //printing out the enemy prisoners and making them move
        enemyPrisoners.display();
      enemyPrisoners.move();

      //checking the coordinates to see if the player is near a wall or on the floor
        this.coords = this.checkCoordinates(this.playerX,this.playerY);
        
      this.playerTopLeft  = this.checkCoordinates(this.playerX,this.playerY);
      this.playerTopRight  = this.checkCoordinates(this.playerX + 50,this.playerY);
        this.playerBottomLeft  = this.checkCoordinates(this.playerX,this.playerY + 50);
        this.playerBottomRight  = this.checkCoordinates(this.playerX + 50,this.playerY + 50);

        //making the player move by seeing what tile they are on
        if (keyIsDown(65))
      {
        this.playerX -= 3;
        if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 1 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 1)
        {
            this.playerX += 3;
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 3 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 3)
        {
            this.k += 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 8 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 8)
        {
            this.k -= 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 2 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 2)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
          this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;
            this.itemsCount += 1;
              
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 4 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 4)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
          this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 0;
            this.itemsCount += 1;
            
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 5 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 5)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;
            this.itemsCount += 1;
            
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 6 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 6)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;
            this.itemsCount += 1;
              
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 7 || this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 7)
        {
            this.healthSound.play();
            this.healthBar += 100;
          this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;   
        }
        
      }
      //making the player move by seeing what tile they are on
      else if (keyIsDown(68))
      {
        this.playerX += 3;
        if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 1 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 1)

        {
            this.playerX -= 3;
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 3 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 3)
        {
            this.k += 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 8 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 8)
        {
          this.k -= 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 2 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 2)
        {
            this.itemCollect.play();
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0; 
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1; 
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 4 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 4)
        {
            this.itemCollect.play();
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0; 
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;     
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 5 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 5)
        {
            this.itemCollect.play();
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0; 
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;       
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 6 || this.level[this.playerBottomRight.y][this.playerBottomRight.x]=== 6)
        {
            this.itemCollect.play();
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0; 
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;       
        }

        else if (this.level[this.playerTopRight.y][this.playerTopRight.x] === 7 || this.level[this.playerBottomRight.y][this.playerBottomRight.x]=== 7)
        {
            this.healthSound.play();
            this.healthBar += 100;
          this.level[this.playerTopRight.y][this.playerTopRight.x] = 0; 
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
        }

      }
      //making the player move by seeing what tile they are on
      else if (keyIsDown(83)) 
      {
        this.playerY += 3;
        if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 1 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 1)
        {
            this.playerY -= 3;
        } 

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 3 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 3)
        {
            this.k += 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 8 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 8)
        {
            this.k -= 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 2 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 2)
        {
            this.itemCollect.play();
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;  
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;  
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 4 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 4)
        {
            this.itemCollect.play();
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;  
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;     
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 5 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 5)
        {
            this.itemCollect.play()
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;  
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;  
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 6 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 6)
        {
            this.itemCollect.play();
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;  
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0;
            this.itemsCount += 1;  
        }

        else if (this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] === 7 || this.level[this.playerBottomRight.y][this.playerBottomRight.x] === 7)
        {
            this.healthSound.play();
            this.healthBar += 100;
            this.level[this.playerBottomLeft.y][this.playerBottomLeft.x] = 0;  
          this.level[this.playerBottomRight.y][this.playerBottomRight.x] = 0; 
        }

      }
      //making the player move by seeing what tile they are on
      else if (keyIsDown(87))
      {
        this.playerY -=3;
        if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 1 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 1)
        {
            this.playerY +=3;
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 3 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 3)
        {
            this.k += 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 8 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 8)
        {
            this.k -= 1;
            this.openDoorSound.play();
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 2 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 2)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0;
            this.itemsCount += 1;
            
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 4 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 4)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0;
            this.itemsCount += 1; 
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 5 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 5)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0;
            this.itemsCount += 1; 
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 6 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 6)
        {
            this.itemCollect.play();
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0;
            this.itemsCount += 1;   
        }

        else if (this.level[this.playerTopLeft.y][this.playerTopLeft.x] === 7 || this.level[this.playerTopRight.y][this.playerTopRight.x] === 7)
        {
            this.healthSound.play();
            this.healthBar += 100;
            this.level[this.playerTopLeft.y][this.playerTopLeft.x] = 0;
            this.level[this.playerTopRight.y][this.playerTopRight.x] = 0;
        }
      }
        
      // visit each prisoner  
      for (var i = 0; i < this.prisoners.length; i++) 
      {
          // ask the prisoners to move and display
          this.prisoners[i].move();
          this.prisoners[i].display();

          //checking to see if the player is near an enemy
          var c = this.prisoners[i];
        this.tl = c.checkHit(this.playerX,this.playerY);
        this.tr = c.checkHit(this.playerX + 50, this.playerY);
        this.bl = c.checkHit(this.playerX,this.playerY + 50);
        this.br = c.checkHit(this.playerX+50,this.playerY+50);

        //if the player touches an enemy, they lose health
        if (this.tl || this.tr || this.bl || this.br)
        {
          this.healthBar -= 1;
          if (this.healthBar <= 0)
          {
            this.state = "prisonerDeath"
            this.gameMusic.stop();
            this.voices.stop();
            this.deathMusic.loop();

          } 
        }
      }

      fill(0);

      //setting up the time for my game
      this.time = int((millis() - this.startTime)/1000);
      //setting up the font
      textFont(this.prisonFont); 
      textSize(60);
      text("" + this.time, 680,70);
      textSize(40);
      text("Items Collected: " + this.itemsCount, 20,40);

      //changing the colors of the health bar
      if(this.healthBar > 50) 
      {
        
        fill(0,255,0);
      } 
      else if(this.healthBar > 25)
      {
        fill(255,215,0); 
      } 
      else 
      { 
        fill(255,0,0);
      }

      //drawing out the health bar
      rect(this.playerX, this.playerY - 10, this.healthBar/2, 5);
      fill(0);

      //changing the game state if time runs out
      if (this.time === 60)
      {
        this.state = "dead";
        this.gameMusic.stop();
        this.voices.stop();
        //ask to see how you can make it so that it doesn't loop
        this.dyingSound.stop();
        this.ranOutOfTime.play();
      }

      //changing the game state if the player collects all 4 items
      if (this.itemsCount === 4)
      {
        fill(255,255,255,70);
        rect(150,100,500,300)
        fill(0);
        textSize(45);
        textFont(this.prisonFont);
        text("Click To Combine Items",400,170);
        image(this.glueCollect,150,180,200,200);
        text("+",280,300);
        image(this.paperCollect,280,180,200,200);
        text("+",380,300);
        image(this.paintCollect,320,78,300,300);
        text("+",480,300);
        image(this.jumpsuitCollect,450,160,200,200);

        //image(combine,365,180, 60,60);

        if(mouseIsPressed)
        {
          this.state = "gameComplete"
          this.gameMusic.stop();
          this.voices.stop();
          this.dyingSound.stop();
          this.escape.loop();

        }
      }

      if (this.state === "gameComplete")
      {
        image(this.madeDummy,0,0);
        this.startTime = 0;
        this.gameMusic.stop();
        this.voices.stop();
      }

      if (this.state === "dead")
      {
        image(this.outOfTime,0,0);
        this.startTime = 0;
        this.gameMusic.stop();
        this.voices.stop();
      }

      if (this.state === "prisonerDeath")
      {
        image(this.youKilled,0,0);
        this.startTime = 0;
        this.gameMusic.stop();
        this.voices.stop();
      }
      
    }

  }

  resetLevels()
  {
    // define our level
    //make it so that if you put a door on the right you emerge from the left and that if you go back you
    //minus the levels by one-same with up and down
    this.levels[0] = 
    [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 3, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[1] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[2] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
        [1,  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[3] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 8, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[4] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[5] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[6] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[7] = [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  8, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.levels[8] = 
    [
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  gameStart()
  {
    image(begin,0,0);
    menuMusic.loop();

    if(mouseIsPressed)
    {
      state = "play";
      menuMusic.stop();
      gameMusic.loop();
      voices.loop();
      this.k = 1;

    }
  }



  gotAll()
  {
    image(madeDummy,0,0);
    startTime = 0;
    gameMusic.stop();
    voices.stop();
  }

  gameOver()
  {
    image(outOfTime,0,0);
    startTime = 0;
    gameMusic.stop();
    voices.stop();
    
  }

  stabbed()
  {
    image(youKilled,0,0);
    startTime = 0;
    gameMusic.stop();
    voices.stop();
  }
  
  checkCoordinates(x,y)
  {
    var obj = {
      x: int(x/50),
      y: int(y/50)
    }
    return obj;
  }

  mousePressed()
  {
    //setting up all other game states
    if (this.state === "start")
    {
      this.startTime = millis();
      this.healthBar = 100;
      //k = 1;
      this.itemsCount = 0;
      this.resetLevels();
      this.gameMusic.loop();
      this.voices.loop();
      this.state = "play";
    }

    if (this.state === "gameComplete")
    {
      this.escape.stop();
      levelNum++;
      level = levels[levelNum];
      level.setup();
    }

    if (this.state === "dead")
    {
      this.state = "play";
      this.startTime = millis();
      this.healthBar = 100;
      this.k = 1;
      this.itemsCount = 0;
      this.resetLevels();
      this.gameMusic.loop();
      this.voices.loop();
    }

    if (this.state === "prisonerDeath")
    {
      this.state = "play";
      this.startTime = millis();
      this.healthBar = 100;
      this.k = 1;
      this.itemsCount = 0;
      this.resetLevels();
      this.deathMusic.stop();
      this.gameMusic.loop();
      this.voices.loop();
    }

    //call the reset levels function whenever you start the game again
  }

}
 
class Enemy
{
  constructor()
  {
    //if testing prisoners, set the x and y to 250 so that it does not give you an error
    this.x = random(51,699);
    this.y = random(51,399);

    // create a "noise offset" to keep track of our position in Perlin Noise space
      this.xNoiseOffset = random(0,1000);
      this.yNoiseOffset = random(1000,2000);
      

      this.prisonerType = [];
    this.prisonerType[0] = loadImage("images/enemy1.png");
    this.prisonerType[1] = loadImage("images/enemy2.png");
    this.prisonerType[2] = loadImage("images/enemy3.png");
    this.typeOfPrisoner = random(this.prisonerType);
    
  }

  display()
  {
    image(this.typeOfPrisoner,this.x,this.y,50,50);
  }

  move()
  { 
    //prisonEscape.level = levels[prisonEscape.k];
    var level = prisonEscape.levels[prisonEscape.k];


    // compute how much we should move
      var xMovement = map( noise(this.xNoiseOffset), 0, 1, -2, 2 );
      var yMovement = map( noise(this.yNoiseOffset), 0, 1, -2, 2 );
      

      var topLeft  = prisonEscape.checkCoordinates(this.x,this.y);
      var topRight  = prisonEscape.checkCoordinates(this.x + 50,this.y);

      var bottomLeft  = prisonEscape.checkCoordinates(this.x,this.y + 50);
      var bottomRight  = prisonEscape.checkCoordinates(this.x + 50,this.y + 50);

      if (yMovement < 0 && level[topLeft.y][topLeft.x] != 1 && level[topRight.y][topRight.x] != 1)
      {
        // update our position
        this.y += yMovement;
      }

      if (level[bottomLeft.y][bottomLeft.x] != 1 && level[bottomRight.y][bottomRight.x] != 1 && yMovement > 0)
      {
        // update our position
        this.y += yMovement;
      }

      if (level[topLeft.y][topLeft.x] != 1 && level[bottomLeft.y][bottomLeft.x] != 1 && xMovement < 0)
      {
        // update our position
        this.x += xMovement;
      }

      else if (level[topRight.y][topRight.x] != 1 && level[bottomRight.y][bottomRight.x] != 1 && xMovement > 0)
      {
        // update our position
        this.x += xMovement;
      }


      this.xNoiseOffset += 0.01;
      this.yNoiseOffset += 0.01;
    }

      
  checkHit(x,y)
  {
    //checking to see if the x and y coordinates are within the prisoner and if they are then return true
    if (x > this.x && x < this.x + 50 && y > this.y && y < this.y + 50)
    {
      return true;
    }

    return false;
  }
}

class InfiniteScroller 
{
  constructor() {
    this.prison = loadImage("img/prison.png");
    this.prisoner = loadImage("img/prisoner.png");
    this.heart = loadImage("img/heart.png");
    this.brick = loadImage("img/brick.png");
    this.crashSound = loadSound("sound/crash.ogg");
    this.jumpSound = loadSound("sound/jump.ogg");
    this.music = loadSound("sound/race_background.ogg");
    this.prisonHeight = canvasHeight;
    this.prisonWidth = (1600 / 280) * this.prisonHeight;
  }

  setup() {
    this.gameStarted = false;
    this.gameLost = false;
    this.lives = 5;
    this.prisonX1 = 0;
    this.prisonX2 = this.prisonWidth;
    this.obstacleX = 400;
    this.obstacleX1 = 400;
    this.obstacleX2 = 900;
    this.obstacleX3 = 1400;
    this.playerX = 60;
    this.playerY = canvasHeight - 100;
    this.playerYSpeed = 0;
    this.jumping = false;
    this.startTime = millis();
    this.endTime = (20 * 1000);
  }

  draw() {
    if (!this.gameStarted) {
      background("black");
      textSize(60);
      textAlign(CENTER, CENTER);
      fill("white");
      text("Click to Start", 380, 200);
    } else if (this.gameLost) {
      if (this.music.isPlaying()) this.music.stop();
      background("black");
      textSize(60);
      textAlign(CENTER, CENTER);
      fill("white");
      text("NO!! You've been caught!", 380, 200);
    } else if (this.playerX >= canvasWidth) {
      if (this.music.isPlaying()) this.music.stop();

      image(endPagePic,0,0,800,500);
    } else {
      
      this.prisons = [
        image(this.prison, this.prisonX1, 0, this.prisonWidth, this.prisonHeight),
        image(this.prison, this.prisonX2, 0, this.prisonWidth, this.prisonHeight)
      ];
  
      if (this.lives > 0) image(this.heart, canvasWidth - 25, 10, 20, 20);
      if (this.lives > 1) image(this.heart, canvasWidth - 50, 10, 20, 20);
      if (this.lives > 2) image(this.heart, canvasWidth - 75, 10, 20, 20);
      if (this.lives > 3) image(this.heart, canvasWidth - 100, 10, 20, 20);
      if (this.lives > 4) image(this.heart, canvasWidth - 125, 10, 20, 20);
    
      textSize(30);
      this.remainingTime = this.endTime - millis();
    
      this.user = image(this.prisoner, this.playerX, this.playerY, 50, 50);  
  
      this.obstacle1 = image(this.brick, this.obstacleX1, canvasHeight - 110, 30, 60);
      this.obstacle2 = image(this.brick, this.obstacleX2, canvasHeight - 140, 40, 90);
      this.obstacle3 = image(this.brick, this.obstacleX3, canvasHeight - 50, 40, -80);
    
      if (this.intersectingX(this.playerX, this.playerX + 50, this.obstacleX1, this.obstacleX1 + 30)) {
        if (this.intersectingY(this.playerY, this.playerY + 50, canvasHeight - 50, canvasHeight - 50 - 60)) {
          this.crashSound.play();
          this.restart();
        }
      }
    
      if (this.intersectingX(this.playerX, this.playerX + 50, this.obstacleX2, this.obstacleX2 + 30)) {
        if (this.intersectingY(this.playerY, this.playerY + 50, canvasHeight - 50, canvasHeight - 50 -90)) {
          this.crashSound.play();
          this.restart();
        }
      }
    
      if (this.intersectingX(this.playerX, this.playerX + 50, this.obstacleX3, this.obstacleX3 + 30)) {
        if (this.intersectingY(this.playerY, this.playerY + 50, canvasHeight - 50, canvasHeight - 50 - 80)) {
          this.crashSound.play();
          this.restart();
        }
      }
    
      if (this.jumping) {
        this.playerY += this.playerYSpeed;
        this.playerYSpeed += 1;
        if (this.playerY > canvasHeight - 100) {
          this.playerY = canvasHeight - 100;
          this.jumping = false;
        }
      }
    
      if (this.remainingTime > 0) {
        textSize(14);
        text("Time to Escape: " + Math.ceil(this.remainingTime / 1000) + " seconds", 100, 10);
        this.prisonX1 = this.scroll(this.prisonX1, this.prisonWidth);
        this.prisonX2 = this.scroll(this.prisonX2, this.prisonWidth);
        this.obstacleX1 = this.scroll(this.obstacleX1, canvasWidth);
        this.obstacleX2 = this.scroll(this.obstacleX2, canvasWidth);
        this.obstacleX3 = this.scroll(this.obstacleX3, canvasWidth);
      } else {
        this.playerX += 10;
      }
    }
  }
  
  restart() {
    this.lives -= 1;
    if (this.lives < 0) this.gameLost = true;
    this.prisonX1 = 0;
    this.prisonX2 = this.prisonWidth;
    this.obstacleX = 400;
    this.obstacleX1 = 400;
    this.obstacleX2 = 900;
    this.obstacleX3 = 1400;
    this.playerX = 60;
    this.playerY = canvasHeight - 100;
    this.playerYSpeed = 0;
    this.jumping = false;
    this.startTime = millis();
    this.endTime = (20 * 1000) + millis();
  }

  mousePressed() {
    if (!this.gameStarted) {
      this.music.loop();
      this.gameStarted = true;
      this.restart();
      this.lives = 5;
    } else if (this.gameLost) {
      this.music.loop();
      this.gameLost = false;
      this.restart();
      this.lives = 5;
    }
  }

  scroll(x, width, isObject) {
    if (x <= -width && !isObject) {
      x = width - 20;
    } else {
      x -= 5;
    }

    return(x);
  }  

  intersectingX(ax1, ax2, bx1, bx2) {
    if (ax2 < bx1) return(false); // a to the left of b
    if (bx2 < ax1) return(false); // b to the left of a
    return(true);
  }

  intersectingY(ay1, ay2, by1, by2) {
    if (ay1 < by1 && ay1 < by2 && ay2 < by2 && ay2 < by2) return(false); // a above b
    if (by1 < ay1 && by1 < ay2 && by2 < ay2 && by2 < ay2) return(false); // b above a
    return(true);
  }

  keyPressed(key) {
    key = keyCode;
    if (key === 32 && this.jumping === false) {
      this.jumpSound.play();
      this.jumping = true;
      this.playerYSpeed = -17;
    }
  }
}


var CTK_playerX;
var CTK_playerY;
var CTK_playerW = 50;
var CTK_playerH = 50;

class CaptureTheKeys {
	constructor() {
		// overall game
		this.state = 0;
		this.score = 0;
		this.hits = 0;

		// key
		this.keyW = 50;
		this.keyH = 18;
		this.keyX;
		this.keyY;
		this.keyXSpeed
		this.keyYSpeed;
		this.keyTimer = 10;

		// lasers
		this.lasers = [];
		this.laserTimer = 1;
		this.totalLasers = 3;

		// images
		this.bg;
		this.playerImage;
		this.keyImage;
		this.laserHor;
		this.laserVer;
		this.laserDiag;

		// sounds
		this.music;
		this.twinkle;
		this.laser;

		// font
		this.font;
	}

	preload() {
		this.bg = loadImage('images/prison.jpg');
		this.playerImage = loadImage('images/prisoner.png');
		this.keyImage = loadImage('images/key.png');
		this.laserHor = loadImage('images/laser-h.png');
		this.laserVer = loadImage('images/laser-v.png');
		this.laserDiag = loadImage('images/laser-d.png');
		this.twinkle = loadSound('sounds/twinkle.mp3');
		this.laser = loadSound('sounds/laser.mp3');
		this.music = loadSound('sounds/escape_music.mp3');
		this.font = loadFont('fonts/octin prison rg.ttf');
	}

	setup() {
		createCanvas(800, 500);
	
		noStroke();
		background(0);
	
		// set initial positions of player and key
		CTK_playerX = width/2;
		CTK_playerY = height/2;
	
		this.keyX = random(this.keyW/2, width - (this.keyW/2));
		this.keyY = random(this.keyH/2, height - (this.keyH/2));
		this.keyXSpeed = random(-2, 2);
		this.keyYSpeed = random(-2, 2);
	
		// start music
		this.music.loop();
	}

	draw() {
		if (this.state == 0) {
			this.start();
		} else if (this.state == 1) {
			this.playGame();
		} else if (this.state == 2) {
			this.endWin();
		} else if (this.state == 3) {
			this.endLose();
		}
	}
	
	start() {
		imageMode(CORNER);
		image(this.bg, 0, 0, width, height);
	
		textAlign(CENTER);
		textFont(this.font);
		textSize(75);
		fill(255);
		text('CAPTURE THE KEYS', width/2, height/2 - 50);
		textSize(18);
		text("Move using the arrow keys and get five (5) keys to help you escape.\nWatch out for the incoming laser beams though!", width/2, height/2);
		textSize(45);
		text('CLICK THE SCREEN TO START', width/2, height/2 + 125);
	}
	
	playGame() {
		// clear background
		imageMode(CORNER);
		image(this.bg, 0, 0, width, height);
	
		// display score
		textAlign(LEFT);
		textFont(this.font);
		textSize(18);
		fill(255);
		text('Caught ' + this.score + ' keys', 30, 40);
		text('Hit by ' + this.hits + ' lasers', 30, 60);
	
		// check score
		if (this.hits == 5) {
			this.state = 3;
		}
	
		if (this.score == 5) {
			this.state = 2;
		}
	
		// create lasers
		if (frameCount % 60 == 0 && this.laserTimer > 0) {
			this.laserTimer--;
		}
	
		if (this.laserTimer <= 0 && this.lasers.length < this.totalLasers) {
			var chance = random(100);
			if (chance < 40) { // 40% chance for horizontal or vertical laser
				this.lasers.push(new LaserHor(this.laserHor));
			} else if (chance < 80) {
				this.lasers.push(new LaserVer(this.laserVer));
			} else { // 20% chance for diagonal laser
				this.lasers.push(new LaserDiag(this.laserDiag));
			}
	
			this.laserTimer = int(random(0, 2)); // add a bit of delay
		}
	
		// change position of key if too much time has passed
		if (frameCount % 60 == 0 && this.keyTimer > 0) {
			this.keyTimer--;
		}
	
		if (this.keyTimer <= 0) {
			if (CTK_playerX >= width/2) {
				this.keyX = random(this.keyW/2, width/2 - (this.keyW/2));
				this.keyY = random(this.keyH/2, height - (this.keyH/2));
			} else {
				this.keyX = random(width/2 + this.keyW/2, width/2 - (this.keyW/2));
				this.keyY = random(this.keyH/2, height - (this.keyH/2));
			}
			
			this.keyXSpeed = random(-2, 2);
			this.keyYSpeed = random(-2, 2);
			this.keyTimer = int(random(1, 8));
		}
	
		// control player with arrow keys
		if (keyIsDown(65) && CTK_playerX > CTK_playerW/2) {
			CTK_playerX -= 5;
		}
		if (keyIsDown(68) && CTK_playerX < width - (CTK_playerW/2)) {
			CTK_playerX += 5;
		}
		if (keyIsDown(87) && CTK_playerY > CTK_playerH/2) {
			CTK_playerY -= 5;
		}
		if (keyIsDown(83) && CTK_playerY < height - (CTK_playerH/2)) {
			CTK_playerY += 5;
		}
	
		// detect collision with key
		if (dist(CTK_playerX, CTK_playerY, this.keyX, this.keyY) < (CTK_playerH/2) + (this.keyW/2)) {
			// console.log('key caught!');
			this.twinkle.play();
	
			// update this.score and pick new key position
			this.score++;
			if (CTK_playerX >= width/2) {
				this.keyX = random(this.keyW/2, width/2 - (this.keyW/2));
				this.keyY = random(this.keyH/2, height - (this.keyH/2));
			} else {
				this.keyX = random(width/2 + this.keyW/2, width/2 - (this.keyW/2));
				this.keyY = random(this.keyH/2, height - (this.keyH/2));
			}
			this.keyXSpeed = random(-2, 2);
			this.keyYSpeed = random(-2, 2);
		}
	
		// detect collisions with lasers
		for (var i = 0; i < this.lasers.length; i++) {
			this.lasers[i].index = i;
			this.lasers[i].display();
			if (this.lasers[i].checkHit()) {
				// console.log('hit by laser!');
				this.laser.play();
	
				// update this.hits and remove laser from array
				this.hits++;
				this.lasers.splice(this.lasers[i].index, 1);
				i -= 1;
				continue;
      }
      
			if (this.lasers[i].checkOutside() && this.lasers[i].timer < 0) {
				// console.log('out of bounds');
				this.lasers.splice(this.lasers[i].index, 1);
				i -= 1;
				continue;
      }
    }
    
    console.log(this.lasers.length);
	
		// move key with wraparound
		this.keyX += this.keyXSpeed;
		this.keyY += this.keyYSpeed;
	
		if (this.keyX < 0) {
			this.keyX = width;
		}
		if (this.keyX > width) {
			this.keyX = 0;
		}
		if (this.keyY < 0) {
			this.keyY = height;
		}
		if (this.keyY > height) {
			this.keyY = 0;
		}
	
		// draw player and key
		imageMode(CENTER);
		image(this.playerImage, CTK_playerX, CTK_playerY, CTK_playerW, CTK_playerH);
		image(this.keyImage, this.keyX, this.keyY, this.keyW, this.keyH);
	}
	
	endWin() {
		imageMode(CORNER);
		image(this.bg, 0, 0, width, height);
	
		textAlign(CENTER);
		textFont(this.font);
		fill(255);
		textSize(24);
		text("You captured the keys and you're almost out!", width/2, height/2 - 100);
		textSize(75);
		text('READY FOR YOUR\nFINAL CHALLENGE?', width/2, height/2 + 50);
	}
	
	endLose() {
		imageMode(CORNER);
		image(this.bg, 0, 0, width, height);
	
		textAlign(CENTER);
		textFont(this.font);
		textSize(75);
		fill(255);
		text('YOU GOT CAUGHT :(', width/2, height/2 - 50);
		textSize(18);
		text('You were hit by 5 lasers\nand your escape plan has been foiled...\nfor now.', width/2, height/2);
		textSize(50);
		text('TRY AGAIN?', width/2, height/2 + 125);
	}
	
	mousePressed() {
		if (dist(mouseX, mouseY, width/2, height/2) <= width/2) {
			if (this.state == 0 || this.state == 3) {
				this.score = 0;
				this.hits = 0;
				this.state = 1;
			}
	
			if (this.state == 2) {
				this.score = 0;
				this.hits = 0;
	
				if (this.music.isPlaying()) {
					this.music.stop();
				}
	
        // transition to next game
        levelNum++;
        level = levels[levelNum];
        level.setup();
			}
		}
	}
}

/* LASERS */
class LaserHor {
	constructor(img) {
		var chanceStart = random(100);
		if (chanceStart > 50) {
			this.start = 'left';
			this.x = 0;
			this.y = random(height);
		} else {
			this.start = 'right';
			this.x = width;
			this.y = random(height);
		}

		this.image = img;
		this.w = 250;
		this.h = 11;
    this.speed = random(8, 15);
    this.timer = random(0, 10);
	}

	display() {
    this.timer--;

		if (this.start == 'left') {
			this.x += this.speed;
		}
			
		if (this.start == 'right') {
			this.x -= this.speed;
		}

		imageMode(CENTER);
		image(this.image, this.x, this.y, this.w, this.h);
	}

	checkHit() {
		if (this.start == 'left' &&
			this.x + this.w/2 >= CTK_playerX &&
			this.y >= CTK_playerY - CTK_playerH/2 &&
			this.y <= CTK_playerY + CTK_playerH/2) {
			return true;
		}

		if (this.start == 'right' &&
			this.x - this.w/2 <= CTK_playerX &&
			this.y >= CTK_playerY - CTK_playerH/2 &&
			this.y <= CTK_playerY + CTK_playerH/2) {
			return true;
		}

		return false;
	}

	checkOutside() {
		if (this.x < -(this.w/2) || this.x > width + (this.w/2)) {
			return true;
		}

		return false;
	}
}

class LaserVer {
	constructor(img) {
		var chanceStart = random(100);
		if (chanceStart > 50) {
			this.start = 'top';
			this.x = random(width);
			this.y = 0;
		} else {
			this.start = 'bottom';
			this.x = random(width);
			this.y = height;
		}

		this.image = img;
		this.w = 11;
		this.h = 250;
    this.speed = random(8, 15);
    this.timer = random(0, 10);
	}

	display() {
    this.timer--;

		if (this.start == 'top') {
			this.y += this.speed;
		}
			
		if (this.start == 'bottom') {
			this.y -= this.speed;
		}

		imageMode(CENTER);
		image(this.image, this.x, this.y, this.w, this.h);
	}

	checkHit() {
		if (this.start == 'top' &&
			this.y + this.h/2 >= CTK_playerY &&
			this.x >= CTK_playerX - CTK_playerW/2 &&
			this.x <= CTK_playerX + CTK_playerW/2) {
			return true;
		}

		if (this.start == 'bottom' &&
			this.y - this.h/2 <= CTK_playerY &&
			this.x >= CTK_playerX - CTK_playerW/2 &&
			this.x <= CTK_playerX + CTK_playerW/2) {
			return true;
		}

		return false;
	}

	checkOutside() {
		if (this.y < -(this.h/2) || this.y > height + (this.h/2)) {
			return true;
		}

		return false;
	}
}

class LaserDiag {
	constructor(img) {
		var chanceStart = random(100);
		if (chanceStart > 75) { // starts from left
			this.x = 0;
			this.y = random(height);
			this.start = 'left';
		} else if (chanceStart > 50) { // starts from bottom
			this.x = random(width);
			this.y = height;
			this.start = 'bottom';
		} else if (chanceStart > 25) { // starts from right
			this.x = width;
			this.y = random(height);
			this.start = 'right';
		} else { // starts from top
			this.x = random(width);
			this.y = 0;
			this.start = 'top';
		}

		this.image = img;
		this.w = 250;
		this.h = 250;
    this.speed = random(20, 30);
    this.timer = random(0, 15);
	}

	display() {
    this.timer--;

		if (this.start == 'left' || this.start == 'top') {
			this.x += this.speed;
			this.y += this.speed;
		}
			
		if (this.start == 'right' || this.start == 'bottom') {
			this.x -= this.speed;
			this.y -= this.speed;
		}

		imageMode(CENTER);
    image(this.image, this.x, this.y, this.w, this.h);
	}

	checkHit() {
		if (this.start == 'left' || this.start == 'top') {
			if (dist(CTK_playerX, CTK_playerY, this.x + this.w/2, this.y + this.h/2) <= CTK_playerW/2) {
				return true;
			}
		}

		if (this.start == 'right' || this.start == 'bottom') {
			if (dist(CTK_playerX, CTK_playerY, this.x - this.w/2, this.y - this.h/2) <= CTK_playerW/2) {
				return true;
			}
		}

		return false;
	}

	checkOutside() {
		if (this.x < -(this.w/2) || this.x > width + (this.w/2) || this.y < -(this.h/2) || this.y > height + (this.h/2)) {
			return true;
		}

		return false;
	}
}