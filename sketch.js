var ghost, ghostImg;
var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleblockGroup;
var gameState = "play";
var snd;

function preload(){
  snd = loadSound("spooky.wav")
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
  
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  snd.loop();
  
}

function draw(){
  background("black");
  
  if(gameState == "play"){
    if(keyDown("space")){
    ghost.velocityY = -8;
  }
  
  if(keyDown("a")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("d")){
    ghost.x = ghost.x +3;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleblockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
    gameState = "end";
    }
  
    ghost.velocityY = ghost.velocityY + 0.5 ;
    if(tower.y > 400){
      tower.y = 300;
    }
    
    spawnDoors();
    drawSprites();
  }
  if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(35);
    text("GAME OVER", 230, 250);
    
  }
  

  
  
  
  
  
}
function spawnDoors(){
  if(frameCount % 240 == 0){
    door = createSprite(Math.round(random(120, 400)), -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    
    invisibleblockGroup.add(invisibleBlock);
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
  } 
}