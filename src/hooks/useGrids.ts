import { useAppState, State } from '../common/store';

// 网格类型
export enum GearType {
  small = '小网',
  middle = '中网',
  big = '大网'
}

// 网格幅度
export enum GearPercent {
  small = 0.05,
  middle = 0.15,
  big = 0.3
}

type Grid = {
  // 类型
  type: GearType;
  // 档位
  gear: number;
  // 买入价格
  buyPrice: number;
  // 卖出价格
  sellPrice: number;
  // 买入金额
  buyAmount: number;
  // 买入数量
  buyCount: number;
  // 卖出金额
  sellAmount: number;
  // 卖出数量
  sellCount: number;
  profits: number;
  returnRate: string;
  // 留存利润
  retainedProfits: number;
  // 留存数量
  retainedCount: number;
};

export const toFixedString = (value: number, digits = 3): string => {
  return value.toFixed(digits);
};
export const toFixedNumber = (value: number, digits = 3): number => {
  return parseFloat(toFixedString(value, digits));
};

type GridOptions = Pick<State, 'numberOfRetainedProfits' | 'price'> &
  Pick<Grid, 'type' | 'gear' | 'buyAmount'> & {
    percent: GearPercent;
  };

export const createGrid = (options: GridOptions): Grid => {
  const {
    numberOfRetainedProfits,
    type,
    gear,
    price,
    percent,
    buyAmount
  } = options;
  const buyPrice = gear * price;
  const buyCount = buyAmount / buyPrice;
  const sellPrice = (gear + percent) * price;
  // 收益
  const currentAmount = buyCount * sellPrice;
  const profits = currentAmount - buyAmount;
  const returnRate = toFixedString((profits / buyAmount) * 100, 2) + '%';
  const retainedProfits = profits * numberOfRetainedProfits;
  const retainedCount = retainedProfits / sellPrice;
  const sellAmount = currentAmount - retainedProfits;
  const sellCount = sellAmount / sellPrice;

  return {
    type,
    gear,
    buyAmount,
    buyCount,
    buyPrice,
    sellPrice,
    sellAmount,
    sellCount,
    profits,
    returnRate,
    retainedProfits,
    retainedCount
  };
};

export function useGrids() {
  const state = useAppState();
  const {
    price,
    amount,
    increasePercentPerGrid,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid
  } = state;

  const grids: Grid[] = [];

  //  “
  // 设计交易表格的时候，根据具体情况，模拟最大下跌幅度。
  // 比如说，你现在要开始一个中证500的网格，那你就应该知道，下跌60%，几乎一定是最坏情况了。
  // 甚至下跌50%也非常困难。
  // 那么你如果相对来说激进一点，就可以以40%设计压力测试。
  // 保守一点，就按照50%或者60%设计。
  // ”
  //                                    —— 摘自E大公众号

  // 这里按照最大跌幅60%设计
  const maxGear = 1;
  const minGear = (1 - 0.6) * maxGear;

  let gear = maxGear;
  let i = 0,
    j = 1,
    k = 1;

  while (gear >= minGear) {
    const buyAmount = toFixedNumber(
      (increasePercentPerGrid * i + 1) * amount,
      0
    );

    grids.push(
      createGrid({
        type: GearType.small,
        buyAmount,
        gear,
        percent: GearPercent.small,
        numberOfRetainedProfits,
        price
      })
    );

    // 中网幅度15%
    if (hasMiddleGrid) {
      const middleGear = toFixedNumber(1 - j * GearPercent.middle);
      if (gear === middleGear) {
        j++;
        grids.push(
          createGrid({
            type: GearType.middle,
            buyAmount,
            gear,
            percent: GearPercent.middle,
            numberOfRetainedProfits,
            price
          })
        );
      }
    }

    // 大网幅度30%
    if (hasBigGrid) {
      const bigGear = toFixedNumber(1 - k * GearPercent.big);
      if (gear === bigGear) {
        k++;
        grids.push(
          createGrid({
            type: GearType.big,
            buyAmount,
            gear,
            percent: GearPercent.big,
            numberOfRetainedProfits,
            price
          })
        );
      }
    }

    i++;
    gear = toFixedNumber(1 - i * GearPercent.small);
  }

  return grids;
}
