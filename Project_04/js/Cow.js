class Cow {
  constructor(x, y, xSize, ySize) {
    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
    this.randommoo = 0.01;
  }

  display() {
    push();
    imageMode(CENTER);
    image(cowidleimage, this.x, this.y, this.xSize, this.ySize);
    pop();

    // 3 second timer.
    if (mootimeleft <= 3 && mootimeleft > 0) {
      if (mootimecounter == 30) {
        mootimecounter = 0;
        mootimeleft--;
      }
      mootimecounter++;
    }

    let r = random(0, 1);
    if (r < this.randommoo) {
      mootimeleft = 3;
    }

    if (mootimeleft <= 3 && mootimeleft > 0) {
      // User score.
      push();
      textAlign(CENTER, CENTER);
      textFont(gamefont);
      textSize(10);
      fill(255, 255, 255);
      text("Moo", this.x - 7, this.y - 40);
      pop();
    }
    if (mootimeleft == 0) {
      mootimeleft = 0;
    }
  }
}
