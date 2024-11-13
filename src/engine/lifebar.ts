import { GLOBAL_CONFIG } from "./config";
import { LifeEvent } from "./life-event";
import { LifebarType, LifeEventEffect, Month } from "./types";

export class Lifebar {
    private type!: LifebarType;
    private value!: number;
  
    constructor(type: LifebarType, value: number) {
      this.type = type;
      this.value = value;
    }
  
    public applyEffect(effect: LifeEventEffect): void {
      effect.lifebars.forEach((lifebar) => {
        if (lifebar.type === this.type) {
          this.value += lifebar.value;
        }
      });
    }
  
    public updateValueOnProgress(
      collectedEvents: LifeEvent[],
      gameAge: Month
    ): void {
      switch (this.type) {
        case "AGE":
          this.value = Math.floor(GLOBAL_CONFIG.startingAge + gameAge / 12);
          break;
        case "INCOME":
          collectedEvents.forEach((event) => {
            const incomeLifebar = event.effect.lifebars.find(
              (lifebar) => lifebar.type === "INCOME"
            );
            if (incomeLifebar) {
              this.value += incomeLifebar.value;
            }
          });
          this.value += 5000;
          break;
        // TODO: add others
        default:
          break;
      }
    }
  }