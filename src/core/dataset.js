const normalizeMinMax = (value, { min, max }) => {
  return (value - min) / (max - min);
};

const getMinMax = (dataset, key) => {
  const values = dataset.map((row) => parseFloat(row[key]));
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export const normalizeInput = (dataset, input) => {
  const {
    AGE,
    MONEY,
    SALARY,
    TAXES,
    EXPENSES,
    THIRD_PILLAR,
    SECOND_PILLAR,
    ...normalized
  } = input;
  const normalize = (property, value) =>
    normalizeDatasetProperty(dataset, property, value);

  return Object.keys(normalized).reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: parseFloat(normalized[key]),
      };
    },
    {
      AGE: normalize("AGE", AGE),
      MONEY: normalize("MONEY", MONEY),
      SALARY: normalize("SALARY", SALARY),
      EXPENSES: normalize("EXPENSES", EXPENSES),
      THIRD_PILLAR: normalize("THIRD_PILLAR", THIRD_PILLAR),
      SECOND_PILLAR: normalize("SECOND_PILLAR", SECOND_PILLAR),
    },
  );
};

export const normalizeDatasetProperty = (dataset, property, value) => {
  const minMax = getMinMax(dataset, property);

  return normalizeMinMax(value, minMax);
};
