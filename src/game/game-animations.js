// custom component controlling enemy patrol movement
export function patrol(speed = 60, dir = -1) {
  return {
    id: "patrol",
    require: ["pos", "area"],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          dir = -dir;
        }
      });
    },
    update() {
      this.move(speed * dir, 0);
    },
  };
}

// custom component that makes stuff grow big
export function big(initialScale = 1, secondScale = 2) {
  let timer = 0;
  let isBig = false;
  let destScale = initialScale;
  return {
    // component id / name
    id: "big",
    // it requires the scale component
    require: ["scale"],
    // this runs every frame
    update() {
      if (isBig) {
        timer -= dt();
        if (timer <= 0) {
          this.smallify();
        }
      }
      this.scale = this.scale.lerp(vec2(destScale), dt() * 6);
    },
    // custom methods
    isBig() {
      return isBig;
    },
    smallify() {
      destScale = initialScale;
      timer = 0;
      isBig = false;
    },
    biggify(time) {
      destScale = secondScale;
      timer = time;
      isBig = true;
    },
  };
}
