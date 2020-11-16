class Cow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSize = 80;
    this.ySize = 55;
  }

  display() {
    push();
    imageMode(CENTER);
    image(cowidleimage, this.x, this.y, this.xSize, this.ySize);
    pop();
  }
}
