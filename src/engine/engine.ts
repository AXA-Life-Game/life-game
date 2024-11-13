import {LifeEvent} from "./life-event";
import {Lifebar} from "./lifebar";
import {GameState, Month} from "./types";
import {GLOBAL_CONFIG} from "./config";

export class GameEngine {
    private state!: GameState;
    private lifeEventCollection: LifeEvent[] = [];
    private endGame: CallableFunction;
    private lostGame: CallableFunction;

    constructor(lifeEvents: LifeEvent[], endGame: CallableFunction, lostGame: CallableFunction, initialState?: GameState) {
        this.lifeEventCollection = lifeEvents;
        this.endGame = endGame;
        this.lostGame = lostGame;
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
        this.applySpecialRules(lifeEvent);
        this.state.collectedEvents.push(lifeEvent);
    }

    private applySpecialRules(lifeEvent: LifeEvent) {
        const incomeBar = this.state.lifebars.find((lifebar) => lifebar.getType() === "INCOME")!;
        const moneyBar = this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!;
        const taxBar = this.state.lifebars.find((lifebar) => lifebar.getType() === "TAX")!;
        const thirdPillarBar = this.state.lifebars.find((lifebar) => lifebar.getType() === "THIRDPILLAR")!;
        const secondPillarBar = this.state.lifebars.find((lifebar) => lifebar.getType() === "SECONDPILLAR")!;
        switch (lifeEvent.type) {
            case "HOUSE":
                const currentMoney = this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!.getValue();
                const currentThirdPillar = this.state.lifebars.find((lifebar) => lifebar.getType() === "THIRDPILLAR")!.getValue();
                const currentSecondPillar = this.state.lifebars.find((lifebar) => lifebar.getType() === "SECONDPILLAR")!.getValue();
                if (currentMoney > 250000) {
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!.setValue(currentMoney - 200000);
                } else if (currentMoney >= 200000 && currentMoney <= 250000 && currentThirdPillar > 50000) {
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!.setValue(currentMoney - 150000);
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "THIRDPILLAR")!.setValue(currentThirdPillar - 50000);
                } else {
                    const housePrice = 200000 - currentThirdPillar - currentSecondPillar;
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!.setValue(currentMoney - housePrice);
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "SECONDPILLAR")!.setValue(0);
                    this.state.lifebars.find((lifebar) => lifebar.getType() === "THIRDPILLAR")!.setValue(0);
                }
                break;
            case "DIVORCE":
                incomeBar.setValue(incomeBar.getValue() * 0.7);
                moneyBar.setValue(moneyBar.getValue() * 0.7);
                taxBar.setValue(taxBar.getValue() * 0.7);
                thirdPillarBar.setValue(thirdPillarBar.getValue() * 0.7);
                secondPillarBar.setValue(secondPillarBar.getValue() * 0.7);
                break;
            case "ROBBERY":
                const householdEvent = this.state.collectedEvents.find((event) => event.type === "HOUSEHOLD_INSURANCE");
                if (householdEvent) {
                    moneyBar.setValue(moneyBar.getValue() * 0.9);
                } else {
                    moneyBar.setValue(moneyBar.getValue() * 0.5);
                }
                break;
            case "FLOODING":
                const houseEvent = this.state.collectedEvents.find((event) => event.type === "HOUSE_INSURANCE");
                if (houseEvent) {
                    moneyBar.setValue(moneyBar.getValue() * 0.9);
                } else {
                    moneyBar.setValue(moneyBar.getValue() * 0.5);
                }
                break;
            default:
                break;
        }
    }

    public progress(time: Month): GameEngine {
        this.state.lifebars.forEach((lifebar) => {
            lifebar.updateValueOnProgress(this.state.collectedEvents, time);
        });
        this.aggregateMoney(this.state.lifebars);
        if (this.state.lifebars.find((lifebar) => lifebar.getType() === "MONEY")!.getValue() <= GLOBAL_CONFIG.lostGameMoney) {
            this.lostGame();
        }
        if (this.state.lifebars.find((lifebar) => lifebar.getType() === "AGE")!.getValue() > GLOBAL_CONFIG.endGameAge) {
            this.endGame();
        }
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