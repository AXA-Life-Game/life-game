const init = (level) => {
  // @ts-check

  // load assets
  loadSprite("axaLogo", "./src/assets/axa-logo.svg.png");
  loadSprite("pinky", "./src/assets/pinky/run-32x32.png", {
    sliceX: 12,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 11,
        loop: true,
        speed: 30
      }
    }
  });
  loadSprite("dino", "https://kaboomjs.com/sprites/dino.png");
  loadSprite("mushroom", "https://kaboomjs.com/sprites/mushroom.png");
  loadSprite("ghosty", "https://kaboomjs.com/sprites/ghosty.png");
  loadSprite("spike", "https://kaboomjs.com/sprites/spike.png");
  loadSprite("grass", "https://kaboomjs.com/sprites/grass.png");
  loadSprite("steel", "https://kaboomjs.com/sprites/steel.png");
  loadSprite("prize", "https://kaboomjs.com/sprites/jumpy.png");
  loadSprite("apple", "https://kaboomjs.com/sprites/meat.png");
  loadSprite("portal", "https://kaboomjs.com/sprites/portal.png");
  loadSprite("coin", "https://kaboomjs.com/sprites/coin.png");
  loadSound("coin", "https://kaboomjs.com/examples/sounds/score.mp3");
  loadSound("powerup", "https://kaboomjs.com/examples/sounds/powerup.mp3");
  loadSound("blip", "https://kaboomjs.com/examples/sounds/blip.mp3");
  loadSound("hit", "https://kaboomjs.com/examples/sounds/hit.mp3");
  loadSound("portal", "https://kaboomjs.com/examples/sounds/portal.mp3");

  setGravity(3200);

  // custom component controlling enemy patrol movement
  function patrol(speed = 60, dir = -1) {
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
function big(initialScale = 1, secondScale = 2) {
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

  // define some constants
  const JUMP_FORCE = 1320;
  const MOVE_SPEED = 480;
  const FALL_DEATH = 2400;

  const LEVELS = [level];

  // define what each symbol means in the level graph
  const levelConf = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "=": () => [
        sprite("grass"),
        area(),
        body({ isStatic: true }),
        anchor("bot"),
        offscreen({ hide: true }),
        "platform",
      ],
      "-": () => [
        sprite("steel"),
        area(),
        body({ isStatic: true }),
        offscreen({ hide: true }),
        anchor("bot"),
        "platform",
      ],
      0: () => [
        sprite("mushroom"),
        area(),
        body({ isStatic: true }),
        offscreen({ hide: true }),
        anchor("bot"),
        "jumper",
      ],
      $: () => [
        sprite("coin"),
        area(),
        pos(0, -9),
        anchor("bot"),
        offscreen({ hide: true }),
        "coin",
      ],
      "%": () => [
        sprite("axaLogo"),
        area(),
        body({ isStatic: true }),
        anchor("bot"),
        offscreen({ hide: true }),
        "prize",
      ],
      "^": () => [
        sprite("spike"),
        area(),
        body({ isStatic: true }),
        anchor("bot"),
        offscreen({ hide: true }),
        "danger",
      ],
      "#": () => [
        sprite("apple"),
        area(),
        anchor("bot"),
        body(),
        offscreen({ hide: true }),
        "apple",
      ],
      ">": () => [
        sprite("ghosty"),
        area(),
        anchor("bot"),
        body(),
        patrol(),
        offscreen({ hide: true }),
        "enemy",
      ],
      "@": () => [
        sprite("portal"),
        area(),
        anchor("bot"),
        pos(0, -12),
        offscreen({ hide: true }),
        "portal",
      ],
    },
  };

  scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
    // add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], levelConf);

    // define player object
    const player = add([
      sprite("pinky", {anim: "run"}),
      pos(0, 0),
      area(),
      scale(2),
      // makes it fall to gravity and jumpable
      body(),
      // the custom component we defined above
      big(2,4),
      anchor("bot"),
    ]);

    // action() runs every frame
    player.onUpdate(() => {
      player.move(MOVE_SPEED, 0);
      // center camera to player
      camPos(player.pos);
      // check fall death
      if (player.pos.y >= FALL_DEATH) {
        go("lose");
      }
    });

    player.onBeforePhysicsResolve((collision) => {
      if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
        collision.preventResolution();
      }
    });

    player.onPhysicsResolve(() => {
      // Set the viewport center to player.pos
      camPos(player.pos);
    });

    // if player onCollide with any obj with "danger" tag, lose
    player.onCollide("danger", () => {
      go("lose");
      play("hit");
    });

    player.onCollide("portal", () => {
      play("portal");
      if (levelId + 1 < LEVELS.length) {
        go("game", {
          levelId: levelId + 1,
          coins,
        });
      } else {
        go("win", { coins });
      }
    });

    player.onGround((l) => {
      if (l.is("enemy")) {
        player.jump(JUMP_FORCE * 1.5);
        destroy(l);
        addKaboom(player.pos);
        play("powerup");
      }
      if (l.is("jumper")) {
        player.jump(JUMP_FORCE);
        play("blip");
      }
    });

    player.onCollide("enemy", (e, col) => {
      // if it's not from the top, die
      if (!col?.isBottom()) {
        go("lose");
        play("hit");
      }
    });

    player.onCollide("jumper", (e, col) => {
      // if it's not from the top, die
      if (!col?.isBottom()) {
        go("lose");
        play("hit");
      }
    });

    let hasApple = false;

    // grow an apple if player's head bumps into an obj with "prize" tag
    player.onHeadbutt((obj) => {
      if (obj.is("prize") && !hasApple) {
        const apple = level.spawn("#", obj.tilePos.sub(-6, 0));
        apple.jump();
        hasApple = true;
        play("blip");
      }
    });

    // player grows big onCollide with an "apple" obj
    player.onCollide("apple", (a) => {
      destroy(a);
      // as we defined in the big() component
      player.biggify(1);
      hasApple = false;
      play("powerup");
    });

    let coinPitch = 0;

    onUpdate(() => {
      if (coinPitch > 0) {
        coinPitch = Math.max(0, coinPitch - dt() * 100);
      }
    });

    player.onCollide("coin", (c) => {
      destroy(c);
      play("coin", {
        detune: coinPitch,
      });
      coinPitch += 100;
      coins += 1;
      coinsLabel.text = coins;
    });

    const coinsLabel = add([text(coins), pos(24, 24), fixed()]);

    function jump() {
      // these 2 functions are provided by body() component
      if (player.isGrounded()) {
        player.jump(JUMP_FORCE);
      }
    }

    // jump with space
    onKeyPress("space", jump);

    onClick(jump);

    onGamepadButtonPress("south", jump);

    onKeyPress("f", () => {
      setFullscreen(!isFullscreen());
    });

    onKeyPress("backspace", () => go("lose"));
    onKeyPress("escape", () => go("lose"));
  });

  scene("start", () => {
    add([text("Welcome to the pension game"), pos(24, 24)]);
    add([text("Press any key to start"), pos(24, 64)]);
    onKeyPress(() => go("game"));
    onClick(() => go("game"));
  });

  scene("lose", () => {
    add([text("You Lose"), pos(24, 24)]);
    add([text("Press any key to restart"), pos(24, 64)]);
    onKeyPress(() => go("game"));
    onClick(() => go("game"));
  });

  scene("win", ({ coins }) => {
    add([text(`You Won ${coins} Coins !`), pos(24, 24)]);
    add([text("Press any key to restart"), pos(24, 64)]);
    onKeyPress(() => go("game"));
    onClick(() => go("game"));
  });

  go("start");
};

export default init;
