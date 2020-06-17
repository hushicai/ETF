import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

const useUpdateEffect: typeof useEffect = (
  effect: EffectCallback,
  deps: DependencyList = []
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
