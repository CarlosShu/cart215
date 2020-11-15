class Cow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSize = 90;
    this.ySize = 65;
  }

  display() {
    push();
    imageMode(CENTER);
    image(cowidleimage, this.x, this.y, this.xSize, this.ySize);
    pop();
  }
}
