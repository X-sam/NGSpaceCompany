export const computeCost = (base: number, n: number) => {
  return Math.floor((base * (1 - Math.pow(1.02, n))) / (1 - 1.02));
};

export const costToX = (x, data) => {
  const getCost = (cost) =>
    computeCost(cost, x) - computeCost(cost, data["segment"].count);
  let [costTitanium, costGold, costSilicon, costMeteorite, costIce] = data[
    "segment"
  ].baseCosts.map(({ count }) => getCost(count));

  if (data["titanium"].titan == true) costTitanium *= 0.1;
  if (data["gold"].titan == true) costGold *= 0.1;
  if (data["silicon"].titan == true) costSilicon *= 0.1;
  if (data["meteorite"].titan == true) costMeteorite *= 0.1;
  if (data["ice"].titan == true) costIce *= 0.1;

  return {
    titanium: {
      count: costTitanium,
      timer:
        data["titanium"].prod > 0
          ? (costTitanium - data["titanium"].count) / data["titanium"].prod
          : 0,
    },
    gold: {
      count: costGold,
      timer:
        data["gold"].prod > 0
          ? (costGold - data["gold"].count) / data["gold"].prod
          : 0,
    },
    silicon: {
      count: costSilicon,
      timer:
        data["silicon"].prod > 0
          ? (costSilicon - data["silicon"].count) / data["silicon"].prod
          : 0,
    },
    meteorite: {
      count: costMeteorite,
      timer:
        data["meteorite"].prod > 0
          ? (costMeteorite - data["meteorite"].count) / data["meteorite"].prod
          : 0,
    },
    ice: {
      count: costIce,
      timer:
        data["ice"].prod > 0
          ? (costIce - data["ice"].count) / data["ice"].prod
          : 0,
    },
  };
};
