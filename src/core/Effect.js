export const effectType = {
  LIFE_INDICATOR_EFFECT: "LIFE_INDICATOR_EFFECT",
  LIFE_EVENT_EFFECT: "LIFE_EVENT_EFFECT",
};

export const changeOperation = {
  ADD: "ADD",
  SET: "SET",
};

export const ChangeOperationMap = {
  [changeOperation.ADD]: ({ payload, current }) => payload + current,
  [changeOperation.SET]: ({ payload }) => payload,
};

export const createEffect = (type, key, changes) => {
  return {
    type,
    key,
    changes,
  };
};

export const lifeIndicatorEffect = (key, changes) => {
  return createEffect(effectType.LIFE_INDICATOR_EFFECT, key, changes);
};

export const lifeEventEffect = (key, changes) => {
  return createEffect(effectType.LIFE_EVENT_EFFECT, key, changes);
};

export const changeProperty = (value, { op, payload }) => {
  return ChangeOperationMap[op]({ payload, current: value });
};
export const applyLifeIndicatorChanges = (lifeIndicator, changes) => {
  return Object.keys(changes).reduce(
    (acc, prop) => {
      return {
        ...acc,
        [prop]: changeProperty(lifeIndicator[prop], changes[prop]),
      };
    },
    { ...lifeIndicator },
  );
};

export const applyLifeEventChanges = (lifeEvent, changes) => {
  return Object.keys(changes).reduce(
    (acc, prop) => {
      return {
        ...acc,
        [prop]: changeProperty(lifeEvent[prop], changes[prop]),
      };
    },
    { ...lifeEvent },
  );
};

export const applyEffects = (
  effects,
  { lifeIndicators, lifeEvents, probabilityMatrix },
) => {
  return effects.reduce(
    (acc, effect) => {
      return {
        ...acc,
        lifeIndicators: Object.keys(acc.lifeIndicators).reduce(
          (acc2, indicatorKey) => {
            if (effect.key === indicatorKey) {
              return {
                ...acc2,
                [indicatorKey]: applyLifeIndicatorChanges(
                  acc2[indicatorKey],
                  effect.changes,
                ),
              };
            }

            return acc2;
          },
          acc.lifeIndicators,
        ),
        lifeEvents: acc.lifeEvents.map((lifeEvent) =>
          lifeEvent.key === effect.key
            ? applyLifeEventChanges(lifeEvent, effect.changes)
            : lifeEvent,
        ),
      };
    },
    {
      lifeIndicators,
      lifeEvents,
      probabilityMatrix,
    },
  );
};

export const add = (n) => {
  return {
    op: changeOperation.ADD,
    payload: n,
  };
};
export const set = (n) => {
  return {
    op: changeOperation.SET,
    payload: n,
  };
};
