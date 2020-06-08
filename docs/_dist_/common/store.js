import { createContext } from '/web_modules/react.js';
export const initialState = {
  // 每份金额
  amount: 1000,
  // 每格幅度
  percentPerGrid: 0.05,
  // 网格数
  numberOfGrids: 10,
  // 留存利润
  numberOfRetainedProfits: 0,
  // 逐格加码
  increasePercentPerGrid: 0.0,
  // 中网
  hasMiddleGrid: false,
  // 大网
  hasBigGrid: false
};
export function reducer(state, action) {
  return state;
}
export const AppContext = createContext({});