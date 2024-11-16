import { maxBy } from "lodash";

const getHighestProbability = (lifeEvents) => {
  return maxBy(lifeEvents, "probability").probability;
};

export const getPossibleEvents = (lifeEvents) => {
  const highestProbability = getHighestProbability(lifeEvents);

  return lifeEvents.filter((event) => event.probability === highestProbability);
};

export const getRandomEvents = (lifeEvents) => {
  const possibleEvents = getPossibleEvents(lifeEvents);

  console.log("possibleEvents", possibleEvents);

  return [possibleEvents[Math.floor(rand(0, possibleEvents.length))]];
};

export const getNextEvent = (currentEvent, probabilitiesMatrix) => {
  if (!currentEvent) return Object.keys(probabilitiesMatrix)[0];

  const eventProbabilities = probabilitiesMatrix[currentEvent];

  if (!eventProbabilities) return null;

  const cumulativeProbabilities = Object.entries(eventProbabilities).reduce(
    (acc, [event, probability]) => {
      const lastSum = acc.length > 0 ? acc[acc.length - 1].sum : 0;
      return [...acc, { event, sum: lastSum + probability }];
    },
    [],
  );

  const random = Math.random();

  const nextEvent = cumulativeProbabilities.find(
    ({ sum }) => random <= sum,
  )?.event;

  return nextEvent || null;
};
