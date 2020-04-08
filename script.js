//Variables for game board
var cborder="#ccb5b5";
var ccolor="#171414";
var Canvas=document.getElementById("board");
var dimen=Canvas.getContext("2d");

var snake=[{x:300,y:300},{x:290,y:300},{x:280,y:300},{x:270,y:300}]
var dx=10;
var dy=0;
var score=0;
var temp;
var t=1;

function drawSnake()
{
    snake.forEach(designSnake);
}

function designSnake(snakePart)
{
    dimen.fillStyle="#b18e8e";
    dimen.strokeStyle="#9a5238";
    dimen.fillRect(snakePart.x,snakePart.y,10,10);
    dimen.strokeRect(snakePart.x,snakePart.y,10,10);
}

function blankCanvas()
{
    dimen.fillStyle=ccolor;
    dimen.strokeStyle=cborder;
    dimen.fillRect(0,0,board.width,board.height);
    dimen.strokeRect(0,0,board.width,board.height);

}

function advance()
{
    temp=score;
    const head={x:snake[0].x+dx,y:snake[0].y+dy};
    snake.unshift(head);
    const eat=snake[0].x==X && snake[0].y==Y;
    if(eat)
        {
            score = score+2;
            document.getElementById("score").innerHTML=score;
            createFood();
            drawFood();
        }
    else
        {
            snake.pop();
        }
}

function main()
{
    if (EndGame()) 
    { alert("The game is over.");
        return;
    }
  setTimeout(function onTick(){blankCanvas();createFood();drawFood();advance();drawSnake();main();},100);

}
document.addEventListener("keydown",directions)
function directions(event)
{
    const left=37;
    const right=39;
    const up=40
    const down=38;
    const key=event.keyCode;
    const goUp=dy==10;
    const goDown=dy==-10;
    const goLeft=dx==-10;
    const goRight=dx==10;
    
    if(key==left && !goRight)
        {
            dy=0;dx=-10;
        }
    
    if(key==right && !goLeft)
        {
            dy=0;dx=10;
        }
    
    if(key==up && !goDown)
        {
            dy=10;dx=0;
        }
    
    if(key==down && !goUp)
        {
            dy=-10;dx=0;
        }
}

 function randomTen(min, max)
{
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood()
{
    if(t==1 || score!= temp)
        {
            X=randomTen(0,board.width-10);
            Y=randomTen(0,board.height-10);
            snake.forEach(function foodinSnake(part){
                  const foodisonsnake=part.x==X && part.y==Y; if(foodisonsnake) createFood();
                  });
            t++;
        }
    else return;
            
}

function drawFood()
{
           dimen.fillStyle="#adcfed";
            dimen.strokeStyle="#484545";
            dimen.fillRect(X,Y,10,10);
            dimen.strokeRect(X,Y,10,10);
            
}

function EndGame()
{
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }

      const LeftWall = snake[0].x < 0;
      const RightWall = snake[0].x > board.width - 10;
      const ToptWall = snake[0].y < 0;
      const BottomWall = snake[0].y > board.height - 10;

      return LeftWall || RightWall || ToptWall || BottomWall
}
setTimeout(function onTick(){main();},3000);