import { GameEngine } from "./engine";
import { LifeEvent } from "./life-event";
import { Lifebar } from "./lifebar";

const jobEvent: LifeEvent = new LifeEvent();
jobEvent.type = "JOB";
jobEvent.frequency = {
  limit: 3,
  probability: 1,
};
jobEvent.effect = {
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
  lifebars: [new Lifebar("INCOME", 5000), new Lifebar("TAX", 550)],
  lifeEvents: [],
};

export const gameEngine = (): GameEngine => {
    return new GameEngine([jobLifeEvent, apartmentLifeEvent]);
}