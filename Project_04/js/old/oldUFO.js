class UFO {
  constructor(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.vx = 0;
    this.vy = 0;
    this.speed = 10;
    this.jitteriness = 0.1; // How likely the ufo is to change direction
    this.distance = undefined;
  }

  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 100, 300);
  }

  display() {
    push();
    imageMode(CENTER);
    image(ufoimage, this.x, this.y, this.xSize, this.ySize);
    pop();
  }

  // Game HUD.
  hud() {
    push();
    imageMode(CENTER);
    image(cursorbadtargetimage, mouseX, mouseY, 60, 60);
    pop();

    if (reloadtimeleft == 3) {
      // Reload time left.
      push();
      textAlign(CENTER, CENTER);
      textFont(gamefont);
      textSize(10);
      fill(255, 255, 255);
      text("RELOADING", mouseX, mouseY - 45);
      pop();
    }
  }
}
