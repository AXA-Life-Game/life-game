import { maxBy } from "lodash";
import model from "./model.json";
import { NeuralNetwork } from "brain.js";
import { normalizeInput } from "./dataset.js";
import dataset from "./dataset.json";

const net = new NeuralNetwork();
net.fromJSON(model);
const getHighestProbability = (lifeEvents) => {
  return maxBy(lifeEvents, "probability").probability;
};

export const getPossibleEvents = (lifeEvents) => {
  const highestProbability = getHighestProbability(lifeEvents);

  return lifeEvents.filter((event) => event.probability === highestProbability);
};

export const getRandomEvents = (lifeEvents) => {
  const possibleEvents = getPossibleEvents(lifeEvents);

  return [possibleEvents[Math.floor(rand(0, possibleEvents.length))]];
};

const queue = ["💼", "🏢", "🎓", "🤑", "💍", "🏦", "👶", "🕒"];

export const getNextEvent = (gameState) => {
  const state = Object.values(gameState.lifeIndicators).reduce((acc, item) => {
    return {
      ...acc,
      [item.key]: item.value,
    };
  }, {});

  const prediction = net.run(normalizeInput(dataset, state));

  const topEvents = Object.entries(prediction)
    .sort(([, a], [, b]) => b - a) // Sort by probability descending
    .slice(0, 3);

  const [topEventKey] = topEvents[0];

  return gameState.lifeEvents.find((item) => item.key === topEventKey);
};
