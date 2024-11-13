import { big } from "./game-animations";
import { itemsConfig } from "./items-config";

const demo = {
  25: "g",
  37: "p",
};

const defaultLevel = [
  "                                      ",
  "                                      ",
  "                                      ",
  "                                      ",
  "                                      ",
  "======================================",
];

let calculateAge = (currentMonth) => 18 + parseInt(currentMonth / 12);
const lifeEvents = [
  "s",
  "t",
  "h",
  "d",
  "e",
  "f",
  "g",
  "i",
  "l",
  "j",
  "k",
  "o",
  "m",
  "p",
  "r",
  "a",
  "y",
  "n",
];

export function initGameScene(sceneName, ageCallback, gameEndCallback) {
  scene(
    sceneName,
    ({ levelId, money, age } = { levelId: 0, money: 0, age: 18 }) => {
      // define some constants
      const JUMP_FORCE = 1320;
      const MOVE_SPEED = 400;
      const FALL_DEATH = 300;
      // distance between player and the border of the screen
      const PADDING = 100;
      const TOTAL_YEARS = 70 - 18;
      const GAME_DURATION = 60;
      const YEAR_DURATION = GAME_DURATION / TOTAL_YEARS;

      const LEVELS = [defaultLevel];

      // add level to scene
      const level = addLevel(LEVELS[levelId ?? 0], itemsConfig);

      // wait for some time and trigger the win
      wait(GAME_DURATION, () => {
        gameEndCallback();
        go("win", { coins: money });
      });

      wait(5, () => {
        console.log("wait 5");
      });
      Object.keys(demo).map((age) => {
        wait((age - 18) * YEAR_DURATION, () => {
          console.log("spawn", demo[age]);
          level.spawn(
            demo[age],
            currentTile + tileWidth,
            level.numRows() - Math.floor(rand(2, 7)),
          );
        });
      });

      // Main Timeline Loop
      let currentMonth = 0;
      loop(YEAR_DURATION / 12, () => {
        currentMonth++;

        ageCallback(currentMonth);

        money += 100;
        coinsLabel.text = money;

        if (currentMonth % 12 === 0) {
          age = calculateAge(currentMonth);
          ageLabel.text = age;
        }
      });

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
        sprite("background", { width: 12000 }),
        pos(-width() / 2, levelHeight - 800),
        opacity(0.6),
        layer("background"),
      ]);

      function spawnRandomEvent(tilePosX, tileWidth) {
        const rng = rand(0, 1);
        if (rng > 0.99) {
          level.spawn(
            "%",
            tilePosX + tileWidth,
            level.numRows() - Math.floor(rand(4, 7)),
          );
        } else if (rng > 0.97) {
          level.spawn("^", tilePosX + tileWidth, level.numRows() - 2);
        } else if (rng > 0.95) {
          level.spawn(
            "0",
            tilePosX + tileWidth,
            level.numRows() - Math.floor(rand(2, 5)),
          );
        } else if (rng > 0.93) {
          level.spawn(
            "$",
            tilePosX + tileWidth,
            level.numRows() - Math.floor(rand(2, 7)),
          );
        } else if (rng > 0.2) {
          level.spawn(
            lifeEvents[Math.floor(rand(lifeEvents.length))],
            tilePosX + tileWidth,
            level.numRows() - Math.floor(rand(2, 7)),
          );
        }
      }

      function updateCamPos() {
        const heightOffset = levelHeight + PADDING - height() / 2;
        const widthOffset = width() / 2 - PADDING;
        const roof = levelHeight + 2 * level.tileHeight() + PADDING - height();
        const floor = levelHeight + level.tileHeight();

        // center camera to player if player is too high or too low
        if (player.pos.y < roof) {
          camPos(
            player.pos.x + widthOffset,
            player.pos.y + heightOffset - roof,
          );
        } else if (player.pos.y > floor) {
          camPos(
            player.pos.x + widthOffset,
            player.pos.y + heightOffset - floor,
          );
        } else {
          camPos(player.pos.x + widthOffset, heightOffset);
        }
      }

      let currentTile = 0;
      const tileWidth = Math.floor(width() / 64);

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
        // spawning a new floor every tile
        const tilePosX = Math.floor(player.pos.x / 64);
        if (currentTile < tilePosX) {
          level.spawn("=", tilePosX + tileWidth, level.numRows() - 1);
          currentTile = tilePosX;
          // spawning a random item eevery 8 blocks
          if (currentTile > level.numColumns() && currentTile % 8 === 0) {
            spawnRandomEvent(tilePosX, tileWidth);
          }
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

      // flicker the player when hit
      function flicker(player) {
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
          player.opacity = player.opacity === 1 ? 0.5 : 1;
          flickerCount++;
          if (flickerCount > 10) {
            clearInterval(flickerInterval);
            player.opacity = 1;
          }
        }, 100);
      }

      // if player onCollide with any obj with "danger" tag, lose
      player.onCollide("danger", () => {
        money -= 1000;
        play("portal");
        flicker(player);
      });

      player.onCollide("portal", () => {
        play("portal");
        if (levelId + 1 < LEVELS.length) {
          go("game", {
            levelId: levelId + 1,
            coins: money,
          });
        } else {
          go("win", { coins: money });
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
        player.use(sprite("larry", { anim: "run" }));
      });

      player.onCollide("enemy", (e, col) => {
        // if it's not from the top, die
        if (!col?.isBottom()) {
          go("lose");
          play("hit");
        }
      });

      player.onCollide("event", (e) => {
        e.destroy();
        play("blip");
      });

      // increasing the coin's sound pitch everytime we get a coin
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
        money += 1000;
        coinsLabel.text = money;
      });

      player.onCollide("baby", () => {
        // if it's not from the top, die
        baby = add([
          sprite("babyLarry", { anim: "run" }),
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
          e.destroy();
          play("hit");
        }
      });

      let hasBacon = false;

      // grow a bacon if player's head bumps into an obj with "prize" tag
      player.onHeadbutt((obj) => {
        if (obj.is("prize") && !hasBacon) {
          const bacon = level.spawn("#", obj.tilePos.sub(-6, 0));
          bacon.jump();
          hasBacon = true;
          play("blip");
        }
      });

      // player grows big onCollide with an "bacon" obj
      player.onCollide("bacon", (a) => {
        destroy(a);
        // as we defined in the big() component
        player.biggify(1);
        hasBacon = false;
        play("powerup");
      });

      const coinsLabel = add([text(money), pos(24, 24), fixed()]);
      const ageLabel = add([text(age), pos(24, height() - 32), fixed()]);

      function jump() {
        // these 2 functions are provided by body() component
        if (player.isGrounded()) {
          player.jump(JUMP_FORCE);
          player.use(sprite("larryJump", { anim: "jump" }));
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
    },
  );
}
