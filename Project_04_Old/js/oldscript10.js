/**************************************************
Project 04:
Carlos-Enrique Salazar Aguilar


**************************************************/

// Strict command.
"use strict";

// Font variables.
let gamefont;

// HUD Visuals variables;
let gamebordersimage;
let cursortargetimage;
let cursorgoodtargetimage;
let cursorbadtargetimage;

// Player visuals variables.
let bazooka1image;
let bazooka2image;
let bazooka3image;

// Missile visuals variables.
let missile1image;
let missile2image;
let missile3image;

// Cow visuals variables.
let cowidleimage;

// UFO visuals variables.
let ufoimage;
let ufoexplosionimage;

// Global Visuals variables.
let gamebackgroundimage;
let gamecolorimage;
let gamelightimage;
let gamedesaturateimage;
let gamestaticimage;
let gamestaticdisruptimage;

// Game Title Visuals variables.
let gametitleimage;
let gametitleclickimage;
let gametitlechoosedifficultyimage;
let gametitleprotectcowsimage;

// Game Difficulty Visuals variables.
let gametitledifficultyimage;
let gametitleeasyimage;
let gametitlenormalimage;
let gametitlehardimage;

// Game Visuals variables.
let gamehousesimage;
let gamefenceimage;
let gamefaunaimage;

// FPS variable.
let fr = 30;

// Counter variable.
let counter = 0;

// Difficulty Setting variable.
let difficultysetting = 0;

// Score variable.
let starttimecounter = 0;
let starttimeleft = 0;

// Cowsleft variable.
let cowsleft = 3;

// Score variable.
let reloadtimecounter = 0;
let reloadtimeleft = undefined;

// Players variables.
let players = [];
let numplayers = 1;

// Missiles variables.
let missiles = [];

// Cows variables.
let cows = [];
let numcows = 1;
let cow1;
let cow2;
let cow3;
let mootimecounter = 0;
let mootimeleft = 0;

// UFOs variables.
let ufos = [];
let numufos = 1;
let ufo1;
let ufo2;
let ufo3;

// Ending variables.
let gameendingwonimage;
let gameendinglostimage;
let gameendingplayagainimage;

var ufo1health = 3;
var ufo2health = 3;
var ufo3health = 3;

var damage = 1;

var abduct = 0;

function preload() {
  // Fonts.
  gamefont = loadFont("assets/Gameplay.ttf");

  // HUD visuals.
  gamebordersimage = loadImage("assets/images/gameborders.png");
  cursortargetimage = loadImage("assets/images/cursortarget.png");
  cursorgoodtargetimage = loadImage("assets/images/cursorgoodtarget.png");
  cursorbadtargetimage = loadImage("assets/images/cursorbadtarget.png");

  // Player visuals.
  bazooka1image = loadImage("assets/images/gamebazooka1.png");
  bazooka2image = loadImage("assets/images/gamebazooka2.png");
  bazooka3image = loadImage("assets/images/gamebazooka3.png");

  // Missile visuals.
  missile1image = loadImage("assets/images/gamemissile4.png");
  // Cow visuals.
  cowidleimage = loadImage("assets/images/cowidle.gif");

  // UFO visuals.
  ufoimage = loadImage("assets/images/gameufo.png");
  ufoexplosionimage = loadImage("assets/images/gameexplosion.gif");

  // Global Visuals.
  gamecolorimage = loadImage("assets/images/gamecolor.png");
  gamelightimage = loadImage("assets/images/gamelight.png");
  gamedesaturateimage = loadImage("assets/images/gamedesaturate.png");
  gamestaticimage = loadImage("assets/images/static2.gif");
  gamestaticdisruptimage = loadImage("assets/images/static3.gif");

  // Game Title Screen Visuals.
  gametitleimage = loadImage("assets/images/gametitle.png");
  gametitleclickimage = loadImage("assets/images/gametitleclick.png");
  gametitlechoosedifficultyimage = loadImage(
    "assets/images/gametitlechoosedifficulty.png"
  );
  gametitleprotectcowsimage = loadImage(
    "assets/images/gametitleprotectcows.png"
  );

  // Game Difficulty Screen Visuals.
  gametitledifficultyimage = loadImage("assets/images/gametitledifficulty.png");
  gametitleeasyimage = loadImage("assets/images/gametitleeasy.png");
  gametitlenormalimage = loadImage("assets/images/gametitlenormal.png");
  gametitlehardimage = loadImage("assets/images/gametitlehard.png");

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/gamebackground.png");
  gamehousesimage = loadImage("assets/images/gamehouses.png");
  gamefenceimage = loadImage("assets/images/gamefence.png");
  gamefaunaimage = loadImage("assets/images/gamefauna.png");

  // Game ending.
  gameendingwonimage = loadImage("assets/images/gameendingwon.png");
  gameendinglostimage = loadImage("assets/images/gameendinglost.png");
  gameendingplayagainimage = loadImage("assets/images/gameendingplayagain.png");
}

