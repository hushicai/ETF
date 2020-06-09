import React, { useState } from 'react';
import { TextInput } from '../components/Input';
import { useCallback } from 'react';
import { Row } from '../components/Row';
import fetchJsonp from 'fetch-jsonp';

export type FundDataItem = {
  NAME: string;
  CODE: string;
  CATEGORY: number;
};

export const suggestFunds = (key: string): Promise<FundDataItem[]> => {
  return fetchJsonp(
    `http://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&Key=${key}&_=${Date.now()}`,
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

function List({ data }: { data?: FundDataItem[] }) {
  return null;
}

export function Fund() {
  const [data, setData] = useState<FundDataItem[]>();
  const callback = useCallback(async (value: string) => {
    if (!value) {
      return;
    }
    const data = await suggestFunds(value);
    setData(data);
  }, []);

  return (
    <>
      <Row>
        <label>代码：</label>
        <TextInput value="" onChange={callback} />
      </Row>
      <List data={data} />
    </>
  );
}
