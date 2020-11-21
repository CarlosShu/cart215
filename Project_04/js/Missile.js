class Missile {
  constructor(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.vy = 0;
    this.speed = 1;
    this.maxspeed = 5;

    this.value = 0;
  }

  move() {
    this.vy = this.vy + this.speed;
    this.y -= this.vy;
  }

  display() {
    push();
    imageMode(CENTER);
    image(missile1image, this.x, this.y, this.xSize, this.ySize);
    pop();
  }
}
