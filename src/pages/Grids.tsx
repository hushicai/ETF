import React, { lazy, Suspense } from 'react';
import { useGrids, GearType, toFixedString } from '../hooks/useGrids';
import styled from 'styled-components';

const LazyDownload = lazy(() => import('./Download'));

const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

const Title = styled.p`
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #333;
  border-width: 1px 0 1px 0;
`;

const SmallGrid = styled.tr`
  background-color: #ffffff;
`;

const MiddleGrid = styled.tr`
  background-color: #3da4ab;
`;

const BigGrid = styled.tr`
  background-color: #fe8a71;
`;

const THeadCell = styled.th`
  border-bottom: 1px solid #333;
  padding: 0.5em 0;
`;

const TBodyCell = styled.td`
  border-bottom: 1px dashed #333;
  padding: 0.5em 1em;
  text-align: center;
`;

const TFootCell = styled.td`
  padding: 0.5em 0;
  text-align: center;
`;

const Tip = styled.div`
  /* line-height: 20px; */
  padding: 1em 0;
  font-size: 12px;
  p {
    margin-bottom: 6px;
  }
  ol {
    line-height: 26px;
  }
`;

export function Grids() {
  const grids = useGrids();
  const total = grids.reduce(
    (prev, grid) => {
      return {
        buyAmount: prev.buyAmount + grid.buyAmount,
        profits: prev.profits + grid.profits
      };
    },
    { buyAmount: 0, profits: 0 }
  );

  return (
    <Container>
      <Title>
        <span>操作示意表</span>
        <Suspense fallback={null}>
          <LazyDownload />
        </Suspense>
      </Title>
      <Table id="table-list">
        <thead>
          <tr>
            <THeadCell>序号</THeadCell>
            <THeadCell>种类</THeadCell>
            <THeadCell>档位</THeadCell>
            <THeadCell>买入价格</THeadCell>
            <THeadCell>卖出价格</THeadCell>
            <THeadCell>买入金额</THeadCell>
            <THeadCell>买入数量</THeadCell>
            <THeadCell>卖出金额</THeadCell>
            <THeadCell>卖出数量</THeadCell>
            <THeadCell>盈利金额</THeadCell>
            <THeadCell>盈利比例</THeadCell>
            <THeadCell>留存利润</THeadCell>
            <THeadCell>留存数量</THeadCell>
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
                <TBodyCell>{index + 1}</TBodyCell>
                <TBodyCell>{grid.type}</TBodyCell>
                <TBodyCell>{toFixedString(grid.gear)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.buyPrice)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.sellPrice)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.buyAmount, 0)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.buyCount, 0)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.sellAmount, 0)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.sellCount, 0)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.profits, 0)}</TBodyCell>
                <TBodyCell>{grid.returnRate}</TBodyCell>
                <TBodyCell>{toFixedString(grid.retainedProfits, 0)}</TBodyCell>
                <TBodyCell>{toFixedString(grid.retainedCount, 0)}</TBodyCell>
              </GridComponent>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TFootCell>总计</TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell>{toFixedString(total.buyAmount, 0)}</TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell>{toFixedString(total.profits, 0)}</TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
            <TFootCell></TFootCell>
          </tr>
        </tfoot>
      </Table>
      <Tip>
        <p>说明：</p>
        <ol>
          <li>1. 本表格统一设定最大跌幅为60%。</li>
          <li>
            2. 场内基金必须按100份整数委托，因此买入金额按实际委托份数进行修正。
          </li>
        </ol>
      </Tip>
    </Container>
  );
}
