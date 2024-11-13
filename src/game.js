import { loadEntities } from "./game/game-entities";
import { initGameScene } from "./game/game-scene";

const init = (ageCallback, gameEndCallback) => {
  // @ts-check
  loadEntities();
  setGravity(3200);

  initGameScene("game", ageCallback, gameEndCallback);

  layers(["background", "game"], "game");

  scene("lose", () => {
    add([text("You lose"), pos(24, 24)]);
    add([text("Press any key to restart"), pos(24, 64)]);
    onKeyPress(() => go("game"));
    onClick(() => go("game"));
  });

  scene("win", ({ coins }) => {
    add([text(`You won ${coins} coins !`), pos(24, 24)]);
    add([text("Press any key to restart"), pos(24, 64)]);
    onKeyPress(() => go("game"));
    onClick(() => go("game"));
  });

  go("game");
};

export default init;
