import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useAppState } from '../common/store';
import { TextInput, PercentTextInput } from '../components/TextInput';

type Props = {};

const Row = styled.div`
  display: flex;
`;

export function Settings() {
  const state = useAppState();
  const dispatch = useDispatch();
  const {
    amount,
    percentPerGrid,
    increasePercentPerGrid,
    numberOfGrids,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid,
  } = state;
  return (
    <form>
      <fieldset>
        <legend>基本设置</legend>
        <Row>
          <label>每份金额</label>
          <TextInput
            value={amount}
            onChange={(value: number) => {
              dispatch('amount', value);
            }}
          />
          元
        </Row>
        <Row>
          <label>每格幅度</label>
          <PercentTextInput
            value={percentPerGrid}
            onChange={(value: number) => {
              dispatch('percentPerGrid', value);
            }}
          />
        </Row>
        <Row>
          <label>网格数</label>
          <TextInput
            value={numberOfGrids}
            onChange={(value: number) => {
              dispatch('numberOfGrids', value);
            }}
          />
        </Row>
      </fieldset>
      <fieldset>
        <legend>留利润</legend>
        <Row>
          <label>留存份数</label>
          <TextInput
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
          <PercentTextInput
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
          <label>
            中网
            <input type="checkbox" defaultChecked={hasMiddleGrid} />
          </label>
        </Row>
        <Row>
          <label>
            大网
            <input type="checkbox" defaultChecked={hasBigGrid} />
          </label>
        </Row>
      </fieldset>
    </form>
  );
}
