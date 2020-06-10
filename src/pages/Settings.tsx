import React from 'react';
import { useDispatch, useAppState } from '../common/store';
import { NumberInput, PercentInput, TextInput } from '../components/Input';
import { CheckBox } from '../components/Checkbox';
import { Row } from '../components/Row';

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
      <fieldset>
        <legend>基本设置</legend>
        <Row>
          <label>价格</label>
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
          <label>每份金额</label>
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
      </fieldset>
      <fieldset>
        <legend>留利润</legend>
        <Row>
          <label>留存份数</label>
          <NumberInput
            value={numberOfRetainedProfits}
            onChange={(value: number) => {
              dispatch('numberOfRetainedProfits', value);
            }}
          />
        </Row>
      </fieldset>
      <fieldset>
        <legend>逐格加码</legend>
        <Row>
          <label>加码幅度</label>
          <PercentInput
            value={increasePercentPerGrid}
            onChange={(value: number) => {
              dispatch('increasePercentPerGrid', value);
            }}
          />
        </Row>
      </fieldset>
      <fieldset>
        <legend>一网打尽</legend>
        <Row>
          <label>中网</label>
          <CheckBox
            checked={hasMiddleGrid}
            onChange={(value: boolean) => {
              dispatch('hasMiddleGrid', value);
            }}
          />
        </Row>
        <Row>
          <label>大网</label>
          <CheckBox
            checked={hasBigGrid}
            onChange={(value: boolean) => {
              dispatch('hasBigGrid', value);
            }}
          />
        </Row>
      </fieldset>
    </form>
  );
}
