var bg,bgImage;
var base,baseGroup,base1,base1Group;
var baseImage,base1Image;
var boy,boyImage;
var gameState = 0 ;// 0 represent PlayGameState
var knifeGroup,knife,knifeImage;
var score = 0 ;
var jumpSound,checkPointSound;
var high = 0;


function preload(){
    bgImage = loadImage("Images/tower.png");
    baseImage = loadImage("Images/base.png");
    base1Image = loadImage("Images/base1.png");
    boyImage = loadImage("Images/human.png");
    knifeImage = loadImage("Images/knife.png");
    jumpSound = loadSound("sound/jump.mp3");
    checkPointSound = loadSound("sound/checkPoint.mp3");
}
function setup(){
    createCanvas(windowWidth/2,windowHeight);
    bg = createSprite(width/2,height/2,width,height);
    bg.addImage(bgImage);
    bg .scale = 1.7;
    bg.velocityY = 3;

    boy=createSprite(width/2,-200,10,10);
    boy.addImage(boyImage);
    boy.scale=0.3;
    boy.velocityY = 0;

    baseGroup = new Group();
    base1Group = new Group();
    knifeGroup = new Group();
}
function draw(){
    background(0);
    if (gameState === 0){
        Base();
        Base1();
        Knife();
        if(keyDown(LEFT_ARROW)){
            boy.x -= 3;
        }
        else if(keyDown(RIGHT_ARROW)){
            boy.x += 3;
        }
        boy.velocityY += 0.05;
        if (baseGroup.isTouching(boy) && boy.y > 10 ){
            boy.velocityY = -3;
            jumpSound.play()
        }
        if (base1Group.isTouching(boy) && boy.y > 10){
            boy.velocityY = -3;
            jumpSound.play()
            base1Group.destroyEach();
        }
        if (boy.y >height/5){
            if (knifeGroup.isTouching(boy) || boy.y > height+100){
            gameState = 1;
           }
        }       
        if(bg.y > 600){
            bg.y = height/2;
        }
        if (score %30 ===  0 && score > 0 ){
            checkPointSound.play();
        }
        score += Math.round(getFrameRate()/60.5) ; 
        //high = score
        }
    else if(gameState===1){
        bg.visible = false;
        boy.destroy();
        baseGroup.destroyEach();
        base1Group.destroyEach();
        knifeGroup.destroyEach();
        textSize(50);
        fill(255,0,0);
        text("Game Over !",width/2 - 100,height/2-30);
        textSize(30);
        text("PLEASE TRY AGAIN BY PRESSING SPACE",width/2 - 250,height/2+60);
        if (keyDown(32)){
            gameState = 0;
            bg.visible = true;
            boy=createSprite(width/2,-200,10,10);
            boy.addImage(boyImage);
            boy.scale=0.3;
            if (high < score){
                high = score;
            }
            score = 0 ; 
        }
    }
    drawSprites()
    textSize(30);
    fill("yellow")
    text("Time of Survival: "+ score,width - 400, 50);
    text("High Score: " + high , 50,50)
}
function Base(){
    if (frameCount % 50 === 0 ){
        base = createSprite(0,-10,10,10);
        base.x = Math.round(random(200,width-200));
        base.addImage(baseImage);
        base.velocityY = 5;
        base.lifetime = 510;
        base.depth = boy.depth;
        boy.depth +=1;
        baseGroup.add(base)
        base.debug = true;
        base.setCollider("rectangle",0,-10,base.width,10)
    }
}
function Base1(){
    if (frameCount % 210 === 0 ){
        base1 = createSprite(0,-10,10,10)
        base1.x = Math.round(random(200,width-200))
        base1.addImage(base1Image)
        base1.velocityY = 5;
        base1.lifetime = 510;
        base1.depth = boy.depth;
        boy.depth +=1;
        base1Group.add(base1);
        base1.setCollider("rectangle",0,-10,base1.width,10)
    }
} 
function Knife(){
    if (frameCount % 100 === 0 ){
        knife = createSprite(0,-50,10,10)
        knife.x = Math.round(random(200,width-200))
        knife.addImage(knifeImage);
        knife.scale = 0.5;
        knife.velocityY = 6 ;
        knife.lifetime = 510;
        knife.depth = boy.depth;
        boy.depth +=1;
        knifeGroup.add(knife);
    }
} 