// State Variable.
let state = "title";

// Function Setup.
function setup() {
  createCanvas(800, 800);
  // FPS.
  frameRate(fr);
  // Removes cursor.
  noCursor();

  for (let i = 0; i < numplayers; i++) {
    // player X and Y spawn.
    let x = 400;
    let y = 760;

    let player = new Player(x, y);
    players.push(player);
  }

  cow1 = new Cow(random(110, 290), 400, 80, 54);
  cow2 = new Cow(random(310, 490), 400, 80, 54);
  cow3 = new Cow(random(510, 700), 400, 80, 54);

  // Create the ufos.
  ufo1 = new UFO(random(0, width), 150, 160, 80, 10);
  ufo2 = new UFO(random(0, width), 150, 160, 80, 15);
  ufo3 = new UFO(random(0, width), 150, 160, 80, 20);
}

// Canvas Resize function.
function windowResized() {
  resizeCanvas(width, height);
}

// Draw function.
function draw() {
  createCanvas(800, 800);

  // Global background.
  push();
  imageMode(CENTER);
  image(gamebackgroundimage, width / 2, height / 2, 800, 800);
  pop();

  // States.
  if (state === "title") {
    global();
    title();
    globalhud();
  } else if (state === "difficulty") {
    global();
    difficulty();
    globalhud();
  } else if (state === "start") {
    global();
    start();
    globalhud();
  } else if (state === "easy") {
    game();
    easylevel();
    missilespawn();
    player();
    global();
    gamehud();
    globalhud();
  } else if (state === "normal") {
    game();
    normallevel();
    missilespawn();
    player();
    global();
    gamehud();
    globalhud();
  } else if (state === "hard") {
    game();
    hardlevel();
    missilespawn();
    player();
    global();
    gamehud();
    globalhud();
  } else if (state === "won") {
    global();
    won();
    globalhud();
  } else if (state === "lost") {
    global();
    lost();
    globalhud();
  }
}

// Global HUD.
function globalhud() {
  push();
  imageMode(CENTER);
  image(cursortargetimage, mouseX, mouseY, 60, 60);
  pop();

  if (reloadtimeleft <= 1 && reloadtimeleft > 0) {
    // Reload time left.
    push();
    textAlign(CENTER, CENTER);
    textFont(gamefont);
    textSize(10);
    fill(255, 255, 255);
    text("RELOADING ", mouseX, mouseY - 45);
    pop();
  }
}

