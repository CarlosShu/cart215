class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.speed = 5;
    this.maxspeed = 5;
    this.size = 640;
  }

  move() {
    this.x = mouseX;
    this.x = constrain(this.x, 0, 1024);
  }

  display() {
    push();
    imageMode(CENTER);
    image(crossbow1image, this.x, this.y, this.size, this.size);
    pop();
  }
}