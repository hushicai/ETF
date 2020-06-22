import XLSX from 'xlsx';
import React, { useCallback } from 'react';

import styled from 'styled-components';

const Button = styled.button`
  -webkit-appearance: none;
  border: 0;
  color: #06c;
  background: none;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

export default function Download() {
  const callback = useCallback(() => {
    const input = document.getElementById('fund-input');
    const table = document.getElementById('table-list');
    const wb = XLSX.utils.table_to_book(table, { raw: true });
    const name = (input as HTMLInputElement).value.trim() || `${Date.now()}`;
    XLSX.writeFile(wb, `${name}.xlsx`);
  }, []);

  return <Button onClick={callback}>下载表格</Button>;
}
