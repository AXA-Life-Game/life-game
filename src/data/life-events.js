const LifeIndicators = {
  AGE: {
    value: 18,
  },
  MONEY: {
    value: 10000,
    effects: [
      {
        key: "BUY_HOUSE",
        change: {
          probability: 1,
        },
      },
    ],
  },
  SALARY: {
    value: 0,
  },
};

const LifeEvents = [
  {
    key: "BUY_HOUSE",
    title: "Buying House",
    probability: 0,
    effects: [
      {
        isLifeIndicator: true,
        key: "MONEY",
        change: {
          value: -100000,
        },
      },
    ],
  },
  {
    key: "GET_JOB",
    title: "Get Job",
    probability: 0,
    effects: [
      {
        isLifeIndicator: true,
        key: "SALARY_INCREASE",
        change: {
          value: 5000,
        },
      },
    ],
  },
  {
    key: "SALARY_INCREASE",
    title: "Salary Increase",
    probability: 0,
    effects: [
      {
        isLifeIndicator: true,
        key: "MONEY",
        change: {
          value: -100000,
        },
      },
    ],
  },
];
