class UFO {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSize = 220;
    this.ySize = 110;
    this.vx = 0;
    this.vy = 0;
    this.speed = 10;
    this.jitteriness = 0.1; // How likely the bee is to change direction
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
}

// display() {
//   push();
//   imageMode(CENTER);
//
//   if (mouseIsPressed) {
//     if (this.distance < this.size / 2) {
//       //score = score + 1;
//
//       this.x = random(-30, width + 30);
//       this.y = height + 30;
//     }
//   } else {
//     image(ufoimage, this.x, this.y, this.xSize, this.ySize);
//   }
//   pop();
// }
// }