let sprite, sprite2, animation, floor, floor2;
let bgImg, bgImg2;
let jumpForce = -12;
let myCoin, coinSprite;
let myMagic, magicSprite;
let myPortal, portalSprite;
let itemPickedUp = false;
let locationX = 0;
let locationY = 0;
let spacePressed = false;
let scoreSubmitted = false;

var totalTime;
var splashTime;
var gameTime;

var whichscreen = "start";
let gameInitialized = false;

// Floors
let floorBxT, floorBxS;
let floor3, floor4, floor5, floor6, floorG, floorG2;
let floorB1, floorB2, floorB3, floorB4;

let runAnimation, jumpAnimation, iwRunAnimation, iwJumpAnimation;

function preload() {
  myCoin = loadImage("Images/ActvKey-1.png");
  myMagic = loadImage("Images/MagFrag-1.png");
  myPortal = loadImage("Images/Portal.png");
  bgImg = loadImage("Images/BG1.png");
  bgImg2 = loadImage("Images/BG2.png");

  runAnimation = loadAni("Images/BlazeBaseSprite.png", {
    width: 32,
    height: 32,
    frames: [0, 1],
  });

  jumpAnimation = loadAni("Images/BlazeBaseSprite.png", {
    width: 32,
    height: 32,
    frames: [2, 3],
  });

  iwRunAnimation = loadAni("Images/IWBlaze.png", {
    width: 32,
    height: 32,
    frames: [0, 1],
  });

  iwJumpAnimation = loadAni("Images/IWBlaze.png", {
    width: 32,
    height: 32,
    frames: [2, 3],
  });
}

function setup() {
  createCanvas(1000, 500);
  // DON'T set up the game here!
}

function draw() {
  if (whichscreen === "start") {
    startScreen();
  } else if (whichscreen === "maingame") {
    mainGame();
  } else {
    endScreen();
  }

  totalTime = millis();
}

function keyPressed() {
  if (whichscreen === "start") {
    whichscreen = "maingame";
    if (!gameInitialized) {
      initGame(); // Set up sprites when game begins
    }
  }
}

function startScreen() {
  background("purple");
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Press any key to start the adventure!", width / 2, height / 2);

  splashTime = totalTime;
}

function initGame() {
  world.gravity.y = 5;

  sprite = new Sprite(100, 200, 8, 13);
  sprite.scale = 4;
  sprite.addAni(runAnimation);
  sprite.ani.pause();
  //ssprite.debug = true;

  floor = new Sprite(100, 250, 200, 30, STATIC);
  floor.color = "lightgreen";

  floor2 = new Sprite(550, 330, 350, 30, STATIC);
  floor2.color = "lightgreen";

  floorG = new Sprite();
  floorG.color = "green";
  floorG.width = 1000;
  floorG.height = 60;
  floorG.y = 480;
  floorG.physics = STATIC;

  floorBxT = new Sprite(65, 310, 130, 20, STATIC);
  stroke(75, 66, 75);
  floorBxT.color = (75, 66, 75);

  floorBxS = new Sprite(120, 390, 20, 150, STATIC);
  stroke(75, 66, 75);
  floorBxS.color = (75, 66, 75);

  coinSprite = new Sprite(160, 425, 2, 2);
  coinSprite.img = myCoin;
  coinSprite.scale = 2;
  coinSprite.collider = "none";

  magicSprite = new Sprite(50, 390, 4, 8);
  magicSprite.img = myMagic;
  magicSprite.scale = 2;
  magicSprite.collider = "none";
  magicSprite.debug = true;

  objFloors();

  let ceiling = new Sprite (540,380,240,20,STATIC);
  ceiling.visible = false;

  floor3 = new Sprite(950, 400, 90, 20, STATIC);
  floor3.color = (75, 66, 75);
  floor4 = new Sprite(805, 360, 90, 20, STATIC);
  floor4.color = (75, 66, 75);
  floor5 = new Sprite(550, 290, 90, 20, STATIC);
  floor5.color = (75, 66, 75);
  floor6 = new Sprite(690, 230, 90, 20, STATIC);
  floor6.color = (75, 66, 75);

  floorG2 = new Sprite(900, 210, 200, 20, STATIC);
  floorG2.color = "lightgreen";

  portalSprite = new Sprite(950, 150, 20, 20);
  portalSprite.img = myPortal;
  portalSprite.scale = 4;
  portalSprite.collider = "none";

  gameInitialized = true;
}

function objFloors() {
  floorB1 = new Sprite(420, 400, 20, 120, STATIC);
  floorB1.color = (75, 66, 75);
  floorB2 = new Sprite(500, 400, 20, 120, STATIC);
  floorB2.color = (75, 66, 75);
  floorB2.collider = "none";
  floorB3 = new Sprite(580, 400, 20, 120, STATIC);
  floorB3.color = (75, 66, 75);
  floorB4 = new Sprite(660, 400, 20, 120, STATIC);
  floorB4.color = (75, 66, 75);
  floorB4.collider = "none";
}

