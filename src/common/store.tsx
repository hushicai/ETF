import { createContext, useContext } from 'react';

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

type Keys = keyof typeof initialState;
type Payload = {
  value: typeof initialState[Keys];
};

type Action = {
  type: 'changeSetting';
  key: Keys;
  payload: Payload;
};

export function reducer(state: State, action: Action): State {
  console.log('%cPrevious State:', 'color: #9E9E9E; font-weight: 700;', state);
  console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
  const { type } = action;
  switch (type) {
    case 'changeSetting':
      const { key, payload } = action;
      state = {
        ...state,
        [key]: payload.value,
      };
      break;
    default:
      break;
  }
  console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', state);
  return state;
}

type IAppContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const AppContext = createContext<IAppContext>({} as IAppContext);

export function useDispatch() {
  const { dispatch } = useContext(AppContext);

  return (key: Keys, value: Payload['value']) => {
    dispatch({
      type: 'changeSetting',
      key,
      payload: {
        value,
      },
    });
  };
}

export function useAppState() {
  const { state } = useContext(AppContext);
  return state;
}
