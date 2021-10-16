import { useCallback, useRef, useState } from 'react';

type RT<T> = [
  T | undefined,
  (v: T) => void,
  {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: any) => void;
  },
];

export default function useStateWithHistory<T>({ capacity = 10 } = {}): RT<T> {
  const [value, setValue] = useState<T>();
  const historyRef = useRef<T[]>([]);
  const pointerRef = useRef(0);

  const set = useCallback(
    (v) => {
      const resolvedValue = typeof v === 'function' ? v(value) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value],
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current -= 1;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current += 1;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ];
}
