import { useRef } from "react";

const SWIPE_THRESHOLD = 65;

const useSwipeNavigation = ({ onSwipeLeft, onSwipeRight }) => {
  const touchStartRef = useRef(null);

  return {
    onTouchStart: (event) => {
      touchStartRef.current = event.touches[0]?.clientX ?? null;
    },
    onTouchEnd: (event) => {
      const touchEnd = event.changedTouches[0]?.clientX;
      const touchStart = touchStartRef.current;
      touchStartRef.current = null;

      if (touchStart === null || touchEnd === undefined) return;

      const distance = touchStart - touchEnd;

      if (distance > SWIPE_THRESHOLD) {
        onSwipeLeft();
      }

      if (distance < -SWIPE_THRESHOLD) {
        onSwipeRight();
      }
    },
    onTouchCancel: () => {
      touchStartRef.current = null;
    },
  };
};

export default useSwipeNavigation;
