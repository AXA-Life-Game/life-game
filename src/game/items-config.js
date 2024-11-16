import { patrol } from "./game-animations";
import buyHouse from "../assets/events/buy-house.png";
import { LIFE_EVENTS } from "../core/LifeEvent.js";

export const itemsConfig = {
  tileWidth: 64,
  tileHeight: 64,
  tiles: {
    "💼": () => [
      text("💼"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "getJob",
      "event",
    ],
    "🤑": () => [
      sprite("salaryIncrease"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "salaryIncrease",
      "event",
    ],
    "=": () => [
      sprite("grass"),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ destroy: true }),
      "platform",
    ],
    b: () => [
      sprite("idleKid", { anim: "idle" }),
      area(),
      scale(1.5),
      anchor("bot"),
      offscreen({ hide: true }),
      "baby",
      "event",
    ],
    "-": () => [
      sprite("steel"),
      area(),
      body({ isStatic: true }),
      offscreen({ hide: true }),
      anchor("bot"),
      "platform",
    ],

    "%": () => [
      sprite("axaLogo"),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "prize",
    ],

    r: () => [
      sprite("randomEvent"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "randomEvent",
      "event",
    ],

    ...LIFE_EVENTS.reduce((acc, currentValue) => {
      return {
        ...acc,
        [currentValue.icon]: () => [
          text(currentValue.icon),
          area(),
          anchor("bot"),
          offscreen({ hide: true }),
          currentValue.key,
          "event",
        ],
      };
    }, {}),
  },
};

export const itemsMapping = {
  JOB: {
    symbol: "g",
  },
  APARTMENT: {
    symbol: "a",
  },
  "3A_INSURANCE": {
    symbol: "t",
  },
  PART_TIME_JOB: {
    symbol: "p",
  },
  HOUSEHOLD_INSURANCE: {
    symbol: "l",
  },
  MARRIAGE: {
    symbol: "m",
  },
  KIDS: {
    symbol: "k",
  },
  SECOND_PILLAR: {
    symbol: "s",
  },
  EDUCATION: {
    symbol: "e",
  },
  SALARY_INCREASE: {
    symbol: "n",
  },
  HOUSE: {
    symbol: "h",
  },
  HOUSE_INSURANCE: {
    symbol: "i",
  },
  LOTTERY: {
    symbol: "o",
  },
  ROBBERY: {
    symbol: "y",
  },
  FLOODING: {
    symbol: "f",
  },
  DIVORCE: {
    symbol: "d",
  },
  JOB_LOSS: {
    symbol: "j",
  },
};
