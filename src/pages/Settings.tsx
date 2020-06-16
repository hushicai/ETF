import React, { useState, useCallback } from 'react';
import { useDispatch, useAppState } from '../common/store';
import { NumberInput, PercentInput, TextInput } from '../components/Input';
import { CheckBox } from '../components/Checkbox';
import styled from 'styled-components';
import { FundDataItem, suggestFunds } from '../common/service';
import noop from 'lodash/noop';
import {
  UnitInputContainer,
  InputContainer,
  FlexendInputContainer
} from '../components/InputContainer';
import { Suggestion } from '../components/Suggestion';

const Fieldset = styled.fieldset<{ last?: boolean }>`
  border: 0;
  padding: 0;
  margin-bottom: ${(props) => (props.last ? '3em' : '1.5em')};
`;
const Legend = styled.legend`
  display: block;
  width: 100%;
  padding: 0.3em 0;
  margin-bottom: 0.3em;
  border-bottom: 1px solid #333;
  font-size: 1.5em;
`;
const Row = styled.div<{ last?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.last ? 0 : '10px')};
  font-size: 1em;
`;
const Label = styled.label`
  width: 4em;
  margin-right: 1em;
  display: inline-flex;
  white-space: nowrap;
`;

export function Settings() {
  const state = useAppState();
  const dispatch = useDispatch();
  const {
    price,
    amount,
    increasePercentPerGrid,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid
  } = state;
  return (
    <form>
      <Fieldset>
        <Legend>基本设置</Legend>
        <Fund />
        <Row>
          <Label>价　　格</Label>
          <UnitInputContainer>
            <NumberInput
              value={price}
              onChange={(value: number) => {
                if (value) {
                  dispatch('price', value);
                }
              }}
            />
            <div>元</div>
          </UnitInputContainer>
        </Row>
        <Row last>
          <Label>每份金额</Label>
          <UnitInputContainer>
            <NumberInput
              value={amount}
              onChange={(value: number) => {
                if (value) {
                  dispatch('amount', value);
                }
              }}
            />
            <div>元</div>
          </UnitInputContainer>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>留利润</Legend>
        <Row last>
          <Label>留存份数</Label>
          <UnitInputContainer>
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value);
              }}
            />
            <div>份</div>
          </UnitInputContainer>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>逐格加码</Legend>
        <Row last>
          <Label>加码幅度</Label>
          <UnitInputContainer>
            <PercentInput
              value={increasePercentPerGrid}
              onChange={(value: number) => {
                dispatch('increasePercentPerGrid', value);
              }}
            />
            <div>%</div>
          </UnitInputContainer>
        </Row>
      </Fieldset>
      <Fieldset last>
        <Legend>一网打尽</Legend>
        <Row>
          <Label>中　　网</Label>
          <FlexendInputContainer>
            <CheckBox
              checked={hasMiddleGrid}
              onChange={(value: boolean) => {
                dispatch('hasMiddleGrid', value);
              }}
            />
          </FlexendInputContainer>
        </Row>
        <Row last>
          <Label>大　　网</Label>
          <FlexendInputContainer>
            <CheckBox
              checked={hasBigGrid}
              onChange={(value: boolean) => {
                dispatch('hasBigGrid', value);
              }}
            />
          </FlexendInputContainer>
        </Row>
      </Fieldset>
    </form>
  );
}

function Fund() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [data, setData] = useState<FundDataItem[]>([]);
  const callback = useCallback(async (value: string) => {
    if (!value) {
      return setData([]);
    }
    // TODO: race condition
    const data = await suggestFunds(value);
    setData(data);
  }, []);

  const onSelectCallback = useCallback(
    (item: FundDataItem) => {
      const { FundBaseInfo } = item;
      // 单位净值
      const { DWJZ } = FundBaseInfo || {};

      if (DWJZ) {
        dispatch('price', DWJZ);
      }

      setName(item.NAME);
      setData([]);
    },
    [dispatch]
  );

  return (
    <>
      <Row>
        <Label>基　　金</Label>
        <Suggestion
          inputProps={{ placeholder: '请输入基金代码、拼音或者简称' }}
          data={data}
          onSuggest={callback}
          onSelect={onSelectCallback}
        />
      </Row>
      {name && (
        <Row>
          <Label>基金名称</Label>
          <InputContainer>
            <TextInput value={name} readOnly onChange={noop} />
          </InputContainer>
        </Row>
      )}
    </>
  );
}
