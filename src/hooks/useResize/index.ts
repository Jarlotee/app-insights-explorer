import { useState, useEffect, MutableRefObject } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

type GridOffset = {
  width: number;
  height: number;
};

const calculateGridDelta = (start: MousePosition, current: MousePosition): GridOffset => {
  const deltaX = current.x - start.x - 15;
  const deltaY = current.y - start.y - 15;
  const delta = {
    width: Math.ceil(deltaX / 60),
    height: Math.ceil(deltaY / 60),
  };

  return delta;
};

const useResize = (
  ref: MutableRefObject<any>,
  onDragEnd: (offset: GridOffset) => void
) => {
  const [startPosition, setStartPosition] = useState<MousePosition>();
  const [positionDelta, setPositionDelta] = useState<GridOffset>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      setStartPosition({ x: event.x, y: event.y });
      setIsDragging(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setPositionDelta(calculateGridDelta(startPosition, { x: event.x, y: event.y }));
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd(calculateGridDelta(startPosition, { x: event.x, y: event.y }));
        setPositionDelta({ width: 0, height: 0 });
        setStartPosition({ x: 0, y: 0 });
      }
    };

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [ref, isDragging, startPosition]);

  return positionDelta;
};

export default useResize;
