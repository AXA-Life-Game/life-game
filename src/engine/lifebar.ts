import {GLOBAL_CONFIG} from "./config";
import {LifeEvent} from "./life-event";
import {LifebarType, LifeEventEffect, Month} from "./types";

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
                this.value = collectedEvents.reduce((eventAcc, currentEvent) => {
                    const filteredLifebar = currentEvent.effect.lifebars.find((lifebar) => lifebar.type === "INCOME");
                    if (filteredLifebar) {
                        return eventAcc + filteredLifebar.value;
                    }
                }, 0);
                break;
            case "TAX":
                this.value = collectedEvents.reduce((eventAcc, currentEvent) => {
                    const filteredLifebar = currentEvent.effect.lifebars.find((lifebar) => lifebar.type === "TAX");
                    if (filteredLifebar) {
                        return eventAcc + filteredLifebar.value;
                    }
                }, 0);
                break;
            case "EXPENSES":
                this.value = collectedEvents.reduce((eventAcc, currentEvent) => {
                    const filteredLifebar = currentEvent.effect.lifebars.find((lifebar) => lifebar.type === "EXPENSES");
                    if (filteredLifebar) {
                        return eventAcc + filteredLifebar.value;
                    }
                }, 0);
                break;
            case "THIRDPILLAR":
                this.value = collectedEvents.reduce((eventAcc, currentEvent) => {
                    const filteredLifebar = currentEvent.effect.lifebars.find((lifebar) => lifebar.type === "THIRDPILLAR");
                    if (filteredLifebar) {
                        return eventAcc + filteredLifebar.value;
                    }
                }, 0);
                break;
            case "SECONDPILLAR":
                this.value = collectedEvents.reduce((eventAcc, currentEvent) => {
                    const filteredLifebar = currentEvent.effect.lifebars.find((lifebar) => lifebar.type === "SECONDPILLAR");
                    if (filteredLifebar) {
                        return eventAcc + filteredLifebar.value;
                    }
                }, 0);
                break;
            case "MONEY":
                collectedEvents.forEach((event) => {
                    event.effect.lifebars.forEach((lifebar) => {
                        if (lifebar.type === "MONEY") {
                            this.value += lifebar.value;
                        }
                    });
                });
            // TODO: add others
            default:
                break;
        }
    }
}