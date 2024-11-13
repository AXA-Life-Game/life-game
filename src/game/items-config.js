import { patrol } from "./game-animations";
import buyHouse from "../assets/events/buy-house.png";

export const itemsConfig = {
  tileWidth: 64,
  tileHeight: 64,
  tiles: {
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
    0: () => [
      sprite("mushroom"),
      area(),
      body(),
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
      anchor("bot"),
      offscreen({ hide: true }),
      "danger",
    ],
    "#": () => [
      sprite("bacon"),
      area(),
      anchor("bot"),
      body(),
      offscreen({ hide: true }),
      "bacon",
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
    s: () => [
      sprite("secondPillar"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "secondPillar",
      "event",
    ],
    t: () => [
      sprite("threeAInsurance"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "threeAInsurance",
      "event",
    ],
    h: () => [
      sprite("buyHouse"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "buyHouse",
      "event",
    ],
    d: () => [
      sprite("divorce"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "divorce",
      "event",
    ],
    e: () => [
      sprite("education"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "education",
      "event",
    ],
    f: () => [
      sprite("flooding"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "flooding",
      "event",
    ],
    g: () => [
      sprite("getJob"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "getJob",
      "event",
    ],
    i: () => [
      sprite("houseInsurance"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "houseInsurance",
      "event",
    ],
    l: () => [
      sprite("householdLiabilityInsurance"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "householdLiabilityInsurance",
      "event",
    ],
    j: () => [
      sprite("jobLoss"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "jobLoss",
      "event",
    ],
    k: () => [
      sprite("kids"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "kids",
      "event",
    ],
    o: () => [
      sprite("lottery"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "lottery",
      "event",
    ],
    m: () => [
      sprite("marriage"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "marriage",
      "event",
    ],
    p: () => [
      sprite("partTime"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "partTime",
      "event",
    ],
    r: () => [
      sprite("randomEvent"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "randomEvent",
      "event",
    ],
    a: () => [
      sprite("rentApartment"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "rentApartment",
      "event",
    ],
    y: () => [
      sprite("robbery"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "robbery",
      "event",
    ],
    n: () => [
      sprite("salaryIncrease"),
      area(),
      anchor("bot"),
      offscreen({ hide: true }),
      "salaryIncrease",
      "event",
    ],
  },
};
