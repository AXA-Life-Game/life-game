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
