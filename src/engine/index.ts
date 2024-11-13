import { GameEngine } from "./engine";
import { LifeEvent } from "./life-event";
import { Lifebar } from "./lifebar";

const jobLifeEvent = new LifeEvent();
jobLifeEvent.type = "JOB";
jobLifeEvent.frequency = { limit: 3 };
jobLifeEvent.effect = {
  lifebars: [new Lifebar("INCOME", 5000), new Lifebar("TAX", 550)],
  lifeEvents: [
    {
      type: "APARTMENT",
      frequency: {
        limit: 3,
      },
    },
    {
      type: "JOB",
      frequency: {
        limit: 0,
      },
    },
    {
      type: "PART_TIME_JOB",
      frequency: {
        limit: 3,
      },
    },
  ],
};

const apartmentLifeEvent = new LifeEvent();
apartmentLifeEvent.type = "APARTMENT";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("EXPENSES", 1400)],
  lifeEvents: [
    {
      type: "APARTMENT",
      frequency: {
        limit: 0,
      },
    },
    {
      type: "KIDS",
      frequency: {
        limit: 1,
      },
    },
    {
      type: "HOUSEHOLD_INSURANCE",
      frequency: {
        limit: 0.2,
      },
    },
  ],
};

const householdLiabilityInsuranceEvent = new LifeEvent();
apartmentLifeEvent.type = "HOUSEHOLD_INSURANCE";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("EXPENSES", 100)],
  lifeEvents: [
    {
      type: "HOUSEHOLD_INSURANCE",
      frequency: {
        limit: 0,
      },
    },
  ],
};

const threeAInsuranceEvent = new LifeEvent();
apartmentLifeEvent.type = "3A_INSURANCE";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [
    new Lifebar("MONEY", -2000),
    new Lifebar("THIRDPILLAR", 2000),
    new Lifebar("TAX", -300),
  ],
  lifeEvents: [],
};

const marriageEvent = new LifeEvent();
apartmentLifeEvent.type = "MARRIAGE";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("INCOME", 6000), new Lifebar("TAX", 800)],
  lifeEvents: [
    {
      type: "MARRIAGE",
      frequency: {
        limit: 0,
      },
    },
    {
      type: "KIDS",
      frequency: {
        limit: 3,
      },
    },
    {
      type: "DIVORCE",
      frequency: {
        limit: 1,
      },
    },
  ],
};

const kidsEvent = new LifeEvent();
apartmentLifeEvent.type = "KIDS";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("INCOME", 250), new Lifebar("TAX", -300)],
  lifeEvents: [
    {
      type: "KIDS",
      frequency: {
        limit: 0,
      },
    },
  ],
};

const partTimeEvent = new LifeEvent();
apartmentLifeEvent.type = "KIDS";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("INCOME", -1500), new Lifebar("TAX", -200)],
  lifeEvents: [
    {
      type: "PART_TIME_JOB",
      frequency: {
        limit: 0,
      },
    },
  ],
};

const secondPillarEvent = new LifeEvent();
apartmentLifeEvent.type = "KIDS";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("MONEY", -20000), new Lifebar("TAX", -3000)],
  lifeEvents: [],
};

// followed by additional life event salary increase
const educationEvent = new LifeEvent();
apartmentLifeEvent.type = "EDUCATION";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("MONEY", -20000), new Lifebar("TAX", -3000)],
  lifeEvents: [
    {
      type: "SALARY_INCREASE",
      frequency: {
        limit: 1,
      },
    },
  ],
};

const salaryIncreaseEvent = new LifeEvent();
apartmentLifeEvent.type = "SALARY_INCREASE";
apartmentLifeEvent.frequency = { limit: 0 };
apartmentLifeEvent.effect = {
  lifebars: [new Lifebar("MONEY", 1000)],
  lifeEvents: [],
};

export const gameEngine = (): GameEngine => {
  return new GameEngine([
    jobLifeEvent,
    apartmentLifeEvent,
    householdLiabilityInsuranceEvent,
    threeAInsuranceEvent,
    marriageEvent,
    kidsEvent,
    partTimeEvent,
    secondPillarEvent,
    educationEvent,
    salaryIncreaseEvent,
  ]);
};