// Game function.
function global() {
  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(gamecolorimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  image(gamelightimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  image(gamelightimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  image(gamelightimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  blendMode(OVERLAY);
  image(gamedesaturateimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(gamestaticimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  blendMode(SCREEN);
  image(gamestaticimage, width / 2, height / 2, 800, 800);
  pop();
}

// Title function.
function title() {
  push();
  imageMode(CENTER);
  image(gametitleimage, width / 2, height / 2, 800, 800);
  pop();

  if (counter >= 15) {
    push();
    imageMode(CENTER);
    image(gametitleclickimage, width / 2, height / 2, 800, 800);
    pop();
  }

  if (counter == 30) {
    // Only happens every second.
    counter = 0;
  }
  counter++;
}

// Difficulty function.
function difficulty() {
  push();
  imageMode(CENTER);
  if (mouseY <= 480 && mouseY >= 320) {
    image(gametitlenormalimage, width / 2, height / 2, 800, 800);
    difficultysetting = 2;
  } else if (mouseY <= 640 && mouseY > 480) {
    image(gametitlehardimage, width / 2, height / 2, 800, 800);
    difficultysetting = 3;
  } else if (mouseY < 320 && mouseY >= 160) {
    image(gametitleeasyimage, width / 2, height / 2, 800, 800);
    difficultysetting = 1;
  } else {
    image(gametitledifficultyimage, width / 2, height / 2, 800, 800);
    difficultysetting = 0;
  }
  pop();

  if (counter >= 15) {
    push();
    imageMode(CENTER);
    image(gametitlechoosedifficultyimage, width / 2, height / 2, 800, 800);
    pop();
  }

  if (counter == 30) {
    // Only happens every second.
    counter = 0;
  }
  counter++;
}

// Start function.
function start() {
  // 3 second timer.
  if (starttimecounter == 30) {
    starttimecounter = 0;
    starttimeleft--;
  }
  starttimecounter++;

  if (starttimeleft > 3) {
    push();
    textAlign(CENTER, CENTER);
    textFont(gamefont);
    textSize(30);
    fill(255, 255, 255);
    text("Protect your cows! ", 400, 400);
    pop();
  }

  if (starttimeleft <= 3) {
    push();
    textAlign(CENTER, CENTER);
    textFont(gamefont);
    textSize(30);
    fill(255, 255, 255);
    text(starttimeleft, 400, 400);
    pop();
  }

  if (starttimeleft == 0 && difficultysetting == 1) {
    state = "easy";
    reloadtimeleft = 1;
  } else if (starttimeleft == 0 && difficultysetting == 2) {
    state = "normal";
    reloadtimeleft = 1;
  } else if (starttimeleft == 0 && difficultysetting == 3) {
    state = "hard";
    reloadtimeleft = 1;
  }
}

// Game hud.
function gamehud() {
  // Cows left.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(15);
  fill(255, 255, 255);
  text("COWS LEFT: " + cowsleft, 100, 20);
  pop();

  // UFO health.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(15);
  fill(255, 255, 255);
  text("UFO HEALTH: " + ufo1health, 700, 20);
  pop();
}

// Game function.
function game() {
  push();
  imageMode(CENTER);
  image(gamebackgroundimage, width / 2, height / 2, 800, 800);
  pop();
  push();
  imageMode(CENTER);
  image(gamehousesimage, width / 2, height / 2, 800, 800);
  pop();
  push();
  imageMode(CENTER);
  image(gamefenceimage, width / 2, height / 2, 800, 800);
  pop();
  push();
  imageMode(CENTER);
  image(gamefaunaimage, width / 2, height / 2, 800, 800);
  pop();
}

// Player function.
function player() {
  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    player.move();
    player.display();
  }
}

// Easy difficulty.
function easylevel() {
  // Cow spawn.
  cow1.display();
  cow2.display();
  cow3.display();

  // Cow 1 constrain.
  cow1.y = constrain(cow1.y, 0, 400);
  cow2.y = constrain(cow2.y, 0, 400);
  cow3.y = constrain(cow3.y, 0, 400);

  // UFO1 Spawn.
  ufo1.display();
  ufo1.move();
  ufo1.bounce();
  let r = random(0, 1);

  if (r < 0.01) {
    abduct = 1;
  }

  if (abduct > 0) {
    if (ufo1.x >= cow1.x - 15 && ufo1.x <= cow1.x + 15) {
      ufo1.vx = 0;
      cow1.y = cow1.y - 2;
    }
  }

  if (abduct > 0) {
    if (ufo1.x >= cow2.x - 15 && ufo1.x <= cow2.x + 15) {
      ufo1.vx = 0;
      cow2.y = cow2.y - 2;
    }
  }

  if (abduct > 0) {
    if (ufo1.x >= cow3.x - 15 && ufo1.x <= cow3.x + 15) {
      ufo1.vx = 0;
      cow3.y = cow3.y - 2;
    }
  }

  // Ufo and Cow1 interaction.
  if (
    cow1.x > ufo1.x - cow1.xSize / 2 &&
    cow1.x < ufo1.x + cow1.xSize / 2 &&
    cow1.y > ufo1.y - cow1.ySize / 2 &&
    cow1.y < ufo1.y + cow1.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow1.x = undefined;
    cow1.y = undefined;

    ufo1.x = random(0, width);
    ufo1.vx = ufo1.speed;
  }

  // Ufo and Cow2 interaction.
  if (
    cow2.x > ufo1.x - cow2.xSize / 2 &&
    cow2.x < ufo1.x + cow2.xSize / 2 &&
    cow2.y > ufo1.y - cow2.ySize / 2 &&
    cow2.y < ufo1.y + cow2.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow2.x = undefined;
    cow2.y = undefined;

    ufo1.x = random(0, width);
    ufo1.vx = ufo1.speed;
  }
  // Ufo and Cow3 interaction.
  if (
    cow3.x > ufo1.x - cow3.xSize / 2 &&
    cow3.x < ufo1.x + cow3.xSize / 2 &&
    cow3.y > ufo1.y - cow3.ySize / 2 &&
    cow3.y < ufo1.y + cow3.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow3.x = undefined;
    cow3.y = undefined;

    ufo1.x = random(0, width);
    ufo1.vx = ufo1.speed;
  }

  if (cowsleft == 0) {
    state = "lost";
    reloadtimecounter = 0;
    reloadtimeleft = 0;
    cow1.x = random(110, 290);
    cow2.x = random(310, 490);
    cow3.x = random(510, 700);
    cow1.y = 400;
    cow2.y = 400;
    cow3.y = 400;
  }

  // Missile Spawn.
  for (let i = 0; i < missiles.length; i++) {
    let missile = missiles[i];
    missile.display();
    missile.move();

    // Ufo and Missile interaction.
    if (
      missile.x > ufo1.x - missile.xSize / 1 &&
      missile.x < ufo1.x + missile.xSize / 1 &&
      missile.y > ufo1.y - missile.ySize / 4 &&
      missile.y < ufo1.y + missile.ySize / 4
    ) {
      push();
      imageMode(CENTER);
      image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
      pop();
    }

    // Ufo damage.
    if (
      missile.x > ufo1.x - missile.xSize / 1 &&
      missile.x < ufo1.x + missile.xSize / 1 &&
      missile.y > ufo1.y - missile.ySize / 4 &&
      missile.y < ufo1.y + missile.ySize / 4
    ) {
      ufo1health = ufo1health - damage;
      abduct = 0;
      ufo1.x = random(0, width);
      ufo1.vx = ufo1.speed;
      if (cow1.y < 400) {
        cow1.y = 400;
      }
      if (cow2.y < 400) {
        cow2.y = 400;
      }
      if (cow3.y < 400) {
        cow3.y = 400;
      }
    }
    if (ufo1health == 0) {
      state = "won";
      reloadtimecounter = 0;
      reloadtimeleft = 0;
      cow1.x = random(110, 290);
      cow2.x = random(310, 490);
      cow3.x = random(510, 700);
      cow1.y = 400;
      cow2.y = 400;
      cow3.y = 400;
    }
  }
}

// Normal difficulty.
function normallevel() {
  // Cow spawn.
  cow1.display();
  cow2.display();
  cow3.display();

  // Cow 1 constrain.
  cow1.y = constrain(cow1.y, 0, 400);
  cow2.y = constrain(cow2.y, 0, 400);
  cow3.y = constrain(cow3.y, 0, 400);

  // ufo2 Spawn.
  ufo2.display();
  ufo2.move();
  ufo2.bounce();
  let r = random(0, 1);

  if (r < 0.005) {
    abduct = 1;
  }

  if (abduct > 0) {
    if (ufo2.x >= cow1.x - 15 && ufo2.x <= cow1.x + 15) {
      ufo2.vx = 0;
      cow1.y = cow1.y - 4;
    }
  }

  if (abduct > 0) {
    if (ufo2.x >= cow2.x - 15 && ufo2.x <= cow2.x + 15) {
      ufo2.vx = 0;
      cow2.y = cow2.y - 4;
    }
  }

  if (abduct > 0) {
    if (ufo2.x >= cow3.x - 15 && ufo2.x <= cow3.x + 15) {
      ufo2.vx = 0;
      cow3.y = cow3.y - 4;
    }
  }

  // Ufo and Cow1 interaction.
  if (
    cow1.x > ufo2.x - cow1.xSize / 2 &&
    cow1.x < ufo2.x + cow1.xSize / 2 &&
    cow1.y > ufo2.y - cow1.ySize / 2 &&
    cow1.y < ufo2.y + cow1.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow1.x = undefined;
    cow1.y = undefined;

    ufo2.x = random(0, width);
    ufo2.vx = ufo2.speed;
  }

  // Ufo and Cow2 interaction.
  if (
    cow2.x > ufo2.x - cow2.xSize / 2 &&
    cow2.x < ufo2.x + cow2.xSize / 2 &&
    cow2.y > ufo2.y - cow2.ySize / 2 &&
    cow2.y < ufo2.y + cow2.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow2.x = undefined;
    cow2.y = undefined;

    ufo2.x = random(0, width);
    ufo2.vx = ufo2.speed;
  }
  // Ufo and Cow3 interaction.
  if (
    cow3.x > ufo2.x - cow3.xSize / 2 &&
    cow3.x < ufo2.x + cow3.xSize / 2 &&
    cow3.y > ufo2.y - cow3.ySize / 2 &&
    cow3.y < ufo2.y + cow3.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow3.x = undefined;
    cow3.y = undefined;

    ufo2.x = random(0, width);
    ufo2.vx = ufo2.speed;
  }

  if (cowsleft == 0) {
    state = "lost";
    reloadtimecounter = 0;
    reloadtimeleft = 0;
    cow1.x = random(110, 290);
    cow2.x = random(310, 490);
    cow3.x = random(510, 700);
    cow1.y = 400;
    cow2.y = 400;
    cow3.y = 400;
  }

  // Missile Spawn.
  for (let i = 0; i < missiles.length; i++) {
    let missile = missiles[i];
    missile.display();
    missile.move();

    // Ufo and Missile interaction.
    if (
      missile.x > ufo2.x - missile.xSize / 1 &&
      missile.x < ufo2.x + missile.xSize / 1 &&
      missile.y > ufo2.y - missile.ySize / 4 &&
      missile.y < ufo2.y + missile.ySize / 4
    ) {
      push();
      imageMode(CENTER);
      image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
      pop();
    }

    // Ufo damage.
    if (
      missile.x > ufo2.x - missile.xSize / 1 &&
      missile.x < ufo2.x + missile.xSize / 1 &&
      missile.y > ufo2.y - missile.ySize / 4 &&
      missile.y < ufo2.y + missile.ySize / 4
    ) {
      ufo2health = ufo2health - damage;
      abduct = 0;
      ufo2.x = random(0, width);
      ufo2.vx = ufo2.speed;
      if (cow1.y < 400) {
        cow1.y = 400;
      }
      if (cow2.y < 400) {
        cow2.y = 400;
      }
      if (cow3.y < 400) {
        cow3.y = 400;
      }
    }
    if (ufo2health == 0) {
      state = "won";
      reloadtimecounter = 0;
      reloadtimeleft = 0;
      cow1.x = random(110, 290);
      cow2.x = random(310, 490);
      cow3.x = random(510, 700);
      cow1.y = 400;
      cow2.y = 400;
      cow3.y = 400;
    }
  }
}

// Hard difficulty.
function hardlevel() {
  // Cow spawn.
  cow1.display();
  cow2.display();
  cow3.display();

  // Cow 1 constrain.
  cow1.y = constrain(cow1.y, 0, 400);
  cow2.y = constrain(cow2.y, 0, 400);
  cow3.y = constrain(cow3.y, 0, 400);

  // UFO3 Spawn.
  ufo3.display();
  ufo3.move();
  ufo3.bounce();
  let r = random(0, 1);

  if (r < 0.0025) {
    abduct = 1;
  }

  if (abduct > 0) {
    if (ufo3.x >= cow1.x - 15 && ufo3.x <= cow1.x + 15) {
      ufo3.vx = 0;
      cow1.y = cow1.y - 6;
    }
  }

  if (abduct > 0) {
    if (ufo3.x >= cow2.x - 15 && ufo3.x <= cow2.x + 15) {
      ufo3.vx = 0;
      cow2.y = cow2.y - 6;
    }
  }

  if (abduct > 0) {
    if (ufo3.x >= cow3.x - 15 && ufo3.x <= cow3.x + 15) {
      ufo3.vx = 0;
      cow3.y = cow3.y - 6;
    }
  }

  // Ufo and Cow1 interaction.
  if (
    cow1.x > ufo3.x - cow1.xSize / 2 &&
    cow1.x < ufo3.x + cow1.xSize / 2 &&
    cow1.y > ufo3.y - cow1.ySize / 2 &&
    cow1.y < ufo3.y + cow1.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow1.x = undefined;
    cow1.y = undefined;

    ufo3.x = random(0, width);
    ufo3.vx = ufo3.speed;
  }

  // Ufo and Cow2 interaction.
  if (
    cow2.x > ufo3.x - cow2.xSize / 2 &&
    cow2.x < ufo3.x + cow2.xSize / 2 &&
    cow2.y > ufo3.y - cow2.ySize / 2 &&
    cow2.y < ufo3.y + cow2.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow2.x = undefined;
    cow2.y = undefined;

    ufo3.x = random(0, width);
    ufo3.vx = ufo3.speed;
  }
  // Ufo and Cow3 interaction.
  if (
    cow3.x > ufo3.x - cow3.xSize / 2 &&
    cow3.x < ufo3.x + cow3.xSize / 2 &&
    cow3.y > ufo3.y - cow3.ySize / 2 &&
    cow3.y < ufo3.y + cow3.ySize / 2
  ) {
    push();
    imageMode(CENTER);
    image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
    pop();

    cowsleft = cowsleft - 1;
    abduct = 0;
    cow3.x = undefined;
    cow3.y = undefined;

    ufo3.x = random(0, width);
    ufo3.vx = ufo3.speed;
  }

  if (cowsleft == 0) {
    state = "lost";
    reloadtimecounter = 0;
    reloadtimeleft = 0;
    cow1.x = random(110, 290);
    cow2.x = random(310, 490);
    cow3.x = random(510, 700);
    cow1.y = 400;
    cow2.y = 400;
    cow3.y = 400;
  }

  // Missile Spawn.
  for (let i = 0; i < missiles.length; i++) {
    let missile = missiles[i];
    missile.display();
    missile.move();

    // Ufo and Missile interaction.
    if (
      missile.x > ufo3.x - missile.xSize / 1 &&
      missile.x < ufo3.x + missile.xSize / 1 &&
      missile.y > ufo3.y - missile.ySize / 4 &&
      missile.y < ufo3.y + missile.ySize / 4
    ) {
      push();
      imageMode(CENTER);
      image(gamestaticdisruptimage, width / 2, height / 2, 800, 800);
      pop();
    }

    // Ufo damage.
    if (
      missile.x > ufo3.x - missile.xSize / 1 &&
      missile.x < ufo3.x + missile.xSize / 1 &&
      missile.y > ufo3.y - missile.ySize / 4 &&
      missile.y < ufo3.y + missile.ySize / 4
    ) {
      ufo3health = ufo3health - damage;
      abduct = 0;
      ufo3.x = random(0, width);
      ufo3.vx = ufo3.speed;
      if (cow1.y < 400) {
        cow1.y = 400;
      }
      if (cow2.y < 400) {
        cow2.y = 400;
      }
      if (cow3.y < 400) {
        cow3.y = 400;
      }
    }
    if (ufo3health == 0) {
      state = "won";
      reloadtimecounter = 0;
      reloadtimeleft = 0;
      cow1.x = random(110, 290);
      cow2.x = random(310, 490);
      cow3.x = random(510, 700);
      cow1.y = 400;
      cow2.y = 400;
      cow3.y = 400;
    }
  }
}

function won() {
  push();
  imageMode(CENTER);
  image(gameendingwonimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  image(gameendingplayagainimage, width / 2, height / 2, 800, 800);
  pop();
}

function lost() {
  push();
  imageMode(CENTER);
  image(gameendinglostimage, width / 2, height / 2, 800, 800);
  pop();

  push();
  imageMode(CENTER);
  image(gameendingplayagainimage, width / 2, height / 2, 800, 800);
  pop();
}

function missilespawn() {
  // 3 second timer.
  if (reloadtimeleft <= 1 && reloadtimeleft > 0) {
    if (reloadtimecounter == 30) {
      reloadtimecounter = 0;
      reloadtimeleft--;
    }
    reloadtimecounter++;
  }
}

function mousePressed() {
  // Switch from title to game.
  if (state === "title") {
    state = "difficulty";
  } else if (state === "difficulty") {
    if (difficultysetting == 1) {
      state = "start";
      starttimeleft = 5;
    } else if (difficultysetting == 2) {
      state = "start";
      starttimeleft = 5;
    } else if (difficultysetting == 3) {
      state = "start";
      starttimeleft = 5;
    }
  }
  if (state === "easy") {
    if (reloadtimeleft == 0) {
      createMissile(mouseX, 700);
      reloadtimeleft = 1;
    }
  } else if (state === "normal") {
    if (reloadtimeleft == 0) {
      createMissile(mouseX, 700);
      reloadtimeleft = 1;
    }
  } else if (state === "hard") {
    if (reloadtimeleft == 0) {
      createMissile(mouseX, 700);
      reloadtimeleft = 1;
    }
  }
}

function createMissile(x, y) {
  let xSize = 50;
  let ySize = 50;
  let missile = new Missile(x, y, xSize, ySize);
  missiles.push(missile);
}

// Key press function.
function keyPressed() {
  if (state === "won") {
    if (keyCode == 32) {
      state = "title";
      starttimecounter = 0;
      starttimeleft = 0;
      ufo1health = 3;
      ufo2health = 3;
      ufo3health = 3;
      cowsleft = 3;
    }
  } else if (state === "lost") {
    if (keyCode == 32) {
      state = "title";
      starttimecounter = 0;
      starttimeleft = 0;
      ufo1health = 3;
      ufo2health = 3;
      ufo3health = 3;
      cowsleft = 3;
    }
  }
}
