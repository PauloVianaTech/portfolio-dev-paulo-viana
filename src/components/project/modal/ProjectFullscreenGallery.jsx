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
  currentCaption,
  setCurrentImage,
  nextImage,
  prevImage,
  onClose,
}) => {
  const swipeHandlers = useSwipeNavigation({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <FullscreenImage
            src={images[currentImage]}
            alt={project.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="
              w-auto
              max-w-[95vw] md:max-w-[78vw]
              max-h-[92vh] md:max-h-[82vh]
              object-contain rounded-2xl
              shadow-[0_0_60px_rgba(0,0,0,0.55)]
            "
            {...swipeHandlers}
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
            onClick={onClose}
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

        <ImageThumbnails
          images={images}
          projectTitle={project.title}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          variant="fullscreen"
        />
      </div>
    </div>
  );
};

export default ProjectFullscreenGallery;
