import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import ProjectFullscreenGallery from "./ProjectFullscreenGallery";
import ProjectImageGallery from "./ProjectImageGallery";
import ProjectBottomNavigation from "./ProjectBottomNavigation";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectModalNavigation from "./ProjectModalNavigation";

const ModalOverlay = motion.div;
const ModalCard = motion.div;

const ProjectDetailModal = ({
  project,
  projects = [],
  onProjectChange,
  onClose,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const fullscreenHistoryEntryRef = useRef(false);
  const copyFeedbackTimerRef = useRef(null);

  const mediaItems = useMemo(() => {
    if (!project) return [];

    // Estrutura atual: cada mídia traz seu próprio tipo e legenda.
    if (project.media?.length) return project.media;

    // Compatibilidade temporária para projetos ainda no formato antigo.
    const legacyImages = project.images?.length ? project.images : [project.image];
    return legacyImages.filter(Boolean).map((src, index) => {
      const legacyCarousel = project.carousels?.[index];

      if (legacyCarousel?.images?.length) {
        return {
          type: "carousel",
          slides: legacyCarousel.images.map((slideSrc, slideIndex) => ({
            type: "image",
            src: slideSrc,
            caption: legacyCarousel.captions?.[slideIndex] || "",
          })),
        };
      }

      return {
        type: "image",
        src,
        caption: project.imageCaptions?.[index] || "",
      };
    });
  }, [project]);

  const images = useMemo(
    () => mediaItems.map((item) => (
      item.type === "carousel" ? item.slides?.[0]?.src : item.src
    )).filter(Boolean),
    [mediaItems]
  );

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const documentElement = document.documentElement;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const previousDocumentStyles = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };

    window.dispatchEvent(new Event('portfolio:lenis-stop'));

    // No mobile, apenas `overflow: hidden` ainda permite que o gesto alcance
    // a página. Fixar o body preserva sua posição enquanto o card recebe o scroll.
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      const previousScrollBehavior = documentElement.style.scrollBehavior;

      // O CSS global mobile usa scroll-behavior: smooth. Desativamos apenas
      // nesta restauração para não exibir a descida do topo até Projects.
      documentElement.style.scrollBehavior = "auto";
      Object.assign(body.style, previousBodyStyles);
      Object.assign(documentElement.style, previousDocumentStyles);
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      documentElement.style.scrollBehavior = previousScrollBehavior;
      window.dispatchEvent(new CustomEvent('portfolio:lenis-scroll-to', {
        detail: { top: scrollY },
      }));
      window.dispatchEvent(new Event('portfolio:lenis-start'));
    };
  }, []);

  useEffect(() => {
    setCurrentImage(0);
    setFullscreenImage(false);
    setCurrentCarouselSlide(null);
    setIsLinkCopied(false);
    fullscreenHistoryEntryRef.current = false;
  }, [project]);

  useEffect(() => () => {
    window.clearTimeout(copyFeedbackTimerRef.current);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (fullscreenImage && !event.state?.fullscreenProjectMedia) {
        fullscreenHistoryEntryRef.current = false;
        setFullscreenImage(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [fullscreenImage]);

  if (!project || !images.length) return null;

  const currentMedia = mediaItems[currentImage];
  const carouselSlides = currentMedia?.type === "carousel" ? currentMedia.slides || [] : [];
  const carouselImages = carouselSlides.map((slide) => slide.src).filter(Boolean);
  const isViewingCarousel = carouselImages.length > 0;
  const activeCarouselSlide = currentCarouselSlide ?? 0;
  const currentMediaSrc = isViewingCarousel
    ? carouselImages[activeCarouselSlide]
    : images[currentImage];
  const currentCaption = isViewingCarousel
    ? carouselSlides[activeCarouselSlide]?.caption
    : currentMedia?.caption;
  const hasProjectNavigation = projects.length > 1 && onProjectChange;
  const currentProjectIndex = projects.findIndex((item) => {
    if (project.id && item.id) return item.id === project.id;
    return item === project;
  });
  const safeProjectIndex = currentProjectIndex >= 0 ? currentProjectIndex : 0;

  const nextImage = () => {
    if (isViewingCarousel && activeCarouselSlide < carouselImages.length - 1) {
      setCurrentCarouselSlide((slide) => slide + 1);
      return;
    }

    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setCurrentCarouselSlide(null);
  };

  const prevImage = () => {
    if (isViewingCarousel && activeCarouselSlide > 0) {
      setCurrentCarouselSlide((slide) => slide - 1);
      return;
    }

    const previousImage = currentImage === 0 ? images.length - 1 : currentImage - 1;
    const previousCarouselImages = mediaItems[previousImage]?.type === "carousel"
      ? mediaItems[previousImage].slides || []
      : [];
    setCurrentImage(previousImage);
    setCurrentCarouselSlide(previousCarouselImages.length ? previousCarouselImages.length - 1 : null);
  };

  const selectMainImage = (imageIndex) => {
    setCurrentImage(imageIndex);
    setCurrentCarouselSlide(mediaItems[imageIndex]?.type === "carousel" ? 0 : null);
  };

  const openFullscreen = () => {
    window.history.pushState(
      { ...window.history.state, modal: true, fullscreenProjectMedia: true },
      ""
    );
    window.dispatchEvent(new Event("portfolio:fullscreen-open"));
    fullscreenHistoryEntryRef.current = true;
    setFullscreenImage(true);
  };

  const closeFullscreen = () => {
    if (fullscreenHistoryEntryRef.current) {
      fullscreenHistoryEntryRef.current = false;
      window.history.back();
      return;
    }

    setFullscreenImage(false);
  };

  const nextProject = () => {
    if (!hasProjectNavigation) return;
    const nextIndex =
      safeProjectIndex === projects.length - 1 ? 0 : safeProjectIndex + 1;
    onProjectChange(projects[nextIndex]);
  };

  const prevProject = () => {
    if (!hasProjectNavigation) return;
    const prevIndex =
      safeProjectIndex === 0 ? projects.length - 1 : safeProjectIndex - 1;
    onProjectChange(projects[prevIndex]);
  };

  const selectProject = (index) => {
    if (!hasProjectNavigation || index === safeProjectIndex) return;
    onProjectChange(projects[index]);
  };

  const copyProjectLink = async () => {
    const projectUrl = new URL(`/projetos/${project.id}`, window.location.origin).href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(projectUrl);
      } else {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = projectUrl;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        document.execCommand("copy");
        temporaryInput.remove();
      }

      setIsLinkCopied(true);
      window.clearTimeout(copyFeedbackTimerRef.current);
      copyFeedbackTimerRef.current = window.setTimeout(() => {
        setIsLinkCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Não foi possível copiar o link do projeto.", error);
    }
  };

  const projectNavigation = hasProjectNavigation
    ? {
        current: safeProjectIndex + 1,
        total: projects.length,
        projectIndexes: projects.map((item, index) => ({
          id: item.id || `${item.title}-${index}`,
          label: index + 1,
        })),
        onNext: nextProject,
        onPrev: prevProject,
        onSelect: selectProject,
      }
    : null;

  return (
    <>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-contain bg-black/80 px-4 pb-24 pt-4 backdrop-blur-md md:pb-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {projectNavigation && (
          <ProjectModalNavigation
            direction="prev"
            onClick={projectNavigation.onPrev}
            className="hidden md:flex left-4 lg:left-8"
          />
        )}

        <div className="relative">
          <ModalCard
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0, y: 38 }}
          transition={{ duration: 0.28 }}
          className="
            relative
            w-[90vw]
            md:w-[80vw]
            max-w-[940px]
            max-h-[86dvh]
            md:max-h-[78vh]
            dark:bg-slate-900
            bg-white
            rounded-[28px]
            overflow-y-auto
            overscroll-contain
            touch-pan-y
            [-webkit-overflow-scrolling:touch]
            shadow-2xl
            flex flex-col md:flex-row
            md:overflow-hidden
          "
          onClick={(e) => e.stopPropagation()}
        >
            <button
              type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Fechar detalhes do projeto"
            className="
              absolute top-3 right-3 z-40 md:hidden
              bg-black/45 backdrop-blur-md
              border border-white/10
              text-white
              p-2 md:p-3 rounded-xl
              hover:bg-black/70
              transition-all duration-300
            "
          >
            <FaTimes className="text-lg" />
          </button>

          <ProjectImageGallery
            project={project}
            images={images}
            currentImage={currentImage}
            currentMediaSrc={currentMediaSrc}
            currentCaption={currentCaption}
            setCurrentImage={selectMainImage}
            nextImage={nextImage}
            prevImage={prevImage}
            onOpenFullscreen={openFullscreen}
          />

          <ProjectInfoPanel
            project={project}
            isLinkCopied={isLinkCopied}
            onShare={copyProjectLink}
          />
          </ModalCard>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes do projeto"
            className="
              absolute top-3.5 -right-3 z-40 hidden translate-x-full
              items-center justify-center
              rounded-xl border border-white/25 bg-slate-700/75 p-3 text-white
              shadow-lg shadow-black/25 backdrop-blur-md
              transition-colors duration-300 group md:flex
            "
          >
            <FaTimes className="text-lg transition-colors duration-300 group-hover:text-red-400" />
          </button>
        </div>

        {projectNavigation && (
          <ProjectModalNavigation
            direction="next"
            onClick={projectNavigation.onNext}
            className="hidden md:flex right-4 lg:right-8"
          />
        )}

        {projectNavigation && (
          <ProjectBottomNavigation
            current={projectNavigation.current}
            total={projectNavigation.total}
            projectIndexes={projectNavigation.projectIndexes}
            onPrev={projectNavigation.onPrev}
            onNext={projectNavigation.onNext}
            onSelect={projectNavigation.onSelect}
          />
        )}
      </ModalOverlay>

      {fullscreenImage && (
        <ProjectFullscreenGallery
          project={project}
          images={images}
          currentImage={currentImage}
          currentMediaSrc={currentMediaSrc}
          currentCaption={currentCaption}
          carouselImages={carouselImages}
          currentCarouselSlide={currentCarouselSlide}
          setCurrentCarouselSlide={setCurrentCarouselSlide}
          setCurrentImage={selectMainImage}
          nextImage={nextImage}
          prevImage={prevImage}
          onClose={closeFullscreen}
        />
      )}
    </>
  );
};

export default ProjectDetailModal;
