// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';


////////////////////////////////////////
// Projetos do portfólio
////////////////////////////////////////
const dummyProjects = [
  {
    title: "Drip Store",
    description: "E-commerce front-end desenvolvido  com foco em responsividade, experiência do usuário e interface moderna.",
    tech: ["React", "TailwindCSS", "JavaScript", "Next.js", "HTML5", "CSS3", "MongoDB", "Git & GitHub", "Vercel"], //, "Next.js", "HTML5", "CSS3", "MongoDB", "Git & GitHub", "Vercel"
    buttons: [
      {
        type: "demo",
        label: "Live Demo",
        link: "https://github.com/PauloVianaTech/drip-store",
      },

      {
        type: "github",
        label: "Source Code",
        link: "https://github.com/PauloVianaTech/drip-store",
      },
    ],

    button2Link: "https://github.com/PauloVianaTech/drip-store",
    button2Type: "github",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Development",
  },

  {
    title: "Backend GT3",
    description: "Estrutura backend para aplicações web com organização de rotas, controllers e serviços.",
    tech: ["Node.js", "Express", "JavaScript"],
    link: "https://github.com/PauloVianaTech/projeto-backend-gt3",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Development",
  },
];

////////////////////////////////////////
// Componentes auxiliares de animação
////////////////////////////////////////
const LineShadowText = ({
  children,
  className = "",
  shadowColor = "#00e5ff",
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `
          1px 1px 0 ${shadowColor},
          2px 2px 0 rgba(0,0,0,0.25),
          0 0 18px ${shadowColor}
        `,
      }}
    >
      {children}
    </span>
  );
};

