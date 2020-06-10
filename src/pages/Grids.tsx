import React from 'react';
import { useGrids, GearType, toFixedString } from '../hooks/useGrids';
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
  const totalBuyAmount = grids.reduce((sum, grid) => {
    return sum + grid.buyAmount;
  }, 0);

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
          <th>盈利金额</th>
          <th>盈利比例</th>
          <th>留存利润</th>
          <th>留存数量</th>
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
              <td>{toFixedString(grid.gear)}</td>
              <td>{toFixedString(grid.buyPrice)}</td>
              <td>{toFixedString(grid.sellPrice)}</td>
              <td>{grid.buyAmount}</td>
              <td>{toFixedString(grid.buyCount, 0)}</td>
              <td>{toFixedString(grid.sellAmount, 0)}</td>
              <td>{toFixedString(grid.sellCount, 0)}</td>
              <td>{toFixedString(grid.profits, 0)}</td>
              <td>{grid.returnRate}</td>
              <td>{toFixedString(grid.retainedProfits, 0)}</td>
              <td>{toFixedString(grid.retainedCount, 0)}</td>
            </GridComponent>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>总计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{totalBuyAmount}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
