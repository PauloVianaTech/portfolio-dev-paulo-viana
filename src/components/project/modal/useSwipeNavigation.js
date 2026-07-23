import { useState } from "react";

const SWIPE_THRESHOLD = 65;

const useSwipeNavigation = ({ onSwipeLeft, onSwipeRight }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  return {
    onTouchStart: (event) => {
      setTouchStart(event.targetTouches[0].clientX);
    },
    onTouchMove: (event) => {
      setTouchEnd(event.targetTouches[0].clientX);
    },
    onTouchEnd: () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;

      if (distance > SWIPE_THRESHOLD) {
        onSwipeLeft();
      }

      if (distance < -SWIPE_THRESHOLD) {
        onSwipeRight();
      }

      setTouchStart(null);
      setTouchEnd(null);
    },
  };
};

export default useSwipeNavigation;
