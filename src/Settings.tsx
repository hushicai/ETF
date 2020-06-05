import React from 'react';
import styled from 'styled-components';

type Props = {};

const Row = styled.div`
  display: flex;
`;

export function Settings() {
  return (
    <form>
      <fieldset>
        <legend>基本设置</legend>
        <Row>
          <label>每份金额</label>
          <input type="text" value="1000" />元
        </Row>
        <Row>
          <label>每格幅度</label>
          <input type="text" value="5" />%
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
          <input type="text" value="0" />%
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
