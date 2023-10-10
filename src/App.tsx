import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';
import { showGlobe } from './components/globe';

import './App.css';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null) as MutableRefObject<number | null>;
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    if (canvasRef.current) {
      const globe = showGlobe(canvasRef.current, r);
      return () => globe.destroy();
    }
  }, [r]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const onPointerOut = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({
        r: delta / 400,
      });
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({
        r: delta / 200,
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerOut}
      onPointerOut={onPointerOut}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    />
  );
};

export default App;