////////////////////////////////////////
// Modal de detalhes do projeto
////////////////////////////////////////
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };
////////////////////////////////////////
// Ícones de tecnologia dentro modal de detalhes
////////////////////////////////////////
  const techIcons = {
    "React": <FaReact className="text-cyan-400 text-base" />,
    "Next.js": <SiNextdotjs className="text-white text-base" />,
    "JavaScript": <FaJsSquare className="text-yellow-400 text-base" />,
    "TailwindCSS": <SiTailwindcss className="text-cyan-300 text-base" />,
    "HTML5": <FaHtml5 className="text-orange-500 text-base" />,
    "CSS3": <FaCss3Alt className="text-blue-500 text-base" />,
    "Node.js": <FaNodeJs className="text-green-500 text-base" />,
    "Express": <SiExpress className="text-gray-300 text-base" />,
    "MongoDB": <SiMongodb className="text-green-400 text-base" />,
    "PostgreSQL": <SiPostgresql className="text-sky-400 text-base" />,
    "Git & GitHub": <FaGithub className="text-white text-base" />,
    "Vercel": <SiVercel className="text-white text-base" />,
    "Figma": <FaFigma className="text-pink-400 text-base" />,

    "Photoshop": <span className="text-blue-400 text-sm font-bold">Ps</span>,
    "Illustrator": <span className="text-orange-400 text-sm font-bold">Ai</span>,
    "Branding": <span className="text-violet-400 text-sm font-bold">Br</span>,

    "Nelogica NTSL": <span className="text-emerald-400 font-bold tracking-wide">Nelogica NTSL</span>,
    "Profit Pro": <span className="text-green-300 font-bold tracking-wide">Profit Pro</span>,
    "MQL5": <span className="text-blue-400 text-sm font-bold">MQL5</span>,
    "MetaTrader 5": <span className="text-cyan-300 text-sm font-bold">MT5</span>,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl w-full dark:bg-slate-900 bg-white rounded-3xl overflow-visible shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 bg-black/40 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white p-3 rounded-2xl backdrop-blur-md transition-all duration-300"
          >
            <FaTimes />
          </button>

          {/* Image Section */}
          <div
            className="relative w-full md:w-1/2 min-h-[240px] md:min-h-full overflow-hidden rounded-t-3xl md:rounded-none md:rounded-l-3xl"

            onTouchStart={(e) =>
              setTouchStart(e.targetTouches[0].clientX)
            }

            onTouchMove={(e) =>
              setTouchEnd(e.targetTouches[0].clientX)
            }

            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;

              const distance = touchStart - touchEnd;

              if (distance > 65) {
                nextImage();
              }

              if (distance < -65) {
                prevImage();
              }

              setTouchStart(null);
              setTouchEnd(null);
            }}
          >

            <img
              src={project.images?.[currentImage] || project.image}
              alt={project.title}
              onClick={() => setFullscreenImage(true)}
              className="absolute inset-0 z-0 w-full h-full object-cover cursor-zoom-in transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.01] hover:scale-[1.03]"
            />


            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

            {/* Setas */}
            {project.images && project.images.length > 1 && (
              <>
                <button  //seta esquerda
                  onClick={prevImage}
                  className="
                    absolute left-0 
                    top-1/2 -translate-y-1/2
                    h-1/2
                    w-12 md:w-14
                    z-20 group
                  "
                >
                  <div
                    className="
                      absolute left-3 top-1/2 -translate-y-1/2
                      bg-black/35 backdrop-blur-md
                      border border-white/10
                      text-white
                      p-2 md:p-3
                      rounded-xl
                      opacity-70
                      group-hover:opacity-100
                      group-hover:bg-black/55
                      transition-all duration-300
                    "
                  >
                    <FaChevronLeft className="text-lg md:text-xl" />
                  </div>

                </button>

                <button  //seta direita
                  onClick={nextImage}
                  className="
                    absolute right-0
                    top-1/2 -translate-y-1/2
                    h-1/2
                    w-12 md:w-14
                    z-20 group                
                  "
                >

                  <div
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      bg-black/35 backdrop-blur-md
                      border border-white/10
                      text-white
                      p-2 md:p-3
                      rounded-xl
                      opacity-70
                      group-hover:opacity-100
                      group-hover:bg-black/55
                      transition-all duration-300
                    "
                  >
                    <FaChevronRight className="text-lg md:text-xl" />
                  </div>

                </button>

                {/* MINI SLIDES */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 w-full max-w-[90%] flex justify-center">
                  <div className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-visible w-fit max-w-full py-1 pb-2 px-1 
                  scrollbar-thin md:scrollbar-none scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">

                    {project.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-14 h-10 md:w-16 md:h-11 shrink-0 rounded-lg border transition-all duration-300 p-0.5 ${currentImage === index
                          ? "border-cyan-300 bg-cyan-400/25 shadow-[0_0_16px_rgba(34,211,238,0.7)] scale-[1.04]"
                          : "border-white/20 bg-black/20 opacity-70 hover:opacity-100 hover:border-cyan-300/40"
                          }`}
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-md">

                          <img
                            src={img}
                            alt={`${project.title} preview ${index + 1}`}
                            className={`w-full h-full object-cover transition-all duration-500 ${"scale-100"
                              }`}
                          />

                          <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/10">
                            {index + 1}
                          </div>

                        </div>
                      </button>
                    ))}

                  </div>
                </div>
              </>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 flex flex-col h-full">
            <div className="flex flex-col flex-1 justify-start"></div>

            {/* Tecnologias */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-2 md:mb-4 max-h-[96px] md:max-h-[120px] overflow-y-auto py-2 px-1 pr-3 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">

              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 md:gap-2 text-[11px] md:text-sm font-medium px-2 md:px-4 py-1 md:py-2 rounded-xl dark:bg-slate-800/80 bg-slate-100 dark:text-white text-slate-800 border dark:border-slate-700 border-slate-300 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-base md:text-lg">
                    {techIcons?.[t]}
                  </span>

                  {!["Nelogica NTSL", "Profit Pro"].includes(t) && (
                    <span>{t}</span>
                  )}
                </span>
              ))}
            </div>

            {/* Título */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight dark:text-white text-slate-900 mt-1 md:mt-4 mb-2 md:mb-4 leading-tight">
              {project.title}
            </h2>

            {/* Descrição */}
            <p className="dark:text-slate-300 text-slate-600 leading-relaxed text-base sm:text-lg md:text-lg max-h-[110px] md:max-h-[125px] overflow-y-auto pr-2 mb-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
              {project.description}
            </p>

            <div className="flex-1"></div>

            {/* Botões */}
            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/10">

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                relative overflow-hidden
                flex-1 flex items-center justify-center gap-3
                px-6 py-4 rounded-2xl
                font-bold text-white text-lg md:text-x1
                whitespace-nowrap
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-emerald-400
                bg-[length:250%_250%]
                animate-primaryFlow
                shadow-[0_0_25px_rgba(34,211,238,0.30)]
                hover:shadow-[0_0_40px_rgba(34,211,238,0.50)]
                transition-all duration-500
                hover:scale-[1.03]
                active:scale-[0.98]
                before:absolute
                before:inset-0
                before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)]
                before:translate-x-[-120%]
                hover:before:translate-x-[120%]
                before:transition-transform
                before:duration-1000              
                "
              >
                <FaExternalLinkAlt className="text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.45)] shrink-0" />
                Live Demo
              </a>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                relative overflow-hidden
                flex-1 flex items-center justify-center gap-2 md:gap-3
                px-5 md:px-6 py-4 rounded-2xl
                font-bold text-white text-lg md:text-x1
                whitespace-nowrap
                border border-white/20
                bg-gradient-to-br
                from-white/10
                via-cyan-400/15
                to-blue-500/15
                backdrop-blur-xl
                bg-[length:250%_250%]
                animate-holographic
                shadow-[0_0_25px_rgba(34,211,238,0.18)]
                hover:shadow-[0_0_35px_rgba(34,211,238,0.28)]
                hover:border-cyan-300/40
                transition-all duration-500
                hover:scale-[1.03]
                active:scale-[0.98]
                before:absolute
                before:inset-0
                before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)]
                before:translate-x-[-120%]
                hover:before:translate-x-[120%]
                before:transition-transform
                before:duration-1000              
                "
              >
                <FaGithub className="text-2xl md:text-2xl text-cyan-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] shrink-0" />
                Source Code
              </a>

            </div>

          </div>


        </motion.div>
      </motion.div>

      {/* Fullscreen */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setFullscreenImage(false)}
        >

          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative">

              <motion.img
                src={project.images?.[currentImage] || project.image}
                alt={project.title}

                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}

                onTouchStart={(e) =>
                  setTouchStart(e.targetTouches[0].clientX)
                }

                onTouchMove={(e) =>
                  setTouchEnd(e.targetTouches[0].clientX)
                }

                onTouchEnd={() => {
                  if (!touchStart || !touchEnd) return;

                  const distance = touchStart - touchEnd;

                  if (distance > 65) {
                    nextImage();
                  }

                  if (distance < -65) {
                    prevImage();
                  }

                  setTouchStart(null);
                  setTouchEnd(null);
                }}

                className="
                  w-auto
                  max-w-[95vw] md:max-w-[78vw]
                  max-h-[92vh] md:max-h-[82vh]
                  object-contain rounded-2xl
                  shadow-[0_0_60px_rgba(0,0,0,0.55)]
                "
              />

              {/* BOTÃO X*/}
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
                onClick={() => setFullscreenImage(false)}
              >
                <FaTimes className="text-lg" />
              </button>

              {/* Setas */}
              <button //Seta esquerda
                onClick={prevImage}
                className="
                  absolute left-0
                  top-1/2 -translate-y-1/2

                  h-1/2
                  w-14 md:w-16

                  z-20
                  group
                "
              >

                <div
                  className="
                    absolute left-2 md:left-3
                    top-1/2 -translate-y-1/2

                    bg-black/30 backdrop-blur-md
                    border border-white/10
                    text-white

                    p-2 md:p-3
                    rounded-xl

                    opacity-50
                    hover:opacity-100
                    group-hover:bg-black/55

                    transition-all duration-300
                  "
                >
                  <FaChevronLeft className="text-lg md:text-xl" />
                </div>

              </button>

              <button //Seta Direita
                onClick={nextImage}
                className="
                  absolute right-0
                  top-1/2 -translate-y-1/2

                  h-1/2
                  w-14 md:w-16
                  z-20
                  group
                "
              >

                <div
                  className="
                    absolute right-2 md:right-3
                    top-1/2 -translate-y-1/2

                    bg-black/30 backdrop-blur-md
                    border border-white/10
                    text-white

                    p-2 md:p-3
                    rounded-xl

                    opacity-50
                    hover:opacity-100
                    group-hover:bg-black/55

                    transition-all duration-300
                  "
                >
                  <FaChevronRight className="text-lg md:text-xl" />
                </div>

              </button>

            </div>

            {/* MINI SLIDES  */}
            <div className="mt-4 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
              <div className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-visible w-fit max-w-full py-1 pb-2 px-1 
                  scrollbar-thin md:scrollbar-none scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">

                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-14 h-10 md:w-16 md:h-11 shrink-0 rounded-lg border transition-all duration-300 p-0.5 ${currentImage === index
                      ? "border-cyan-300 bg-cyan-400/25 shadow-[0_0_16px_rgba(34,211,238,0.7)] scale-[1.04]"
                      : "border-white/20 bg-black/20 opacity-70 hover:opacity-100 hover:border-cyan-300/40"
                      }`}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-md">

                      <img
                        src={img}
                        alt={`${project.title} preview ${index + 1}`}
                        className={`w-full h-full object-cover transition-all duration-500 ${"scale-100"
                          }`}
                      />

                      <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/10">
                        {index + 1}
                      </div>

                    </div>
                  </button>
                ))}

              </div>
            </div>

          </div>
        </div>
      )}

    </>
  );
};
////////////////////////////////////////
// Card inicial
////////////////////////////////////////
const ProjectCard = ({ project, onClick }) => {

////////////////////////////////////////
// Ícones de tecnologias no card inicial
////////////////////////////////////////
  const techIcons = {
    "React": <FaReact className="text-cyan-400 text-base" />,
    "Next.js": <SiNextdotjs className="text-white text-base" />,
    "JavaScript": <FaJsSquare className="text-yellow-400 text-base" />,
    "TailwindCSS": <SiTailwindcss className="text-cyan-300 text-base" />,
    "HTML5": <FaHtml5 className="text-orange-500 text-base" />,
    "CSS3": <FaCss3Alt className="text-blue-500 text-base" />,
    "Node.js": <FaNodeJs className="text-green-500 text-base" />,
    "Express": <SiExpress className="text-gray-300 text-base" />,
    "MongoDB": <SiMongodb className="text-green-400 text-base" />,
    "PostgreSQL": <SiPostgresql className="text-sky-400 text-base" />,
    "Git & GitHub": <FaGithub className="text-white text-base" />,
    "Vercel": <SiVercel className="text-white text-base" />,
    "Figma": <FaFigma className="text-pink-400 text-base" />,

    "Photoshop": <span className="text-blue-400 text-sm font-bold">Ps</span>,
    "Illustrator": <span className="text-orange-400 text-sm font-bold">Ai</span>,
    "Branding": <span className="text-violet-400 text-sm font-bold">Br</span>,

    "Nelogica NTSL": <span className="text-emerald-400 font-bold tracking-wide">Nelogica NTSL</span>,
    "Profit Pro": <span className="text-green-300 font-bold tracking-wide">Profit Pro</span>,
    "MQL5": <span className="text-blue-400 text-sm font-bold">MQL5</span>,
    "MetaTrader 5": <span className="text-cyan-300 text-sm font-bold">MT5</span>,
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden dark:hover:shadow-[0_0_45px_rgba(34,211,238,0.28)] border border-white/10 group-hover:border-cyan-300/60 transition-all duration-300 dark:shadow-none shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.18)] hover:-translate-y-1.5 hover:scale-[1.015] cursor-pointer"

    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 dark:group-hover:from-black/80 group-hover:via-cyan-950/40 transition-all duration-700 ease-out"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="translate-y-0 group-hover:-translate-y-1 transition-all duration-500 bg-black/25 backdrop-blur-[2px] rounded-2xl p-2 -m-3">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-black tracking-tight text-white transition-all duration-500 dark:group-hover:text-cyan-300 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 scale-75 rotate-[-10deg] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 ease-out">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-1.5 text-sm leading-relaxed opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:text-white line-clamp-2">
            {project.description}</p>
        </div>




        <div className="translate-y-0 group-hover:-translate-y-2 transition-all duration-700 ease-out bg-black/25 group-hover:bg-black/40 backdrop-blur-[2px] rounded-2xl p-2 -m-3">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md text-white/80 transition-all duration-300 group-hover:scale-105 group-hover:text-white group-hover:border-cyan-400/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                {techIcons?.[t] || t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};


