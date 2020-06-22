import fetchJsonp from 'fetch-jsonp';

export type FundDataItem = {
  NAME: string;
  CODE: string;
  CATEGORY: number;
  FundBaseInfo: {
    DWJZ: number;
  };
};

export const suggestFunds = (key: string): Promise<FundDataItem[]> => {
  if (!key) {
    return Promise.resolve([]);
  }
  return fetchJsonp(
    `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&Key=${key}&_=${Date.now()}`,
    {
      jsonpCallbackFunction: `jQuery_${Date.now()}`
    }
  )
    .then((res) => res.json())
    .then((json) => {
      const data: Array<FundDataItem> = json.Datas || [];
      return data.filter((item) => item.CATEGORY === 700);
    })
    .catch((e) => {
      console.error('[suggestFunds]', e);
      return [];
    });
};
