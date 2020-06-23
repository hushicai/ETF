import { useState, useEffect, ReactPortal, useMemo } from 'react';
import useUpdateEffect from './useUpdateEffect';
import { createPortal } from 'react-dom';

let Prefix = 'portal';
let count = 0;

export default function usePortal(node: React.ReactNode) {
  const [visible, togglePortal] = useState(false);
  const id = useMemo(() => {
    return `${Prefix}-${++count}`;
  }, []);
  const [portal, setPortal] = useState<ReactPortal | null>(null);

  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.id = id;
    modalRoot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      visibility: hidden;
    `;
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, [id]);

  useUpdateEffect(() => {
    const modalRoot = document.getElementById(id) as HTMLDivElement;
    modalRoot.style.visibility = visible ? 'visible' : 'hidden';
    setPortal(visible ? createPortal(node, modalRoot) : null);
  }, [visible, id]);

  return {
    togglePortal,
    portal
  };
}
