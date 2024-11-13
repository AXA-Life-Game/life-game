import { LifeEvent } from "./life-event";
import { Lifebar } from "./lifebar";
import { GameState, Month } from "./types";

export class GameEngine {
    private state!: GameState;
    private lifeEventCollection: LifeEvent[] = [];
  
    constructor(lifeEvents: LifeEvent[], initialState?: GameState) {
        this.lifeEventCollection = lifeEvents;
      if (initialState) {
        this.state = initialState;
      } else {
        this.initLifebars();
      }
    }
  
    private initLifebars(): void {
      this.state = {
        lifebars: [
          new Lifebar("MONEY", 10000),
          new Lifebar("CHILDAGE", 0),
          new Lifebar("INCOME", 0),
          new Lifebar("TAX", 0),
          new Lifebar("EXPENSES", 0),
          new Lifebar("THIRDPILLAR", 0),
          new Lifebar("SECONDPILLAR", 0),
          new Lifebar("AGE", 18),
        ],
        collectedEvents: [],
      };
    }
  
    public addLifeEvent(lifeEvent: LifeEvent, time: Month): void {
      lifeEvent.collectedTime = time;
      this.lifeEventCollection.forEach((event) => {
        event.mutate(lifeEvent);
      });
      this.state.lifebars.forEach((lifebar) => {
        lifebar.applyEffect(lifeEvent.effect);
      });
      this.state.collectedEvents.push(lifeEvent);
    }
  
    public progress(time: Month): GameEngine {
      this.state.lifebars.forEach((lifebar) => {
        lifebar.updateValueOnProgress(this.state.collectedEvents, time);
      });
      this.aggregateMoney(this.state.lifebars);
      return this;
    }

    private aggregateMoney(lifebars: Lifebar[]) {
        const money = lifebars.find((lifebar) => lifebar.getType() === "MONEY");
        const income = lifebars.find((lifebar) => lifebar.getType() === "INCOME");
        const expenses = lifebars.find((lifebar) => lifebar.getType() === "EXPENSES");
        const tax = lifebars.find((lifebar) => lifebar.getType() === "TAX");
        if (money && income && expenses && tax) {
            money.setValue(money.getValue() + income.getValue() - expenses.getValue() - tax.getValue());
        }
    }
  
    public getNextLifeEvent(): LifeEvent[] {
      return this.lifeEventCollection
        .filter(
          (lifeEvent) => lifeEvent.frequency && lifeEvent.frequency.limit > 0
        )
        .filter(
          (lifeEvent) =>
            !lifeEvent.frequency!.probability ||
            Math.random() < lifeEvent.frequency!.probability!
        )
        .map((lifeEvent) => {
          lifeEvent.frequency!.limit -= 1;
          return lifeEvent;
        });
    }
  
    public getLifeEventCollection(): LifeEvent[] {
      return this.lifeEventCollection;
    }
  
    public getState(): GameState {
      return this.state;
    }
  }