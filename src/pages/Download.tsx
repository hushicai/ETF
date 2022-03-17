// import XLSX from 'xlsx';
import React, { useCallback } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import styled from 'styled-components';
import usePortal from '../hooks/usePortal';

const Button = styled.button`
  -webkit-appearance: none;
  border: 0;
  color: #06c;
  background: none;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

const Spinner = styled.div`
  &,
  &:before,
  &:after {
    background: rgb(54, 215, 183);
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  & {
    color: rgb(54, 215, 183);
    text-indent: -9999em;
    position: relative;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10001;
  }
  &:before,
  &:after {
    position: absolute;
    top: 0;
    content: '';
  }
  &:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 1.5em;
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`;

function Loading() {
  return (
    <>
      <Background />
      <Spinner>loading</Spinner>
    </>
  );
}

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default function Download() {
  const { portal, togglePortal } = usePortal(<Loading />);
  const callback = useCallback(async () => {
    const input = document.getElementById('fund-input');
    const table = document.getElementById('table-list');
    const name = (input as HTMLInputElement).value.trim() || `${Date.now()}`;
    try {
      togglePortal(true);
      const [dataUrl] = await Promise.all([
        toPng(table as HTMLTableElement),
        delay(2000)
      ]);
      download(dataUrl, `${name}.png`);
      await delay(1000);
      togglePortal(false);
    } catch (e) {
      togglePortal(false);
      console.error(e);
    }
  }, [togglePortal]);

  return (
    <>
      <Button onClick={callback}>下载表格</Button>
      {portal}
    </>
  );
}
