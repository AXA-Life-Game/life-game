import { LifeEvent } from "./life-event";
import { Lifebar } from "./lifebar";

  
  export type LifeEventEffect = {
    lifebars: Lifebar[];
    lifeEvents: {
      type: LifeEventType;
      frequency: Frequency;
    }[];
  };
  
  export type Frequency = {
    limit: number;
    probability?: Percentage;
  };
  

  export type LifeEventType =
    | "JOB"
    | "APARTMENT"
    | "3A_INSURANCE"
    | "PART_TIME_JOB"
    | "HOUSEHOLD_INSURANCE"
    | "MARRIAGE"
    | "KIDS"
    | "SECOND_PILLAR"
    | "EDUCATION"
    | "SALARY_INCREASE"
    | "HOUSE"
    | "HOUSE_INSURANCE"
    | "LOTTERY"
    | "ROBBERY"
    | "FLOODING"
    | "DIVORCE"
    | "JOB_LOSS";
  
  
  
  export type LifebarType =
    | "AGE"
    | "MONEY"
    | "CHILDAGE"
    | "INCOME"
    | "TAX"
    | "EXPENSES"
    | "THIRDPILLAR"
    | "SECONDPILLAR";
  

  
  export type GameState = {
    lifebars: Lifebar[];
    collectedEvents: LifeEvent[];
  };
  
  export type Year = number;
  export type Month = number;
  export  type Percentage = number;
  

  