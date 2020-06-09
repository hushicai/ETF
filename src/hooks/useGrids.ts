import { useAppState } from '../common/store';

type Grid = {
  // 档位
  gear: string;
  type: string;
};

export enum GearType {
  small = '小网',
  middle = '中网',
  big = '大网'
}

const toFixed = (value: number): string => {
  return value.toFixed(3);
};
const toFixedNumber = (value: number): number => {
  return parseFloat(toFixed(value));
};

export function useGrids() {
  const state = useAppState();
  const {
    amount,
    increasePercentPerGrid,
    numberOfGrids,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid
  } = state;

  const grids: Grid[] = [];

  // 小网幅度5%
  // 中网幅度15%
  // 大网幅度30%
  for (let i = 0, j = 1, k = 1; i < numberOfGrids; i++) {
    const len = grids.length;

    // 网格数
    if (len >= numberOfGrids) {
      break;
    }

    const gear = toFixedNumber(1 - i * 0.05);

    if (gear <= 0) {
      continue;
    }

    // 小网
    grids.push({
      type: GearType.small,
      gear: toFixed(gear)
    });

    // 中网
    if (hasMiddleGrid) {
      const middleGear = toFixedNumber(1 - j * 0.15);
      if (gear === middleGear) {
        j++;
        grids.push({
          type: GearType.middle,
          gear: toFixed(gear)
        });
      }
    }

    // 大网
    if (hasBigGrid) {
      const bigGear = toFixedNumber(1 - k * 0.3);
      if (gear === bigGear) {
        k++;
        grids.push({
          type: GearType.big,
          gear: toFixed(gear)
        });
      }
    }
  }

  return grids;
}
