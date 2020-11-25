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

// Game Title Visuals variables.
let gametitleimage;
let gametitleenterimage;

// Game Visuals variables.
let gamehousesimage;
let gamefenceimage;
let gamefaunaimage;

// FPS variable.
let fr = 30;

// Counter variable.
let counter = 0;

// Score variable.
let score = 0;

// Score variable.
let reloadtimecounter = 0;
let reloadtimeleft = 0;

// Players variables.
let players = [];
let numplayers = 1;

// Missiles variables.
let missiles = [];

// Cows variables.
let cows = [];
let numcows = 1;

// UFOs variables.
let ufos = [];
let numufos = 1;

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
  missile1image = loadImage("assets/images/gamemissile1.png");
  missile2image = loadImage("assets/images/gamemissile2.png");
  missile3image = loadImage("assets/images/gamemissile3.png");

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

  // Game Title Screen Visuals.
  gametitleimage = loadImage("assets/images/gametitle.png");
  gametitleenterimage = loadImage("assets/images/gametitleenter.png");

  // Game Visuals.
  gamebackgroundimage = loadImage("assets/images/gamebackground.png");
  gamehousesimage = loadImage("assets/images/gamehouses.png");
  gamefenceimage = loadImage("assets/images/gamefence.png");
  gamefaunaimage = loadImage("assets/images/gamefauna.png");
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

  for (let i = 0; i < numcows; i++) {
    // cows X and Y spawn.
    let x = random(100, 700);
    let y = random(300, 450);
    let xSize = 72;
    let ySize = 54;

    let cow = new Cow(x, y, xSize, ySize);
    cows.push(cow);
  }

  // Create the ufos.
  for (let i = 0; i < numufos; i++) {
    // ufos X and Y spawn.
    let x = random(0, width);
    let y = random(0, height);
    let vx = 0;
    let vy = 0;
    let xSize = 160;
    let ySize = 80;
    let ufo = new UFO(x, y, vx, vy, xSize, ySize);
    ufos.push(ufo);
  }
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
  } else if (state === "game") {
    game();
    level1();
    missilespawn();
    player();
    global();
    gamehud();
    globalhud();
  }
}

// Global HUD.
function globalhud() {
  push();
  imageMode(CENTER);
  image(cursortargetimage, mouseX, mouseY, 60, 60);
  pop();

  if (reloadtimeleft <= 3 && reloadtimeleft > 0) {
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
    image(gametitleenterimage, width / 2, 750, 800, 800);
    pop();
  }

  if (counter == 30) {
    // Only happens every second.
    counter = 0;
  }
  counter++;
}

// Game hud.
function gamehud() {
  // User score.
  push();
  textAlign(CENTER, CENTER);
  textFont(gamefont);
  textSize(15);
  fill(255, 255, 255);
  text("SCORE: " + score, 50, 20);
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

// UFO and Missile interaction function.
function level1() {
  // Cow spawn.
  for (let i = 0; i < cows.length; i++) {
    let cow = cows[i];
    cow.display();

    // UFO Spawn.
    for (let i = 0; i < ufos.length; i++) {
      let ufo = ufos[i];
      ufo.display();
      ufo.move();

      let r = undefined;

      if (ufo.x < cow.x - 10 || ufo.x > cow.x + 10) {
        r = random(0, 1);
      } else if (ufo.x >= cow.x - 10 && ufo.x <= cow.x + 10) {
        ufo.vx = 0;
        ufo.vy = 0;
        r = 1;
        cow.y = cow.y - 1;
      }

      if (r < 0.1) {
        ufo.vx = random(-10, 10);
        ufo.vy = random(-10, 10);
      }

      // Missile Spawn.
      for (let i = 0; i < missiles.length; i++) {
        let missile = missiles[i];
        missile.display();
        missile.move();

        // Ufo and Missile interaction.
        if (
          missile.x > ufo.x - missile.xSize / 0.5 &&
          missile.x < ufo.x + missile.xSize / 0.5 &&
          missile.y > ufo.y - missile.ySize / 2 &&
          missile.y < ufo.y + missile.ySize / 2
        ) {
          // Reload time left.
          push();
          textAlign(CENTER, CENTER);
          textFont(gamefont);
          textSize(50);
          fill(255, 255, 255);
          text("TEST", 400, 400);
          pop();

          ufo.x = undefined;
          ufo.y = undefined;
        }
      }
    }
  }
}

function missilespawn() {
  // 3 second timer.
  if (reloadtimeleft <= 3 && reloadtimeleft > 0) {
    if (reloadtimecounter == 30) {
      reloadtimecounter = 0;
      reloadtimeleft--;
    }
    reloadtimecounter++;
  }
}

function mousePressed() {
  if (state === "game") {
    if (reloadtimeleft == 0) {
      createMissile(mouseX, 700);
      reloadtimeleft = 3;
    }
  }
}

function createMissile(x, y) {
  let xSize = 30;
  let ySize = 210;
  let missile = new Missile(x, y, xSize, ySize);
  missiles.push(missile);
}

// Key press function.
function keyPressed() {
  // Switch from title to game.
  if (state === "title") {
    if (keyCode == 32) {
      state = "game";
    }
  }
}
