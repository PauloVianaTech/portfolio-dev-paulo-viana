import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import GalleryArrow from "./GalleryArrow";
import ImageCaption from "./ImageCaption";
import ImageThumbnails from "./ImageThumbnails";
import useSwipeNavigation from "./useSwipeNavigation";

const FullscreenImage = motion.img;

const ProjectFullscreenGallery = ({
  project,
  images,
  currentImage,
  currentMediaSrc,
  currentCaption,
  carouselImages = [],
  currentCarouselSlide,
  setCurrentCarouselSlide,
  setCurrentImage,
  nextImage,
  prevImage,
  onClose,
}) => {
  const [mediaRatio, setMediaRatio] = useState(16 / 9);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const mediaFrameRef = useRef(null);
  const pinchRef = useRef(null);
  const suppressSwipeRef = useRef(false);

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      if (image.naturalWidth && image.naturalHeight) {
        setMediaRatio(image.naturalWidth / image.naturalHeight);
        setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
      }
    };

    image.src = currentMediaSrc;
  }, [currentMediaSrc]);

  const isPortrait = mediaRatio < 1;

  useLayoutEffect(() => {
    const frame = mediaFrameRef.current;
    if (!frame) return undefined;

    const updateFrameSize = () => {
      setFrameSize({ width: frame.clientWidth, height: frame.clientHeight });
    };

    updateFrameSize();
    const observer = new ResizeObserver(updateFrameSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [currentMediaSrc, isPortrait]);

  useEffect(() => {
    setZoom(1);
  }, [currentMediaSrc]);

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  });

  const isNativeSmaller =
    naturalSize.width > 0 &&
    naturalSize.height > 0 &&
    naturalSize.width <= frameSize.width &&
    naturalSize.height <= frameSize.height;

  const getTouchDistance = (touches) => {
    const [firstTouch, secondTouch] = touches;
    return Math.hypot(
      secondTouch.clientX - firstTouch.clientX,
      secondTouch.clientY - firstTouch.clientY
    );
  };

  const handleTouchStart = (event) => {
    if (event.touches.length >= 2) {
      pinchRef.current = {
        distance: getTouchDistance(event.touches),
        zoom,
      };
      suppressSwipeRef.current = true;
      return;
    }

    swipeHandlers.onTouchStart(event);
  };

  const handleTouchMove = (event) => {
    if (!pinchRef.current || event.touches.length < 2) return;

    event.preventDefault();
    const distance = getTouchDistance(event.touches);
    const nextZoom = pinchRef.current.zoom * (distance / pinchRef.current.distance);
    setZoom(Math.min(3, Math.max(1, Number(nextZoom.toFixed(2)))));
  };

  const handleTouchEnd = (event) => {
    if (suppressSwipeRef.current) {
      if (event.touches.length === 0) {
        pinchRef.current = null;
        suppressSwipeRef.current = false;
      }
      return;
    }

    swipeHandlers.onTouchEnd(event);
  };

  const handleWheelZoom = (event) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    event.preventDefault();
    event.stopPropagation();
    const zoomStep = event.deltaY < 0 ? 0.15 : -0.15;
    setZoom((value) => Math.min(3, Math.max(1, Number((value + zoomStep).toFixed(2)))));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex flex-col items-center">
        <div
          ref={mediaFrameRef}
          className={`relative ${
            isPortrait
              ? "aspect-[9/16] h-[58dvh] max-h-[58dvh] md:h-[min(68dvh,1080px)] md:max-h-[1080px]"
              : "aspect-video w-[min(90vw,calc(58dvh*16/9))] md:w-[min(72vw,calc(68dvh*16/9))]"
          } flex touch-none items-center justify-center overflow-hidden rounded-2xl bg-black`}
          onClick={(event) => event.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            pinchRef.current = null;
            suppressSwipeRef.current = false;
            swipeHandlers.onTouchCancel();
          }}
          onWheel={handleWheelZoom}
        >
          <FullscreenImage
            src={currentMediaSrc}
            alt={project.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoom }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`
              h-auto w-auto max-h-full max-w-full
              object-contain rounded-2xl
              shadow-[0_0_60px_rgba(0,0,0,0.55)]
              ${isNativeSmaller ? "border border-slate-400/65" : ""}
            `}
          />

          <button
            className="
              absolute top-3 right-3
              bg-black/45 backdrop-blur-md
              border border-white/10
              text-white
              p-2 md:p-3 rounded-xl
              hover:bg-black/70
              transition-all duration-300
              z-20
            "
            aria-label="Fechar imagem em tela cheia"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          >
            <FaTimes className="text-lg" />
          </button>

          {images.length > 1 && (
            <>
              <GalleryArrow direction="left" onClick={prevImage} variant="fullscreen" />
              <GalleryArrow direction="right" onClick={nextImage} variant="fullscreen" />
            </>
          )}
        </div>

        <ImageCaption
          currentImage={currentImage}
          caption={currentCaption}
          variant="fullscreen"
        />

        <div onClick={(event) => event.stopPropagation()}>
          <ImageThumbnails
            images={images}
            projectTitle={project.title}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            variant="fullscreen"
          />
        </div>

        {carouselImages.length > 0 && (
          <div
            className="mt-2 flex w-[90vw] max-w-[90vw] flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <ImageThumbnails
              images={carouselImages}
              projectTitle={`${project.title} — carrossel`}
              currentImage={currentCarouselSlide ?? 0}
              setCurrentImage={setCurrentCarouselSlide}
              variant="carousel"
              leadingLabel={`${(currentCarouselSlide ?? 0) + 1}/${carouselImages.length}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFullscreenGallery;
