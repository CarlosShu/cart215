class Cow {
  constructor(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
  }

  display() {
    push();
    imageMode(CENTER);
    image(cowidleimage, this.x, this.y, this.xSize, this.ySize);
    pop();
  }
}
