import { big } from "./game-animations";
import { itemsConfig } from "./items-config";

const defaultLevel = [
  "                             $                                                             ",
  "                                                                                     $$$  @",
  "                                                                                   --------",
  "                                                                                           ",
  "                                                                    $$                     ",
  "                                                                   ----                    ",
  "                                                                                           ",
  "                    $$                                      ^ $                   $        ",
  "        $          ===              %                       ----         ---     ---       ",
  "                                                $                                          ",
  "                ^   0 =    >      b           $                   ^^  0    =   > =        @",
  "===================================================     ===================================",
];

export function initGameScene(sceneName) {
  scene(sceneName, ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
    // define some constants
    const JUMP_FORCE = 1320;
    const MOVE_SPEED = 480;
    const FALL_DEATH = 300;
    // distance between player and the border of the screen
    const PADDING = 100;

    const LEVELS = [defaultLevel];

    // add level to scene
    const level = addLevel(LEVELS[levelId ?? 0], itemsConfig);

    // define player object
    const player = add([
      sprite("larry", { anim: "run" }),
      pos(0, 0),
      area(),
      scale(2),
      // makes it fall to gravity and jumpable
      body(),
      // the custom component we defined above
      big(2, 4),
      anchor("bot"),
    ]);

    // define player object
    let baby = undefined;

    const levelHeight = (level.numRows() - 2) * level.tileHeight();

    // add background
    const background = add([
      sprite("background", { width: 6000 }),
      pos(-width() / 2, levelHeight - 800),
      opacity(0.6),
      layer("background"),
    ]);

    function updateCamPos() {
      const heightOffset = levelHeight + PADDING - height() / 2;
      const widthOffset = width() / 2 - PADDING;
      const roof = levelHeight + 2 * level.tileHeight() + PADDING - height();
      const floor = levelHeight + level.tileHeight();

      // center camera to player if player is too high or too low
      if (player.pos.y < roof) {
        camPos(player.pos.x + widthOffset, player.pos.y + heightOffset - roof);
      } else if (player.pos.y > floor) {
        camPos(player.pos.x + widthOffset, player.pos.y + heightOffset - floor);
      } else {
        camPos(player.pos.x + widthOffset, heightOffset);
      }
    }
    // action() runs every frame
    player.onUpdate(() => {
      if (baby) {
        baby.pos.y = player.pos.y;
        baby.pos.x = player.pos.x - player.scale.x * 32;
      }
      player.move(MOVE_SPEED, 0);
      background.move(MOVE_SPEED * 0.8, 0);
      // center camera to player
      updateCamPos();
      // check fall death
      if (player.pos.y >= levelHeight + FALL_DEATH) {
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
      updateCamPos();
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

    player.onCollide("baby", (e) => {
      destroy(e);
      // if it's not from the top, die
      baby = add([
        sprite("larry", { anim: "run" }),
        pos(0, 0),
        area(),
        scale(1),
        // makes it fall to gravity and jumpable
        body(),
        // the custom component we defined above
        big(1, 2),
        anchor("bot"),
      ]);
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
}
