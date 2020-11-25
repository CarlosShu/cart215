class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.speed = 5;
    this.maxspeed = 5;
    this.size = 300;
  }

  move() {
    this.x = mouseX;
    this.x = constrain(this.x, 0, 800);
  }

  display() {
    push();
    imageMode(CENTER);
    if (mouseY > 400) {
      image(bazooka1image, this.x, this.y, this.size, this.size);
    } else if (mouseY <= 400 && mouseY >= 200) {
      image(bazooka2image, this.x, this.y, this.size, this.size);
    } else if (mouseY < 200) {
      image(bazooka3image, this.x, this.y, this.size, this.size);
    }
    pop();
  }
}
