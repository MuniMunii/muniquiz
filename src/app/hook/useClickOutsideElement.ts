import { useEffect, useRef, RefObject } from 'react';
// how to use
/* const MyComponent = () => {
  const handleClickOutside = () => {
//   we can add boolean state in this function
    console.log('Clicked outside!');
  };
//   this ref for referencing element that this hook gonna be use
  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);
}
*/
const useClickOutside = <T extends HTMLElement>(
  callback: () => void
): RefObject<T|null> => {
  const ref = useRef<T|null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);
  return ref;
};

export default useClickOutside;
