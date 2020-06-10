import React from 'react';
import { useDispatch, useAppState } from '../common/store';
import { NumberInput, PercentInput, TextInput } from '../components/Input';
import { CheckBox } from '../components/Checkbox';
import { Row } from '../components/Row';
import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin-bottom: 1.5em;
`;
const Legend = styled.legend`
  display: block;
  width: 100%;
  padding: 0.3em 0;
  margin-bottom: 0.3em;
  border-bottom: 1px solid #333;
`;
const Label = styled.label`
  width: 4em;
  margin-right: 1em;
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
        <Row>
          <Label>价　　格</Label>
          <div>
            <NumberInput
              value={price}
              onChange={(value: number) => {
                dispatch('price', value);
              }}
            />
            元
          </div>
        </Row>
        <Row>
          <Label>每份金额</Label>
          <div>
            <NumberInput
              value={amount}
              onChange={(value: number) => {
                dispatch('amount', value);
              }}
            />
            元
          </div>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>留利润</Legend>
        <Row>
          <Label>留存份数</Label>
          <div>
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value);
              }}
            />
            份
          </div>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>逐格加码</Legend>
        <Row>
          <Label>加码幅度</Label>
          <PercentInput
            value={increasePercentPerGrid}
            onChange={(value: number) => {
              dispatch('increasePercentPerGrid', value);
            }}
          />
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>一网打尽</Legend>
        <Row>
          <Label>中　　网</Label>
          <CheckBox
            checked={hasMiddleGrid}
            onChange={(value: boolean) => {
              dispatch('hasMiddleGrid', value);
            }}
          />
        </Row>
        <Row>
          <Label>大　　网</Label>
          <CheckBox
            checked={hasBigGrid}
            onChange={(value: boolean) => {
              dispatch('hasBigGrid', value);
            }}
          />
        </Row>
      </Fieldset>
    </form>
  );
}
