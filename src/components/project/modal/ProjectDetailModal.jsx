import { useEffect, useMemo, useState } from "react";
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

  const images = useMemo(() => {
    if (!project) return [];
    return project.images?.length ? project.images : [project.image];
  }, [project]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setCurrentImage(0);
    setFullscreenImage(false);
  }, [project]);

  if (!project || !images.length) return null;

  const currentCaption = project.imageCaptions?.[currentImage];
  const hasProjectNavigation = projects.length > 1 && onProjectChange;
  const currentProjectIndex = projects.findIndex((item) => {
    if (project.id && item.id) return item.id === project.id;
    return item === project;
  });
  const safeProjectIndex = currentProjectIndex >= 0 ? currentProjectIndex : 0;

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4 pt-4 pb-24 md:pb-20"
        onClick={onClose}
      >
        {projectNavigation && (
          <ProjectModalNavigation
            direction="prev"
            onClick={projectNavigation.onPrev}
            className="hidden md:flex left-4 lg:left-8"
          />
        )}

        <ModalCard
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
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
            overflow-visible
            shadow-2xl
            flex flex-col md:flex-row
          "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Fechar detalhes do projeto"
            className="
              absolute top-3 right-3 md:top-0 md:-right-12 z-40
              bg-white/90 hover:bg-white
              border border-slate-300
              text-slate-500 hover:text-red-500
              p-3 rounded-xl
              shadow-lg
              transition-all duration-300
            "
          >
            <FaTimes />
          </button>

          <ProjectImageGallery
            project={project}
            images={images}
            currentImage={currentImage}
            currentCaption={currentCaption}
            setCurrentImage={setCurrentImage}
            nextImage={nextImage}
            prevImage={prevImage}
            onOpenFullscreen={() => setFullscreenImage(true)}
          />

          <ProjectInfoPanel
            project={project}
          />
        </ModalCard>

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
          currentCaption={currentCaption}
          setCurrentImage={setCurrentImage}
          nextImage={nextImage}
          prevImage={prevImage}
          onClose={() => setFullscreenImage(false)}
        />
      )}
    </>
  );
};

export default ProjectDetailModal;
