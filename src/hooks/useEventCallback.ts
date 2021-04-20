import { useRef, useCallback, useLayoutEffect, useEffect } from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Reference from Material UI
// URL: https://h2k.co/ku
// 해당 hooks의 자세한 내용은 노션을 참고해주세요.
// URL: https://h2k.co/K8
function useEventCallback<A extends any[], R = void>(
  callback: (...args: A) => R
) {
  const ref = useRef(callback);
  useEnhancedEffect(() => {
    ref.current = callback;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}

export default useEventCallback;
