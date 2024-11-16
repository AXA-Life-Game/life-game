import { gameEngine } from "../engine";
import { big } from "./game-animations";
import { itemsConfig, itemsMapping } from "./items-config";
import { getNextEvent, getRandomEvents } from "../core/Generator.js";
import { getLifeEventByKey, LIFE_EVENTS } from "../core/LifeEvent.js";
import { applyEffects } from "../core/Effect.js";

const defaultLevel = [
  "                                                                                                         ",
  "                                  -----                                                                  ",
  "                           ---                                                 ---                       ",
  "                                                                                                         ",
  "                                                                                                         ",
  "==========================================================================================================",
];

let calculateAge = (currentMonth) => 18 + parseInt(currentMonth / 12);

export function initGameScene(
  sceneName,
  ageCallback,
  gameEndCallback,
  gameState,
) {
  scene(sceneName, ({ levelId } = { levelId: 0 }) => {
    const game = add([timer()]);
    const engine = gameEngine(
      () => console.log("win"),
      () => console.log("lost"),
    );

    // define some constants
    const JUMP_FORCE = 1320;
    const MOVE_SPEED = 200;
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
    game.wait(GAME_DURATION, () => {
      gameEndCallback();
      go("win", {});
    });

    // defines tile's position
    let currentTile = 0;
    const tileWidth = Math.floor(width() / 64);

    // Main Timeline Loop
    let currentMonth = 0;
    let lastEvent = null;
    game.loop(YEAR_DURATION * 2, () => {
      const nextEvent = getNextEvent(
        lastEvent,
        gameState.current.probabilityMatrix,
      );

      if (!nextEvent) {
        console.log("no possible events found");
        return;
      }
      const event = gameState.current.lifeEvents.find(
        (item) => item.icon === nextEvent,
      );

      console.log("Next event", nextEvent);
      const addedObject = level.spawn(
        event.icon,
        currentTile + tileWidth,
        level.numRows() - Math.floor(rand(2, 7)),
      );

      addedObject.eventKey = event.key;
    });
    game.loop(
      YEAR_DURATION / 12,
      () => {
        currentMonth++;

        ageCallback(currentMonth);

        gameState.current.lifeIndicators.MONEY.value +=
          gameState.current.lifeIndicators.SALARY.value -
          gameState.current.lifeIndicators.EXPENSES.value -
          gameState.current.lifeIndicators.TAXES.value;
        coinsLabel.text = `${gameState.current.lifeIndicators.MONEY.value} CHF`;

        // console.table(engine.progress(currentMonth).getState().lifebars);

        if (currentMonth % 12 === 0) {
          gameState.current.lifeIndicators.AGE.value =
            calculateAge(currentMonth);
          ageLabel.text = gameState.current.lifeIndicators.AGE.value;
        }
      },
      -1,
      true,
    );

    // define player object
    const player = game.add([
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

    function spawnRandomEvent(tilePosX, lifeEvent) {
      const addedEvent = level.spawn(
        itemsMapping[lifeEvent.type].symbol,
        tilePosX + tileWidth,
        level.numRows() - Math.floor(rand(2, 7)),
      );
      addedEvent.lifeEvent = lifeEvent;
    }

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
      // spawning a new floor every tile
      const tilePosX = Math.floor(player.pos.x / 64);
      if (currentTile < tilePosX) {
        level.spawn("=", tilePosX + tileWidth, level.numRows() - 1);
        currentTile = tilePosX;
        if (currentTile > 3 && currentTile % 8 === 0) {
          // SPAWN EVENTS HERE
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
      if (e.eventKey) {
        const event = getLifeEventByKey(
          gameState.current.lifeEvents,
          e.eventKey,
        );

        lastEvent = event.icon;

        console.log("collect", event.icon);

        gameState.current = applyEffects(event.effects, gameState.current);
      }
      e.destroy();
      play("blip");
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

    const coinsLabel = add([
      text(gameState.current.lifeIndicators.MONEY.value),
      pos(24, 24),
      fixed(),
    ]);
    const ageLabel = add([
      text(gameState.current.lifeIndicators.AGE.value),
      pos(24, height() - 32),
      fixed(),
    ]);

    function jump() {
      // these 2 functions are provided by body() component
      if (player.isGrounded()) {
        player.jump(JUMP_FORCE);
        player.use(sprite("larryJump", { anim: "jump" }));
      }
    }

    onKeyPress("p", () => {
      game.paused = !game.paused;
    });

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
