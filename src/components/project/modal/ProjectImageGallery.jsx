import GalleryArrow from "./GalleryArrow";
import ImageCaption from "./ImageCaption";
import ImageThumbnails from "./ImageThumbnails";
import useSwipeNavigation from "./useSwipeNavigation";

const ProjectImageGallery = ({
  project,
  images,
  currentImage,
  currentCaption,
  setCurrentImage,
  nextImage,
  prevImage,
  onOpenFullscreen,
}) => {
  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  });

  return (
    <div
      className="relative w-full md:w-1/2 min-h-[clamp(160px,38dvh,200px)] md:min-h-full overflow-hidden rounded-t-3xl md:rounded-none md:rounded-l-3xl"
      {...swipeHandlers}
    >
      <img
        src={images[currentImage]}
        alt={project.title}
        onClick={onOpenFullscreen}
        className="absolute inset-0 z-0 w-full h-full object-cover cursor-zoom-in transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.01] hover:scale-[1.03]"
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
