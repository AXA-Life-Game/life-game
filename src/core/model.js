import brain from "brain.js";
import fs from "fs";
import { normalizeInput } from "./dataset.js";
import dataset from "./dataset.json" assert { type: "json" };

const eventsList = dataset.reduce((acc, currentValue) => {
  return {
    ...acc,
    [currentValue.Event]: 0,
  };
}, {});

const trainingData = dataset.map((row) => {
  const { Event, ...input } = row;
  return {
    input: normalizeInput(dataset, input),
    output: {
      ...eventsList,
      [Event]: 1,
    },
  };
});

const net = new brain.NeuralNetwork({
  hiddenLayers: [20, 15, 5], // Adjust based on complexity
  activation: "leaky-relu", // Activation function
});

// Train the network
net.train(trainingData, {
  iterations: 10000, // Number of training iterations
  errorThresh: 0.001, // Error threshold to reach
  log: true, // Enable logging
  logPeriod: 100, // Log every 100 iterations
  learningRate: 0.002, // Learning rate
});

// Example game state for prediction
const gameState = normalizeInput(dataset, {
  AGE: 23,
  MONEY: 185000,
  SALARY: 0,
  EXPENSES: 1500,
  TAXES: 500,
  HAS_JOB: 1,
  THIRD_PILLAR: 0,
  SECOND_PILLAR: 0,
  HAS_MARRIED: 1,
  HAS_HOUSE: 0,
  HAS_KIDS: 0,
  HAS_RENT_APARTMENT: 0,
  HAS_HOUSEHOLD_INSURANCE: 0,
  HAS_PART_TIME: 0,
  HAS_EDUCATION: 1,
  HAS_HOUSE_INSURANCE: 0,
});

// Predict the probabilities for each event
const prediction = net.run(gameState);

// Sort predictions to get the top N events
const sortedPredictions = Object.entries(prediction)
  .sort(([, a], [, b]) => b - a) // Sort by probability descending
  .slice(0, 3); // Get the top 3 most likely events

console.log("Predictions", sortedPredictions);
fs.writeFile("./model.json", JSON.stringify(net.toJSON(), null, 2), (err) => {
  if (err) {
    console.error("Error saving the model:", err);
  } else {
    console.log("Model saved successfully as trained_model.json");
  }
});
