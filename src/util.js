const randomInRange = () => {
  const min = 100;
  const max = 1000;
  return Math.floor(Math.random() * (max - min)) + min;
};

export const generateData = () => {
  const result = [];
  const startTimestamp = +new Date("2018-12-01");
  const totalSeconds = 24 * 60 * 60 * 0.1;

  for (let i = 0; i < totalSeconds; i++) {
    result.push({
      time: startTimestamp + i * 1000,
      value: randomInRange()
    });
  }

  return result;
};
