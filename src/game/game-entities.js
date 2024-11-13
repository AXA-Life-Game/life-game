import axaLogo from "../assets/axa-logo.svg.png";
import larry from "../assets/larry-man-blue-walk.png";
import runingKid from "../assets/pink-man-run-32x32.png";
import idleKid from "../assets/pink-man-idle-32x32.png";
import background from "../assets/background.png";

export function loadEntities() {
  // load assets
  loadSprite("background", background);
  loadSprite("axaLogo", axaLogo);
  loadSprite("larry", larry, {
    sliceX: 4,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 3,
        loop: true,
        speed: 15,
      },
    },
  });
  loadSprite("babyLarry", runingKid, {
    sliceX: 12,
    sliceY: 0,
    anims: {
      run: {
        from: 0,
        to: 11,
        loop: true,
        speed: 30,
      },
    },
  });
  loadSprite("idleKid", idleKid, {
    sliceX: 11,
    sliceY: 0,
    anims: {
      idle: {
        from: 0,
        to: 10,
        loop: true,
        speed: 30,
      },
    },
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
}
