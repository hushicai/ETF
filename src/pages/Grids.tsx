import React from 'react';
import { useGrids, GearType } from '../hooks/useGrids';
import styled from 'styled-components';

const SmallGrid = styled.tr`
  background-color: #ffffff;
`;

const MiddleGrid = styled.tr`
  background-color: #3da4ab;
`;

const BigGrid = styled.tr`
  background-color: #fe8a71;
`;

export function Grids() {
  const grids = useGrids();
  return (
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>种类</th>
          <th>档位</th>
          <th>买入价格</th>
          <th>卖出价格</th>
          <th>买入金额</th>
          <th>买入数量</th>
          <th>卖出金额</th>
          <th>卖出数量</th>
          <th>本期留存数量</th>
          <th>本期留存利润</th>
          <th>盈利金额</th>
          <th>盈利比例</th>
        </tr>
      </thead>
      <tbody>
        {grids.map((grid, index) => {
          const GridComponent =
            grid.type === GearType.small
              ? SmallGrid
              : grid.type === GearType.middle
              ? MiddleGrid
              : BigGrid;
          return (
            <GridComponent key={index}>
              <td>{index + 1}</td>
              <td>{grid.type}</td>
              <td>{grid.gear}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </GridComponent>
          );
        })}
      </tbody>
    </table>
  );
}
