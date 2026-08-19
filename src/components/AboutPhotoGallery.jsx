import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Temporário: substituir estas capas pelas fotos pessoais quando estiverem disponíveis.
const temporaryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Imagem temporária do projeto Drip Store',
  },
  {
    src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Imagem temporária do projeto Backend GT3',
  },
];

const AboutPhotoGallery = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const touchStartX = useRef(null);
  const photo = temporaryPhotos[activePhoto];
  const selectPreviousPhoto = () => {
    setActivePhoto((current) => (current === 0 ? temporaryPhotos.length - 1 : current - 1));
  };
  const selectNextPhoto = () => {
    setActivePhoto((current) => (current === temporaryPhotos.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    const autoSlide = window.setInterval(() => {
      setActivePhoto((current) => (current === temporaryPhotos.length - 1 ? 0 : current + 1));
    }, 4500);

    return () => window.clearInterval(autoSlide);
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 42) return;
    if (distance > 0) selectPreviousPhoto();
    else selectNextPhoto();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
      className="order-first mb-8 w-full max-w-[17rem] px-2 md:order-none md:mb-0 md:mt-0 md:w-[32%] md:max-w-[21rem] md:px-0"
    >
      <div className="relative mx-auto">
        <div
          className="group relative aspect-[4/5] touch-pan-y overflow-hidden rounded-2xl border border-cyan-100/25 bg-slate-950 p-1 shadow-[0_16px_38px_rgba(0,0,0,0.25)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-1 h-[calc(100%_-_0.5rem)] w-[calc(100%_-_0.5rem)] rounded-[0.85rem] object-cover"
            />
          </AnimatePresence>
          <button
            type="button"
            onClick={selectPreviousPhoto}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-cyan-50 opacity-85 backdrop-blur-sm transition-all duration-300 hover:bg-slate-950/90 hover:text-white"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            onClick={selectNextPhoto}
            aria-label="Próxima foto"
            className="absolute right-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/60 text-cyan-50 opacity-85 backdrop-blur-sm transition-all duration-300 hover:bg-slate-950/90 hover:text-white"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPhotoGallery;
