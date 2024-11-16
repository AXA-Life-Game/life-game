import { lifeEventEffect, lifeIndicatorEffect, set, add } from "./Effect.js";

export const LIFE_EVENTS = [
  {
    key: "GET_JOB",
    icon: "💼",
    probability: 1,
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(5000) }),
      lifeIndicatorEffect("TAXES", { value: add(550) }),

      lifeEventEffect("PART_TIME", { probability: set(1) }),
      lifeEventEffect("RENT_APARTMENT", { probability: set(1) }),
    ],
  },
  {
    key: "RENT_APARTMENT",
    icon: "🏢",
    probability: 0,
    effects: [
      lifeIndicatorEffect("EXPENSES", { value: add(1400) }),
      lifeEventEffect("HOUSEHOLD_LIABILITY_INSURANCE", {
        probability: set(1),
      }),
      lifeEventEffect("KIDS", { probability: set(1) }),
    ],
  },
  {
    key: "HOUSEHOLD_LIABILITY_INSURANCE",
    icon: "🚡️",
    probability: 0,
    effects: [lifeIndicatorEffect("EXPENSES", { value: add(100) })],
  },
  {
    key: "3A_INSURANCE",
    icon: "🏦",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-7000) }),
      lifeIndicatorEffect("THIRD_PILLAR", { value: add(7000) }),
      lifeIndicatorEffect("TAXES", { value: add(-300) }),
    ],
  },
  {
    key: "MARRIAGE",
    icon: "💍",
    probability: 0,
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(6000) }),
      lifeIndicatorEffect("TAXES", { value: add(800) }),
      lifeEventEffect("KIDS", { probability: set(1) }),
      lifeEventEffect("DIVORCE", { probability: set(1) }),
    ],
  },
  {
    key: "KIDS",
    icon: "👶",
    probability: 0,
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(250) }),
      lifeIndicatorEffect("TAXES", { value: add(-300) }),
      lifeIndicatorEffect("EXPENSES", { value: add(1500) }),
    ],
  },
  {
    key: "PART_TIME",
    icon: "🕒",
    probability: 0,
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(-1500) }),
      lifeIndicatorEffect("TAXES", { value: add(-200) }),
    ],
  },
  {
    key: "2ND_PILLAR",
    icon: "🏛️",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-20000) }),
      lifeIndicatorEffect("TAXES", { value: add(-3000) }),
      lifeIndicatorEffect("SECOND_PILLAR", { value: add(20000) }),
    ],
  },
  {
    key: "EDUCATION",
    icon: "🎓",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-20000) }),
      lifeEventEffect("SALARY_INCREASE", { probability: set(1) }),
    ],
  },
  {
    key: "SALARY_INCREASE",
    icon: "🤑",
    probability: 0,
    effects: [lifeIndicatorEffect("SALARY", { value: add(1000) })],
  },
  {
    key: "BUY_HOUSE",
    icon: "🏠",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-200000) }),
      lifeIndicatorEffect("EXPENSES", { value: add(750) }),
      lifeEventEffect("HOUSE_INSURANCE", { probability: set(1) }),
    ],
  },
  {
    key: "HOUSE_INSURANCE",
    icon: "🏠🚡️",
    probability: 0,
    effects: [lifeIndicatorEffect("EXPENSES", { value: add(100) })],
  },
  {
    key: "LOTTERY",
    icon: "🎲",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(500000) }),
      lifeEventEffect("2ND_PILLAR", { probability: set(1) }),
    ],
  },
  {
    key: "ROBBERY",
    icon: "🧙",
    probability: 0,
    effects: [lifeIndicatorEffect("MONEY", { value: add(-5000) })],
  },
  {
    key: "FLOODING",
    icon: "🌊",
    probability: 0,
    effects: [lifeIndicatorEffect("MONEY", { value: add(-500000) })],
  },
  {
    key: "DIVORCE",
    icon: "💔",
    probability: 0,
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-3000) }),
      lifeIndicatorEffect("SALARY", { value: add(-1000) }),
      lifeIndicatorEffect("TAXES", { value: add(300) }),
    ],
  },
  {
    key: "JOB_LOSS",
    icon: "💼❌",
    probability: 0,
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(-5000) }),
      lifeEventEffect("GET_JOB", { probability: set(1) }),
    ],
  },
];

export const getLifeEventByKey = (lifeEvents, key) => {
  return lifeEvents.find((event) => event.key === key);
};
