const gameBoard=document.getElementById('gameBoard');
const context=gameBoard.getContext('2d');
// context for drawing,coloring
const scoreText=document.getElementById('scoreVal');
const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
//to choose x and y random for food
const UNIT=25;
let foodX;
let foodY;
//moves in x direction left to right
let xVel=25;
let yVel=0;
let score=0;
//if strike in wall out
let active=true;
let started=false;


let snake = [
    //for sanke to bend 4 parts
   {x:UNIT*3,y:0},
   //4th part
   {x:UNIT*2,y:0},
   //3rd part
   {x:UNIT,y:0},
  //second part
   {x:0,y:0}

];
//keydown event
window.addEventListener('keydown',keyPress)

startGame();


function startGame(){
  context.fillStyle= '#212121';
//fillRect(xstart.ystart,width,height)
  context.fillRect(0,0,WIDTH,HEIGHT);
  createFood();
  displayFood();
 //drawSnake();
  //moveSnake();
  //clearBoard();
  //drawSnake();
 // nextTick();
 drawSnake();

}
function clearBoard(){
  context.fillStyle= '#212121';
  //fillRect(xstart.ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);

}

function createFood(){
    // for random places that are factors of 500
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
    
}
function displayFood(){
context.fillStyle='red';
context.fillRect(foodX,foodY,UNIT,UNIT);
}
// going to loop all four coordinates and going to increase its size
function drawSnake(){
    context.fillStyle='aqua';
    //take all values of array one by one
    context.strokeStyle='#212121';
    snake.forEach((snakePart)=>{
      //it fully fills the rectangle of snake created
      context.fillRect(snakePart.x, snakePart.y,UNIT,UNIT)
      //it draws onetime the rectangle (outline)
      context.strokeRect(snakePart.x, snakePart.y,UNIT,UNIT)
    })
    
    }
    function moveSnake(){
      //1,2,3,4=> changes to 2,3,4,5(snake)
      //velocity get addted to increase by 25
      //left to right
      const head={x:snake[0].x+xVel,y:snake[0].y+yVel}
      //add head to snake at 5
      snake.unshift(head)
      //creating anew element and adding it as head and removing last element to show that snake is growing
      //to show that it grow we should not pop it
      //if x coordinate of snake match with x coordinate of food and y the same then snake eat the food
      if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent=score; 
        createFood();
      }
      // if does not eat it should not grow
      else{
        snake.pop();
      }
      //delete first rect 1
      //     snake.pop()
    
    }// to run again and again
    function nextTick(){
      // to move when any tab is pressed
      if(active){
      setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameover();
        nextTick();

      },200);
    } 
    else{
      clearBoard();
      context.font="bold 50px serif";
      context.fillStyle="white";
      context.textAlign="center";
      // to make it center align 
      context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)

    }
    }
    function keyPress(){

      if(!started){
        started=true;
        nextTick();
      }
      const LEFT=37
      const UP=38
      const RIGHT=39
      const DOWN=40

      
    switch(true){
       // TO move in left side so decrease
        // x velocity positive means snake is moving 
        //in right direction so in left condition it should 
        //not move left so using check condition
        //1. IF it is going right then make it should not mone left
      //left key pressed and not going right
      case(event.keyCode==LEFT  && xVel!=UNIT):
          xVel=-UNIT;
          yVel = 0;
          break;
          //if y is positive to move it in left side make y as 0
      //right key pressed and not going left
      case(event.keyCode==RIGHT && xVel!=-UNIT):
          xVel=UNIT;
          yVel=0;
          break;
      //Up key pressed and not going down
      //now y is changed to go up y need to decrease
      case(event.keyCode==UP && yVel!=UNIT):
          xVel=0;
          yVel=-UNIT;
          break;
      //down key pressed and not going up
      case(event.keyCode==DOWN && yVel!=-UNIT):
          xVel=0;
          yVel=UNIT;
          break



      }
    }

function checkGameover(){
  switch(true){
    //x<0 (negative)means it strike on left wall
    case(snake[0].x<0):
    case(snake[0].x>=WIDTH):
    //stike on upper wall
    case(snake[0].y<0):
    case(snake[0].y>=HEIGHT):
    active=false;
    break;
  }

//check snake head collision with snake body
   for(let i = 1; i < snake.length; i+=1){
      if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
          active = false;
      }
    }
  }
