// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,enemyImage,fighterImage,gameoverImage,missileImage;
let fighterX = canvas.width/2-32                                      //우주선 좌표
let fighterY = canvas.height-64

let missileList = []  //총알들을 저장하는 리스트

let gameover=false //true면 gameover false 면 not gameover
let score = 0 //점수판
function Missile(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x = fighterX + 16;
        this.y = fighterY
        this.alive=true //true 살아있는 총알 false 죽은 총알
        missileList.push(this)         //this 에 push
    }
    this.update = function(){        //총알의 y 좌표
        this.y -= 7;                 //총알의 속도 조절
    };

  this.checkHit=function(){

    for(let i=0; i < enemyList.length; i++){
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x+40
      ) {
        score++;
        this.alive = false //죽은 총알
        enemyList.splice(i,1);
      }
        
    }
  };  
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList=[]  //적군의 리스트
function Enemy(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.y=0;
        this.x=generateRandomValue(0,canvas.width-64) ;     //적군의 랜덤 위치
        enemyList.push(this);
    }
    this.update = function(){                               
        this.y += 1;                                        //적군의 속도 조절

        if(this.y >= canvas.height - 32){
            gameover = true;
        }
    };
}

function loadImage(){                                                 //이미지 불러오기
    backgroundImage = new Image();
    backgroundImage.src="images/background.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    fighterImage = new Image();
    fighterImage.src="images/fighter.png";

    gameoverImage = new Image();
    gameoverImage.src="images/gameover.png";

    missileImage = new Image();
    missileImage.src="images/missile.png";

}

let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown", function (event) {       //키확인
        keysDown[event.keyCode]=true;
    });
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];

        if(event.keyCode == 32){
            createMissile()
        }
    });
}

function createMissile(){       //총알 생성
    let m = new Missile;
    m.init()
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    },1000)
}

function update(){
    if( 39 in keysDown){    // 오른쪽움직임
        fighterX += 4;
    }
    if( 37 in keysDown){
        fighterX -= 4;      // 왼쪽 움직임
    }

    if(fighterX <= 0){               //왼쪽벽막기
        fighterX=0;
    }
    if(fighterX >= canvas.width-64){  //오른쪽벽막기
        fighterX = canvas.width-64;
    }
    for(let i=0; i < missileList.length; i++){
        if(missileList[i].alive){
            missileList[i].update();
            missileList[i].checkHit();
        }
    }
    for(let i=0; i < enemyList.length; i++){
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0,canvas.width,canvas.height);      //랜더
    ctx.drawImage(fighterImage,fighterX,fighterY);                        //우주선 위치 랜더
    ctx.fillText(`점수:${score}점`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    for(let i=0; i<missileList.length; i++){
        if(missileList[i].alive){
            ctx.drawImage(missileImage,missileList[i].x,missileList[i].y)       //리스트에 있는 총알 이미지를 랜더
        }
            
    }
    for(let i=0; i < enemyList.length; i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
    if(!gameover){
    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main); 
    }else{
        ctx.drawImage(gameoverImage,10,100,380,380);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();