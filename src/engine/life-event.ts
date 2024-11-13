import { Frequency, LifeEventEffect, LifeEventType, Month } from "./types";

export class LifeEvent {
    type: LifeEventType | undefined;
    frequency: Frequency | undefined;
    effect!: LifeEventEffect;
    collectedTime: Month | undefined;
    constructor() {}
  
    public mutate(event: LifeEvent): void {
      event.effect.lifeEvents.forEach((lifeEvent) => {
        if (lifeEvent.type === this.type) {
          this.frequency = lifeEvent.frequency;
        }
      });
    }
  }