////////////////////////////////////////
// Sessão de projetos
////////////////////////////////////////
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Development');
  const [projectCategory, setProjectCategory] = useState('Development');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Fetching projects from Supabase...');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching projects:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Projects loaded from database:', data.length, 'projects');
          console.log('📊 Projects data:', data);
          setProjectsFromDB(data);
        } else {
          console.log('⚠️ No projects found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

// Esconde a navbar quando o modal é aberto
  useEffect(() => {    
    if (previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [

    { id: 'Development', label: 'Development', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },

    { id: 'Design', label: 'Design', icon: <LuBadge className="text-[1.5em] mb-1" /> },

    { id: 'Trading', label: 'Trading Automation', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects = projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log('🎯 Active projects source:', projectsFromDB.length > 0 ? 'DATABASE' : 'FALLBACK');
  console.log('📦 Total projects:', activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || '#', // Use demo_url as primary link
        github: p.github_url, // Add specific github field
        image: p.image_url,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log('🔄 Transformed projects:', transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === 'Database') return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.25);
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.45);
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="dark:text-[#00ffdc] text-cyan-600"><LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText></span>
          {' '}
          <span className="dark:text-white text-slate-800"><LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-3xl p-2 shadow-lg border dark:border-slate-800 border-slate-200 dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a] bg-white backdrop-blur-md"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-2xl font-semibold text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "dark:text-white text-slate-900" : "text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#0a223a] dark:to-[#101624] bg-slate-100 rounded-2xl border dark:border-transparent border-slate-200"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border dark:border-slate-800/60 border-slate-100 mx-auto max-w-7xl bg-clip-padding dark:bg-slate-900/50 bg-white"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Development' && (
                <>

                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                          {projectsFromDB.length === 0 && (
                            <div className="mt-4 text-sm text-cyan-400">
                              Add projects via Admin Dashboard to see them here!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === 'Design' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  <ProjectCard
                    project={{
                      title: "Social Media Design",
                      description: "Projetos voltados para redes sociais, campanhas visuais e conteúdo digital.",
                      tech: ["Photoshop", "Illustrator"],
                      link: "#",
                      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop",
                      images: [
                        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
                      ],
                    }}
                    onClick={setPreviewProject}
                  />

                  <ProjectCard
                    project={{
                      title: "Brand Identity",
                      description: "Criação de identidade visual, logos e materiais gráficos.",
                      tech: ["Illustrator", "Branding"],
                      link: "#",
                      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
                      images: [
                        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
                      ],
                    }}
                    onClick={setPreviewProject}
                  />

                </div>
              )}

              {activeTab === 'Trading' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  <ProjectCard
                    project={{
                      title: "MACD Pullback Strategy",
                      description: "Indicador para automação de operações baseado em pullback e confirmação de tendência.",
                      tech: ["Nelogica NTSL", "Profit Pro"],
                      link: "#",
                      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
                      images: [
                        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
                      ],
                    }}
                    onClick={setPreviewProject}
                  />

                  <ProjectCard
                    project={{
                      title: "Trading Automation",
                      description: "Projetos voltados para automação, alertas e estratégias para mercado financeiro.",
                      tech: ["MQL5", "MetaTrader 5"],
                      link: "#",
                      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2070&auto=format&fit=crop",
                      images: [
                        "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
                      ],
                    }}
                    onClick={setPreviewProject}
                  />

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>

        {/* Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;