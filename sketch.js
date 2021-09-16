var boy,boyImg,boyShootImg,bgImg,bg;
var edges,invi,bullet,bulletImg;
var zombieGroup,bulletGroup;
var zombie,zombieImg;
var bulletCount,fakeCount,lose,life1Img,life3Img,life2Img,life1,life2,life3;
var gameState = "play";
var life = 3;
var score = 0;


function preload(){
boyImg = loadImage("shooter_2.png");
bgImg = loadImage("bg.jpeg");
boyShootImg = loadImage("shooter_3.png");
zombieImg = loadImage("zombie.png");
life1Img = loadImage("heart_1.png");
life2Img = loadImage("heart_2.png");
life3Img = loadImage("heart_3.png");
lose = loadSound("lose.mp3");
lose.looping = false;
}

function setup(){
createCanvas(1200,600);

invi = createSprite(600,200,1500,10);

bg = createSprite(600,300,1200,600);
bg.addImage(bgImg);

boy = createSprite(300,400,50,50);
boy.addImage(boyImg);
boy.setCollider("rectangle",0,0,250,450);
boy.scale = 0.1;

life1 = createSprite(1050,50,50,50);
life1.addImage(life1Img);
life1.scale = 0.3;
life1.visible = false;

life2 = createSprite(1050,50,50,50);
life2.addImage(life2Img);
life2.scale = 0.3;
life2.visible = false;

life3 = createSprite(1050,50,50,50);
life3.addImage(life3Img);
life3.scale = 0.3;


zombieGroup = new Group();
bulletGroup = new Group();

bulletCount = 100;
fakeCount = 100;
edges = createEdgeSprites();
}

function draw(){
background("white");

boy.collide(edges);
boy.collide(invi);


if(gameState === "play"){

  if(life === 3){
    life3.visible = true;
    life2.visible = false;
    life1.visible = false;
}

if(life === 2){
   life2.visible = true;
   life3.visible = false;
   life1.visible = false;
}

if(life === 1){
   life1.visible = true;
   life2.visible = false;
   life3.visible = false;
}

if(life === 0){
  gameState ="lifeOver";
}

if(score === 20){
  gameState = "win";
}


    if(keyDown(UP_ARROW)){
        boy.y = boy.y-5;
    }
    if(keyDown(DOWN_ARROW)){
        boy.y = boy.y+5;
    }
    if(keyDown(LEFT_ARROW)){
        boy.x = boy.x-5;
    }
    if(keyDown(RIGHT_ARROW)){
      boy.x = boy.x+5;
  }

  if(keyWentDown("space")){
    createBullets();
    bulletCount = bulletCount - 10;
        boy.addImage(boyShootImg);
 }

 else if(keyWentUp("space")){
    boy.addImage(boyImg);
 }

 if(bulletCount==0){
  gameState = "bullet"  
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length; i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
  score = score + 10;
  zombieGroup[i].destroy();
  bulletGroup.destroyEach();
  }
  }

}

if(zombieGroup.isTouching(boy)){

  for(var i =0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(boy)){
      zombieGroup[i].destroy()
     
     life=life-1
      } 
  }
    }
       

    if(zombieGroup.isTouching(edges[0])){

      for(var i =0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(edges[0])){
          zombieGroup[i].destroy()
         
         life=life-1
          } 
      }
        }
    spawnZombies();
}
drawSprites();
    fill("yellow");
    textSize(25);
    text("Score: " + score, 1000,100);
    text("Bullets: " + bulletCount, 1000,150);
    text(life,width/2,height/2);

   
    //if(fakeCount <= 0){
      //  lose.play();
      //  gameState = "bulletOver";
       // fakeCount = fakeCount + 1000000;
      //  }

  
if(gameState === "lifeOver"){

  boy.destroy();
  life1.x = 4000;
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();

  fill("red");
  textSize(40);
  text("😔Game over😔,",width/2,height-200);
  text("because your life got over!!",width/2,height-150);

}

if(gameState === "gameOver"){

  boy.destroy();
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();

  
  fill("red");
  textSize(40);
  text("😔Game over😔,",width/2,height-200);
  text("because Zombie touched edge", width/2,height - 150)
}

 else if(gameState === "bulletOver"){

    boy.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  
    fill("red");
    textSize(40);
    text("😔Game over😔,",width/2,height-200);
    text("because your bullet got over!!",width/2,height-150);
  
  }

  if(gameState === "win"){
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
    boy.destroy();
    
    fill("white");
    textSize(40);
    text("You win the game",width/2,height-200);
   }






}

function createBullets(){

bullet = createSprite(boy.x,boy.y,8,5);
bullet.velocityX = 10;
bulletGroup.add(bullet);

}

function spawnZombies(){

if(frameCount % 50 === 0){
zombie = createSprite(random(820,1300),random(210,570),8,5);
zombie.addImage(zombieImg);
zombie.setCollider("rectangle",0,0,250,850);
zombie.scale = 0.1;
zombie.velocityX = -5;
zombie.lifetime = 300;
zombieGroup.add(zombie);
}
}

