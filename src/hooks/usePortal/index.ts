import { useRef, useEffect } from 'react';

import { v4 } from 'uuid';

const usePortal = (id?: string) => {
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current) {
      const container = document.createElement('div');
      container.setAttribute('id', id || v4());
      document.body.insertBefore(container, document.body.lastElementChild.nextElementSibling);
      containerRef.current = container;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.remove();
      }
    };
  }, []);

  return containerRef.current;
};

export default usePortal;
