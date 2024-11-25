import { add, lifeIndicatorEffect, set } from "./Effect.js";

// 💼 - getting job
// 🏢 - rent apartment
// 🚡️ - household liability insurance
// 🏦 - 3a insurance
// 💍 - marriage
// 👶 - kids
// 🕒 - part time
// 🏛️ - 2nd pillar
// 🎓 - education
// 🤑 - salary increase
// 🏠 - buy house
// 🏠🚡️house insurance
// 🎲 - lottery winning
// 🧙 - robbery
// 🌊 - flooding
// 💔 - divorce
// 💼❌ - lose job
export const LIFE_EVENTS = [
  {
    key: "GET_JOB",
    icon: "💼",
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(5000) }),
      lifeIndicatorEffect("TAXES", { value: add(500) }),
      lifeIndicatorEffect("HAS_JOB", { value: set(1) }),
      lifeIndicatorEffect("EXPENSES", { value: add(2000) }),
    ],
  },
  {
    key: "RENT_APARTMENT",
    icon: "🏢",
    effects: [
      lifeIndicatorEffect("EXPENSES", { value: add(1400) }),
      lifeIndicatorEffect("HAS_RENT_APARTMENT", { value: set(1) }),
    ],
  },
  {
    key: "HOUSEHOLD_LIABILITY_INSURANCE",
    icon: "🚡️",
    effects: [
      lifeIndicatorEffect("EXPENSES", { value: add(100) }),
      lifeIndicatorEffect("HAS_HOUSEHOLD_INSURANCE", { value: set(1) }),
    ],
  },
  {
    key: "3A_INSURANCE",
    icon: "🏦",
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-5000) }),
      lifeIndicatorEffect("THIRD_PILLAR", { value: add(5000) }),
      lifeIndicatorEffect("TAXES", { value: add(-300) }),
    ],
  },
  {
    key: "MARRIAGE",
    icon: "💍",
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(6000) }),
      lifeIndicatorEffect("TAXES", { value: add(800) }),
      lifeIndicatorEffect("HAS_MARRIED", { value: set(1) }),
    ],
  },
  {
    key: "KIDS",
    icon: "👶",
    effects: [
      lifeIndicatorEffect("TAXES", { value: add(-300) }),
      lifeIndicatorEffect("EXPENSES", { value: add(2000) }),
      lifeIndicatorEffect("HAS_KIDS", { value: set(1) }),
    ],
  },
  {
    key: "PART_TIME",
    icon: "🕒",
    effects: [
      lifeIndicatorEffect("SALARY", { value: add(-1500) }),
      lifeIndicatorEffect("TAXES", { value: add(-200) }),
      lifeIndicatorEffect("HAS_PART_TIME", { value: set(1) }),
    ],
  },
  {
    key: "2ND_PILLAR",
    icon: "🏛️",
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-20000) }),
      lifeIndicatorEffect("TAXES", { value: add(-200) }),
      lifeIndicatorEffect("SECOND_PILLAR", { value: add(20000) }),
    ],
  },
  {
    key: "EDUCATION",
    icon: "🎓",
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-20000) }),
      lifeIndicatorEffect("HAS_EDUCATION", { value: set(1) }),
    ],
  },
  {
    key: "SALARY_INCREASE",
    icon: "🤑",
    effects: [lifeIndicatorEffect("SALARY", { value: add(1000) })],
  },
  {
    key: "BUY_HOUSE",
    icon: "🏠",
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-200000) }),
      lifeIndicatorEffect("EXPENSES", { value: add(750) }),
      lifeIndicatorEffect("HAS_HOUSE", { value: set(1) }),
    ],
  },
  {
    key: "HOUSE_INSURANCE",
    icon: "🏠🚡️",
    effects: [
      lifeIndicatorEffect("EXPENSES", { value: add(100) }),
      lifeIndicatorEffect("HAS_HOUSE_INSURANCE", { value: set(1) }),
    ],
  },
  {
    key: "LOTTERY",
    icon: "🎲",
    effects: [lifeIndicatorEffect("MONEY", { value: add(500000) })],
  },
  {
    key: "ROBBERY",
    icon: "🧙",
    effects: [lifeIndicatorEffect("MONEY", { value: add(-5000) })],
  },
  {
    key: "FLOODING",
    icon: "🌊",
    effects: [lifeIndicatorEffect("MONEY", { value: add(-500000) })],
  },
  {
    key: "DIVORCE",
    icon: "💔",
    effects: [
      lifeIndicatorEffect("MONEY", { value: add(-3000) }),
      lifeIndicatorEffect("SALARY", { value: add(-1000) }),
      lifeIndicatorEffect("TAXES", { value: add(300) }),
    ],
  },
  {
    key: "JOB_LOSS",
    icon: "💼❌",
    effects: [
      lifeIndicatorEffect("SALARY", { value: set(0) }),
      lifeIndicatorEffect("TAXES", { value: add(-500) }),
      lifeIndicatorEffect("HAS_JOB", { value: set(0) }),
    ],
  },
];

export const getLifeEventByKey = (lifeEvents, key) => {
  return lifeEvents.find((event) => event.key === key);
};
