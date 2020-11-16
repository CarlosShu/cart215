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
let crossbow1image;

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

// Players variables.
let players = [];
let numplayers = 1;

// Cows variables.
let cows = [];
let numcows = 5;

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
  crossbow1image = loadImage("assets/images/crossbow1.png");

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
    let y = 750;

    let player = new Player(x, y);
    players.push(player);
  }

  for (let i = 0; i < numcows; i++) {
    // cows X and Y spawn.
    let x = random(100, 924);
    let y = random(320, 480);

    let cow = new Cow(x, y);
    cows.push(cow);
  }

  // Create the ufos.
  for (let i = 0; i < numufos; i++) {
    let ufo = new UFO(random(0, width), random(0, height));
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
    //  hud();
  } else if (state === "game") {
    game();
    cow();
    ufo();
    player();
    global();
    // hud();
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
  blendMode(OVERLAY);
  image(gamedesaturateimage, width / 2, height / 2, 800, 800);
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
    // This only happens every second.
    counter = 0;
  }
  counter++;
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

// Cow function.
function cow() {
  for (let i = 0; i < cows.length; i++) {
    let cow = cows[i];
    cow.display();
  }
}

// UFO function.
function ufo() {
  for (let i = 0; i < ufos.length; i++) {
    let ufo = ufos[i];
    ufo.display();
    ufo.move();
    ufo.hud();
  }
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
