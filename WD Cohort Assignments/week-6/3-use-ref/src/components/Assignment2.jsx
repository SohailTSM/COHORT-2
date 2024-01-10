import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [, forceRender] = useState(0);

  const renderCountElement = useRef();
  if (renderCountElement.current) {
    renderCountElement.current.count = renderCountElement.current.count
      ? renderCountElement.current.count + 1
      : 1;
  }
  const handleReRender = () => {
    // Update state to force re-render
    forceRender(Math.random());
  };

  return (
    <div>
      <p ref={renderCountElement}>
        This component has rendered{' '}
        {renderCountElement.current?.count
          ? renderCountElement.current?.count
          : 0}{' '}
        times.
      </p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
