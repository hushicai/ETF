import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../common/store';
import { PercentInput } from '../components/PercentInput';

type Props = {};

const Row = styled.div`
  display: flex;
`;

export function Settings() {
  const { state } = useContext(AppContext);
  const { amount, percentPerGrid, increasePercentPerGrid } = state;
  return (
    <form>
      <fieldset>
        <legend>基本设置</legend>
        <Row>
          <label>每份金额</label>
          <input type="text" defaultValue={amount} />元
        </Row>
        <Row>
          <label>每格幅度</label>
          <PercentInput value={percentPerGrid} min={1} max={10} />
        </Row>
        <Row>
          <label>网格数</label>
          <input type="text" value="10" />
        </Row>
      </fieldset>
      <fieldset>
        <legend>留利润</legend>
        <Row>
          <label>留存份数</label>
          <input type="text" value="0" />
        </Row>
      </fieldset>
      <fieldset>
        <legend>逐格加码</legend>
        <Row>
          <label>加码幅度</label>
          <PercentInput value={increasePercentPerGrid} min={0} />
        </Row>
      </fieldset>
      <fieldset>
        <legend>一网打尽</legend>
        <Row>
          <label>
            中网
            <input type="checkbox" />
          </label>
        </Row>
        <Row>
          <label>
            大网
            <input type="checkbox" />
          </label>
        </Row>
      </fieldset>
    </form>
  );
}
