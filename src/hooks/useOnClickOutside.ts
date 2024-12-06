import { useEffect, RefObject } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void) => {
  useEffect(() => {
    const onMousedown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // 클릭한 요소가 ref.current 안에 없다면 onClickOutside 실행
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', onMousedown);
    return () => {
      document.removeEventListener('mousedown', onMousedown);
    };
  }, [ref, onClickOutside]);
};

export default useOnClickOutside;
