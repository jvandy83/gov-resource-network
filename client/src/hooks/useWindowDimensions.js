import React, { useState, useEffect } from 'react';

export function useWindowDimensions(elemClass) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  function getWindowDimensions() {
    const { innerHeight: height, innerWidth: width } = window;
    return {
      width,
      height
    };
  }

  useEffect(() => {
    const modal = document.querySelector(elemClass);
    const space = window.innerHeight - (modal.offsetHeight + modal.offsetTop);

    function handleResize() {
      setWindowDimensions(getWindowDimensions);
    }

    setWindowDimensions((prev) => ({
      ...prev,
      space
    }));

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowDimensions.height, windowDimensions.width, windowDimensions.space]);
  return windowDimensions;
}
