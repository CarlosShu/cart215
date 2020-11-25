class UFO {
  constructor(x, y, xSize, ySize, speed) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.vx = this.speed;
  }

  move() {
    this.x += this.vx;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(ufoimage, this.x, this.y, this.xSize, this.ySize);
    pop();
  }
}
