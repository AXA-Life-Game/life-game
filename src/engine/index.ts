import { GameEngine } from "./engine";
import { LifeEvent } from "./life-event";
import { Lifebar } from "./lifebar";

const jobLifeEvent = new LifeEvent();
jobLifeEvent.type = "JOB";
jobLifeEvent.frequency = { limit: 20 };
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
householdLiabilityInsuranceEvent.type = "HOUSEHOLD_INSURANCE";
householdLiabilityInsuranceEvent.frequency = { limit: 0 };
householdLiabilityInsuranceEvent.effect = {
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
threeAInsuranceEvent.type = "3A_INSURANCE";
threeAInsuranceEvent.frequency = { limit: 3 };
threeAInsuranceEvent.effect = {
  lifebars: [
    new Lifebar("MONEY", -2000),
    new Lifebar("THIRDPILLAR", 2000),
    new Lifebar("TAX", -300),
  ],
  lifeEvents: [],
};

const marriageEvent = new LifeEvent();
marriageEvent.type = "MARRIAGE";
marriageEvent.frequency = { limit: 0 };
marriageEvent.effect = {
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
kidsEvent.type = "KIDS";
kidsEvent.frequency = { limit: 0 };
kidsEvent.effect = {
  lifebars: [
    new Lifebar("INCOME", 250),
    new Lifebar("TAX", -300),
    new Lifebar("EXPENSES", 1500),
  ],
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
partTimeEvent.type = "PART_TIME_JOB";
partTimeEvent.frequency = { limit: 0 };
partTimeEvent.effect = {
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
secondPillarEvent.type = "SECOND_PILLAR";
secondPillarEvent.frequency = { limit: 0 };
secondPillarEvent.effect = {
  lifebars: [new Lifebar("MONEY", -20000), new Lifebar("TAX", -3000)],
  lifeEvents: [],
};

// followed by additional life event salary increase
const educationEvent = new LifeEvent();
educationEvent.type = "EDUCATION";
educationEvent.frequency = { limit: 2 };
educationEvent.effect = {
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
salaryIncreaseEvent.type = "SALARY_INCREASE";
salaryIncreaseEvent.frequency = { limit: 0 };
salaryIncreaseEvent.effect = {
  lifebars: [new Lifebar("MONEY", 1000)],
  lifeEvents: [],
};

const buyHouseEvent = new LifeEvent();
buyHouseEvent.type = "HOUSE";
buyHouseEvent.frequency = { limit: 0 };
buyHouseEvent.effect = {
  lifebars: [new Lifebar("MONEY", -200000), new Lifebar("EXPENSES", 750)],
  lifeEvents: [],
};

const houseInsuranceEvent = new LifeEvent();
houseInsuranceEvent.type = "HOUSE_INSURANCE";
houseInsuranceEvent.frequency = { limit: 0 };
houseInsuranceEvent.effect = {
  lifebars: [new Lifebar("EXPENSES", 100)],
  lifeEvents: [
    {
      type: "HOUSE_INSURANCE",
      frequency: {
        limit: 0,
      },
    },
  ],
};

//followed by additional life event 2nd pillar
const lotteryEvent = new LifeEvent();
lotteryEvent.type = "LOTTERY";
lotteryEvent.frequency = { limit: 0 };
lotteryEvent.effect = {
  lifebars: [new Lifebar("MONEY", 200000)],
  lifeEvents: [
    {
      type: "SECOND_PILLAR",
      frequency: {
        limit: 1,
      },
    },
  ],
};

const robberyEvent = new LifeEvent();
robberyEvent.type = "ROBBERY";
robberyEvent.frequency = { limit: 0 };
robberyEvent.effect = {
  lifebars: [new Lifebar("MONEY", -5000)],
  lifeEvents: [],
};

const floodingEvent = new LifeEvent();
floodingEvent.type = "FLOODING";
floodingEvent.frequency = { limit: 0 };
floodingEvent.effect = {
  lifebars: [new Lifebar("MONEY", -5000)],
  lifeEvents: [],
};

const divorceEvent = new LifeEvent();
divorceEvent.type = "DIVORCE";
divorceEvent.frequency = { limit: 0 };
divorceEvent.effect = {
  lifebars: [],
  lifeEvents: [],
};

const jobLossEvent = new LifeEvent();
jobLossEvent.type = "JOB_LOSS";
jobLossEvent.frequency = { limit: 0 };
jobLossEvent.effect = {
  lifebars: [new Lifebar("INCOME", -20)],
  lifeEvents: [
    {
      type: "JOB",
      frequency: {
        limit: 3,
      },
    },
    {
      type: "JOB_LOSS",
      frequency: {
        limit: 0,
      },
    },
  ],
};

export const gameEngine = (
  endGame: CallableFunction,
  lostGame: CallableFunction
): GameEngine => {
  return new GameEngine(
    [
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
      buyHouseEvent,
      houseInsuranceEvent,
      lotteryEvent,
      robberyEvent,
      floodingEvent,
      jobLossEvent,
      divorceEvent,
    ],
    endGame,
    lostGame
  );
};
