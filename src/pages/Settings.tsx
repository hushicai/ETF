import React from 'react';
import { useDispatch, useAppState } from '../common/store';
import { NumberInput, PercentInput } from '../components/Input';
import { CheckBox } from '../components/Checkbox';
import styled, { css } from 'styled-components';

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

const InputContainer = styled.div`
  display: inline-flex;
  color: rgba(0, 0, 0, 0.87);
  flex: 1;
  input[type='text'] {
    -webkit-appearance: none;
    max-width: 100%;
    text-align: left;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.5em 1em;
    background: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(34, 36, 38, 0.15);
    border-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right-color: transparent;
    transition: box-shadow 0.1s ease 0s, border-color 0.1s ease 0s;
    flex: 1;
  }
  div {
    font-weight: 700;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgba(0, 0, 0, 0.87);
    background: none rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(34, 36, 38, 0.15);
    height: 30px;
    width: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const FlexendInputcontainer = styled(InputContainer)`
  justify-content: flex-end;
  input[type='checkbox'] {
    margin-right: 14px;
  }
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
          <InputContainer>
            <NumberInput
              value={price}
              onChange={(value: number) => {
                dispatch('price', value);
              }}
            />
            <div>元</div>
          </InputContainer>
        </Row>
        <Row last>
          <Label>每份金额</Label>
          <InputContainer>
            <NumberInput
              value={amount}
              onChange={(value: number) => {
                dispatch('amount', value);
              }}
            />
            <div>元</div>
          </InputContainer>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>留利润</Legend>
        <Row last>
          <Label>留存份数</Label>
          <InputContainer>
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value);
              }}
            />
            <div>份</div>
          </InputContainer>
        </Row>
      </Fieldset>
      <Fieldset>
        <Legend>逐格加码</Legend>
        <Row last>
          <Label>加码幅度</Label>
          <InputContainer>
            <PercentInput
              value={increasePercentPerGrid}
              onChange={(value: number) => {
                dispatch('increasePercentPerGrid', value);
              }}
            />
            <div>%</div>
          </InputContainer>
        </Row>
      </Fieldset>
      <Fieldset last>
        <Legend>一网打尽</Legend>
        <Row>
          <Label>中　　网</Label>
          <FlexendInputcontainer>
            <CheckBox
              checked={hasMiddleGrid}
              onChange={(value: boolean) => {
                dispatch('hasMiddleGrid', value);
              }}
            />
          </FlexendInputcontainer>
        </Row>
        <Row last>
          <Label>大　　网</Label>
          <FlexendInputcontainer>
            <CheckBox
              checked={hasBigGrid}
              onChange={(value: boolean) => {
                dispatch('hasBigGrid', value);
              }}
            />
          </FlexendInputcontainer>
        </Row>
      </Fieldset>
    </form>
  );
}