function mainGame() {

  if(whichscreen ==="end"){
    return;
  }
  if (itemPickedUp && kb.pressing(" ")){
    background(bgImg2);
  }else{
    background(bgImg);
  }
  if (!sprite) return;

  sprite.rotation = 0;

  sprite.x = constrain(sprite.x, 0, width - sprite.width);
  sprite.y = constrain(sprite.y, 0, height - sprite.height);

  drawFrame();

  splashTime = splashTime;
  gameTime = int((totalTime - splashTime)/1000);

  fill("white");
  textAlign(CENTER, CENTER);
  textSize(40);
  text('Time:',500,70);
  text(gameTime,580,70);

  // textSize(40);
  // text('Time:',500,70);
  // text(gameTime,580,70);

  if (itemPickedUp){
    fill("yellow");
    textSize(20);
    textAlign(LEFT, TOP);
    text("Press SPACE to activate your power!", 10, 350);
  }

  if (sprite.overlaps(portalSprite)) {
    allSprites.vel.x=0;
    allSprites.vel.y=0;
    world.gravity.y=0;
    whichscreen = "end";
  }
}

function drawFrame() {
    //if (whichscreen === "end") return;

  if (sprite && coinSprite && sprite.overlaps(coinSprite)) {
    coinSprite.delete();
    floorBxS.delete();
  }

  if (sprite && magicSprite && sprite.overlaps(magicSprite)) {
    magicSprite.delete();
    itemPickedUp = true;
  }

  if (itemPickedUp && kb.pressing(" ")) {
    if (floorB1) {
      //floorB1.visible = false;
      floorB1.collider = "none";
      //sprite.overlaps(floorB1);
    }
    if (floorB3) {
      //floorB3.visible = false;
      floorB3.collider = "none";
    }

    world.gravity.y = 3;

     if (keyIsDown(UP_ARROW) && sprite.colliding(allSprites)) {
      sprite.velocity.y = -jumpForce;
      sprite.ani = iwJumpAnimation;
      sprite.ani.play();
    }
    if (keyIsDown(RIGHT_ARROW)) {
      sprite.scale.x = 4;
      sprite.x += 1;
      sprite.ani.play();
    } else if (keyIsDown(LEFT_ARROW)) {
      sprite.scale.x = -4;
      sprite.x -= 1;
      sprite.ani.play();
    // } else if (keyIsDown(UP_ARROW)) {
    //   sprite.velocity.y = jumpForce;
    //   sprite.ani = iwJumpAnimation;
    //   sprite.ani.play();
    } else {
      sprite.ani = iwRunAnimation;
      sprite.ani.pause();
    }

    //world.gravity.y = 2;

    // if (floorB1) floorB1.visible = true;
    // if (floorB3) floorB3.visible = true;

    //background(bgImg2);
  } else {
    world.gravity.y = 5;

    if(floorB1){
      floorB1.collider = "static";
    }
    if(floorB3){
      floorB3.collider = "static";
    }

    if (keyIsDown(UP_ARROW) && sprite.colliding(allSprites)) {
      sprite.velocity.y = -jumpForce;
      sprite.ani.play();
    }
    if (keyIsDown(RIGHT_ARROW)) {
      sprite.scale.x = 4;
      sprite.x += 1;
      sprite.ani.play();
    } else if (keyIsDown(LEFT_ARROW)) {
      sprite.scale.x = -4;
      sprite.x -= 1;
      sprite.ani.play();
    // } else if (keyIsDown(UP_ARROW)&& sprite.colliding(allSprites)) {
    //   sprite.velocity.y = -jumpForce;
    //   sprite.ani.play();
    } else {
      sprite.ani = runAnimation;
      sprite.ani.pause();
    }
  }
  // if (sprite.overlaps(portalSprite)) {
  //   whichscreen = "end";
  // }
}

function endScreen() {
  background("purple");
  allSprites.visible = false;

  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("End of Adventure", width / 2, height / 2-150);
  gameTime = gameTime; //stop game time

  text("Your time was" + " " + gameTime +"seconds", width/2, height/2-100);

  if(!scoreSubmitted){
    fill("yellow");
    textSize(24);
    text("Type your name below and press ENTER", width / 2, height / 2 - 20);
    scoreSubmit(gameTime);
  } else{
    fill("lightgreen");
    textSize(28);
    text("✓ Score Submitted!", width / 2, height / 2 + 100);
  }
}

function scoreSubmit(time){
  let nameInput = document.getElementById('player-name');
  nameInput.style.display = 'block';
  nameInput.focus();

  nameInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && nameInput.value){
      fetch('/leaderboard',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: nameInput.value,
          score: time
        })
      });
      scoreSubmitted = true;
      nameInput.style.display = "none";
      document.getElementById('leaderboard-link').style.display = 'block';
    }
  })
    // .then(response => response.json())
    // .then(data =>{
    //   console.log(data);
    //   scoreSubmitted = true;
    // })
    // .catch(error =>{
    //   console.log(error);
    // });
  }

document.getElementById('reset-btn').addEventListener('click', function() {
  // Reset game state variables
  whichscreen = "start";
  gameInitialized = false;
  itemPickedUp = false;
  spacePressed = false;
  scoreSubmitted = false;
  
  // Delete all sprites
  if (allSprites && allSprites.length > 0) {
    allSprites.forEach(sprite => sprite.remove());
  }
  
  // Reset physics
  if (world) {
    world.gravity.y = 0;
  }
  
  sprite = null;
  coinSprite = null;
  magicSprite = null;
  portalSprite = null;
  floor = null;
  floor2 = null;
  floorG = null;
  floorG2 = null;
  floorBxT = null;
  floorBxS = null;
  floor3 = null;
  floor4 = null;
  floor5 = null;
  floor6 = null;
  floorB1 = null;
  floorB2 = null;
  floorB3 = null;
  floorB4 = null;
  
  console.log("Game reset!");
});