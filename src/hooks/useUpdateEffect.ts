import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

const useUpdateEffect: typeof useEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
