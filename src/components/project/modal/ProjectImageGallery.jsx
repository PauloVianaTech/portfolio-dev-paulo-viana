import { useEffect, useState } from "react";

import GalleryArrow from "./GalleryArrow";
import ImageCaption from "./ImageCaption";
import ImageThumbnails from "./ImageThumbnails";
import useSwipeNavigation from "./useSwipeNavigation";

const ProjectImageGallery = ({
  project,
  images,
  currentImage,
  currentMediaSrc,
  currentCaption,
  setCurrentImage,
  nextImage,
  prevImage,
  onOpenFullscreen,
}) => {
  const [mediaRatio, setMediaRatio] = useState(16 / 9);

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      if (image.naturalWidth && image.naturalHeight) {
        setMediaRatio(image.naturalWidth / image.naturalHeight);
      }
    };

    image.src = currentMediaSrc;
  }, [currentMediaSrc]);

  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  });
  const usesContainedLayout = mediaRatio < 0.8 || mediaRatio > 2.2;

  return (
    <div
      className={`relative w-full md:w-1/2 min-h-[clamp(160px,38dvh,200px)] md:min-h-full overflow-hidden rounded-t-3xl md:rounded-none md:rounded-l-3xl ${
        usesContainedLayout ? "bg-black" : ""
      }`}
      {...swipeHandlers}
    >
      <img
        src={currentMediaSrc}
        alt={project.title}
        onClick={onOpenFullscreen}
        className={`absolute inset-0 z-0 w-full h-full cursor-zoom-in transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          usesContainedLayout
            ? "object-contain border border-slate-400/55 scale-100 hover:scale-[1.01]"
            : "object-cover scale-[1.01] hover:scale-[1.03]"
        }`}
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <ImageCaption currentImage={currentImage} caption={currentCaption} />

      {images.length > 1 && (
        <>
          <GalleryArrow direction="left" onClick={prevImage} />
          <GalleryArrow direction="right" onClick={nextImage} />
        </>
      )}

      <ImageThumbnails
        images={images}
        projectTitle={project.title}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
};

export default ProjectImageGallery;
