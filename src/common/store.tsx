import { createContext } from 'react';

type State = {
  // 每份金额
  amount: number;
  // 每格幅度
  percentPerGrid: number;
  // 网格数
  numberOfGrids: number;
  // 留存利润
  numberOfRetainedProfits: number;
  // 逐格加码
  increasePercentPerGrid: number;
  hasMiddleGrid: boolean;
  hasBigGrid: boolean;
};

type Action = { type: 'test' };

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
  hasBigGrid: false,
};

export function reducer(state: State, action: Action): State {
  return state;
}

type IAppContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
export const AppContext = createContext<IAppContext>({} as IAppContext);
