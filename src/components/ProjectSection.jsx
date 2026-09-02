import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiCodeBold } from "react-icons/pi";
import { ChartLine, Palette } from "lucide-react";

import { useNavbar } from "../contexts/NavbarContext";
import { projectsData } from "../data/projectsData";

import ProjectCard from "./project/cards/ProjectCard";
import ProjectDetailModal from "./project/modal/ProjectDetailModal";
import LineShadowText from "./project/UI/LineShadowText";

import "./project/styles/projectSection.css";

gsap.registerPlugin(ScrollTrigger);

////////////////////////////////////////
// Seção de projetos
////////////////////////////////////////
const projectEntrance = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: "easeOut" },
  },
};

const projectTabsEntrance = {
  ...projectEntrance,
  visible: {
    ...projectEntrance.visible,
    transition: { ...projectEntrance.visible.transition, delay: 0.14 },
  },
};

const projectContentEntrance = {
  ...projectEntrance,
  visible: {
    ...projectEntrance.visible,
    transition: { ...projectEntrance.visible.transition, delay: 0.28 },
  },
};

const projectGridEntrance = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};

const projectCardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Projetos temporários para testar a disposição da grade. Remover após a validação visual.
const developmentTestProjects = [
  {
    id: 'test-dashboard', title: 'Teste Projeto: Orbit Dashboard', category: 'Development',
    description: 'Os projetos reais estão sendo preparados para serem expostos neste portfólio - Previsão 05/09. Dashboard conceitual para acompanhar métricas e indicadores.',
    types: ['Frontend', 'Dashboard'], context: 'Concept',
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'], buttons: [],
  },
  {
    id: 'test-api', title: 'Teste Projeto: Flow API', category: 'Development',
    description: 'Os projetos reais estão sendo preparados para serem expostos neste portfólio - Previsão 05/09. Estrutura conceitual de API para integrações e automações.',
    types: ['Backend', 'API'], context: 'Concept',
    tech: ['Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop'], buttons: [],
  },
  {
    id: 'test-landing', title: 'Teste Projeto: Nexa Landing', category: 'Development',
    description: 'Os projetos reais estão sendo preparados para serem expostos neste portfólio - Previsão 05/09. Landing page conceitual com foco em conversão e responsividade.',
    types: ['Frontend', 'Landing Page'], context: 'Concept',
    tech: ['Next.js', 'TailwindCSS', 'Figma'],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2070&auto=format&fit=crop'], buttons: [],
  },
  {
    id: 'test-commerce', title: 'Teste Projeto: Vertex Commerce', category: 'Development',
    description: 'Os projetos reais estão sendo preparados para serem expostos neste portfólio - Previsão 05/09. E-commerce conceitual com catálogo, pagamentos e gestão de pedidos.',
    types: ['Full Stack', 'E-commerce'], context: 'Concept',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'], buttons: [],
  },
];

function ProjectSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const getInitialTab = () => {
    const hash = window.location.hash
      .replace("#", "")
      .toLowerCase();
    if (hash === "design") return "Design";
    if (hash === "trading") return "Trading";
    return "Development";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [mobileProjectPage, setMobileProjectPage] = useState(0);
  const [mobileFocusedProjectId, setMobileFocusedProjectId] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const projectIntroRef = useRef(null);
  const projectGridRef = useRef(null);
  const projectShellRef = useRef(null);
  const { hideNavbar, showNavbar } = useNavbar();

  const closePreviewProject = () => {
    if (!previewProject) return;

    if (location.state?.fromProjects) {
      navigate(-1);
      return;
    }

    navigate('/#projects', { replace: true });
  };

  const projectIdFromRoute = location.pathname.match(/^\/projetos\/([^/]+)$/)?.[1];
  const allProjects = [...projectsData, ...developmentTestProjects];

  useEffect(() => {
    if (!projectIdFromRoute) {
      setPreviewProject(null);
      return;
    }

    const routeProject = allProjects.find((project) => project.id === projectIdFromRoute);
    if (!routeProject) {
      navigate('/', { replace: true });
      return;
    }

    setActiveTab(routeProject.category);
    setPreviewProject(routeProject);
  }, [projectIdFromRoute, navigate]);

  useLayoutEffect(() => {
    const intro = projectIntroRef.current;
    if (!intro) return undefined;

    let trigger;
    let setupTimer;
    let setupFrame;

    const setupPin = () => {
      const grid = projectGridRef.current;
      if (!grid) return;
      const columns = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      const cards = [...grid.querySelectorAll('[data-project-card]')]
        .filter((card) => card.getClientRects().length > 0 && window.getComputedStyle(card).display !== 'none');
      const content = intro.querySelector('[data-micro-pin-content]');
      const titleBackdrop = intro.querySelector('[data-project-title-backdrop]');
      if (!content) return;

      const rowCount = Math.ceil(cards.length / columns);
      if (rowCount < 2) return;

      const penultimateRowLastCard = cards[(rowCount - 1) * columns - 1];
      if (!penultimateRowLastCard) return;

      const compactScale = 0.75;
      const getHeaderHeight = () => document.querySelector('header')?.getBoundingClientRect().height || 72;
      const getCompactHeaderBottom = () => Math.ceil(getHeaderHeight() + content.offsetHeight * compactScale + 8);
      const updateCompactState = (progress) => {
        const compactProgress = gsap.utils.clamp(0, 1, progress / 0.16);
        gsap.set(content, {
          scale: gsap.utils.interpolate(1, compactScale, compactProgress),
          y: 0,
          transformOrigin: 'top center',
        });
        if (titleBackdrop) gsap.set(titleBackdrop, { autoAlpha: compactProgress > 0.98 ? 1 : 0 });
      };

      trigger = ScrollTrigger.create({
        trigger: intro,
        start: () => `top ${Math.ceil(getHeaderHeight())}px`,
        endTrigger: penultimateRowLastCard,
        end: () => `bottom ${getCompactHeaderBottom()}px`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateCompactState(self.progress),
        onRefresh: (self) => updateCompactState(self.progress),
      });

      if (trigger.spacer) trigger.spacer.style.pointerEvents = 'none';
      ScrollTrigger.refresh();
    };

    setupFrame = window.requestAnimationFrame(() => {
      setupTimer = window.setTimeout(setupPin, 420);
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      window.clearTimeout(setupTimer);
      trigger?.kill();
      gsap.set(intro.querySelector('[data-micro-pin-content]'), { clearProps: 'transform' });
      gsap.set(intro.querySelector('[data-project-title-backdrop]'), { autoAlpha: 0 });
    };
  }, [activeTab, mobileProjectPage]);

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

  const projectCounts = projectsData.reduce((counts, project) => {
    counts[project.category] = (counts[project.category] || 0) + 1;
    return counts;
  }, {});
  projectCounts.Development = (projectCounts.Development || 0) + developmentTestProjects.length;

  const tabs = [

    { id: 'Development', label: `Desenvolvimento (${projectCounts.Development || 0})`, icon: <PiCodeBold className="text-xl" /> },

    { id: 'Design', label: `Design (${projectCounts.Design || 0})`, icon: <Palette className="h-5 w-5" /> },

    { id: 'Trading', label: `Trading e investimentos (${projectCounts.Trading || 0})`, icon: <ChartLine className="h-5 w-5" /> },
  ];

  const filteredProjects = projectsData.filter((project) => {
    return project.category === activeTab;
  });

  const displayProjects = activeTab === 'Development'
    ? [...filteredProjects, ...developmentTestProjects]
    : filteredProjects;
  const mobileProjectsPerPage = 3;
  const mobileProjectPageCount = Math.ceil(displayProjects.length / mobileProjectsPerPage);
  const mobileProjectStart = mobileProjectPage * mobileProjectsPerPage;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    let observer;
    let animationFrame;

    const observeCards = () => {
      observer?.disconnect();
      setMobileFocusedProjectId(null);

      if (!media.matches || !projectGridRef.current) return;

      const visibleCards = new Map();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const projectId = entry.target.dataset.projectCard;
          if (entry.isIntersecting) visibleCards.set(projectId, entry.intersectionRatio);
          else visibleCards.delete(projectId);
        });

        const focused = [...visibleCards.entries()]
          .sort(([, firstRatio], [, secondRatio]) => secondRatio - firstRatio)[0];
        setMobileFocusedProjectId(focused?.[0] || null);
      }, {
        rootMargin: "-22% 0px -22% 0px",
        threshold: [0.25, 0.5, 0.75],
      });

      projectGridRef.current
        .querySelectorAll("[data-project-card]")
        .forEach((card) => observer.observe(card));
    };

    animationFrame = window.requestAnimationFrame(observeCards);
    media.addEventListener("change", observeCards);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      media.removeEventListener("change", observeCards);
      observer?.disconnect();
    };
  }, [activeTab, mobileProjectPage]);

  useEffect(() => {
    const shell = projectShellRef.current;
    if (!shell) return undefined;

    let frameId = null;

    const updateBorderGlow = () => {
      frameId = null;
      const bounds = shell.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const focusTop = viewportHeight * 0.35;
      const focusBottom = viewportHeight * 0.65;
      const intersectsFocus = bounds.bottom > focusTop && bounds.top < focusBottom;

      if (!intersectsFocus) {
        shell.style.setProperty('--project-glow-opacity', '0');
        return;
      }

      const clipTop = Math.max(0, Math.min(bounds.height, focusTop - bounds.top));
      const clipBottom = Math.max(0, Math.min(bounds.height, bounds.bottom - focusBottom));

      shell.style.setProperty('--project-glow-clip-top', `${clipTop}px`);
      shell.style.setProperty('--project-glow-clip-bottom', `${clipBottom}px`);
      shell.style.setProperty('--project-glow-opacity', '1');
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateBorderGlow);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [activeTab, mobileProjectPage]);

  return (
    <section id="project" className="pt-4 pb-20">
      <div>
        <div ref={projectIntroRef} className="project-pinned-intro pointer-events-none relative z-40">
        <div data-micro-pin-content className="project-pinned-intro__content pointer-events-none">
        <motion.div
          variants={projectEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="text-center mb-6"
        >
        <h2 className="relative z-50 isolate inline-block font-bold font-display leading-none text-center">
          <span
            aria-hidden="true"
            data-project-title-backdrop
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[calc(100%+0.75rem)] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/25 bg-white/[0.30] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-2xl backdrop-saturate-150 dark:bg-slate-950/20"
          />
          <span className="
            relative z-10 block
            text-xl md:text-2xl
            tracking-[0.25em]
            uppercase
            dark:text-[#00ffdc]
            text-cyan-600
          ">
            <LineShadowText shadowColor="#00b3a4">
              PORTFÓLIO
            </LineShadowText>
          </span>

          <span className="
            relative z-10 block
            mt-1
            text-4xl md:text-6xl
            dark:text-white
            text-slate-800
          ">
            <LineShadowText shadowColor="#bbbbbb">
              Projetos selecionados
            </LineShadowText>
          </span>

        </h2>
        </motion.div>

        <div className="w-full">
        <motion.div
          variants={projectTabsEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="project-pinned-intro__filters pointer-events-none flex justify-center"
        >
          <motion.div
            layout
            className="project-pinned-intro__filter-controls pointer-events-auto inline-flex w-[90vw] max-w-3xl rounded-2xl border p-1.5 shadow-lg dark:border-slate-800 dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a] border-slate-200 bg-white backdrop-blur-md md:w-full"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.a
                key={tab.id}
                href={`#${tab.id.toLowerCase()}`}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveTab(tab.id);
                  setMobileProjectPage(0);
                }}
                className={`
                  relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-transparent px-2 py-4 text-[11px] font-semibold transition-all duration-500 outline-none sm:text-sm
                  before:absolute before:inset-0 before:translate-x-[-120%] before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)] before:transition-transform before:duration-1000
                  hover:border-cyan-300/40 hover:bg-gradient-to-br hover:from-white/10 hover:via-cyan-400/15 hover:to-blue-500/15 hover:backdrop-blur-xl hover:bg-[length:250%_250%] hover:animate-holographic hover:shadow-[0_0_35px_rgba(34,211,238,0.28)] hover:before:translate-x-[120%]
                  ${activeTab === tab.id
                    ? "!border-cyan-300/40 bg-gradient-to-br from-white/10 via-cyan-400/15 to-blue-500/15 text-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.28)] backdrop-blur-xl bg-[length:250%_250%] animate-holographic dark:text-white"
                    : "text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300"}
                `}
                aria-current={activeTab === tab.id ? "page" : undefined}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                <span className="relative z-10 flex flex-col items-center gap-1.5">
                  {tab.icon}
                  <span className="text-center font-bold leading-[1.05]">
                    {tab.label}
                  </span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        </div>
        </div>
        </div>

        <motion.div
          variants={projectContentEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          ref={projectShellRef}
          className="project-grid-shell relative z-0 mx-auto mt-6 w-[90vw] max-w-7xl rounded-3xl border border-slate-100 bg-white p-0 shadow-xl bg-clip-padding dark:border-slate-800/60 dark:bg-slate-900/50 md:w-full md:p-3"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <svg aria-hidden="true" className="project-grid-border-glow" focusable="false">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="23"
              ry="23"
              pathLength="100"
            />
          </svg>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 p-4 md:p-4"
            >

              <>
                <motion.div
                  variants={projectGridEntrance}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  ref={projectGridRef}
                  className="relative z-0 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >

                  {displayProjects.length > 0 ? (
                    displayProjects.map((p, i) => (
                      <motion.div
                        key={p.id || i}
                        variants={projectCardEntrance}
                        className={`relative z-20 pointer-events-auto ${i < mobileProjectStart || i >= mobileProjectStart + mobileProjectsPerPage ? "max-md:hidden" : ""}`}
                        data-project-card={p.id || i}
                      >
                        <ProjectCard
                          project={p}
                          isMobileFocused={mobileFocusedProjectId ? mobileFocusedProjectId === (p.id || i) : null}
                          onClick={(project) => {
                            navigate(`/projetos/${project.id}`, {
                              state: { fromProjects: true },
                            });
                          }}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-slate-400 py-12">
                      Nenhum projeto encontrado.
                    </div>
                  )}

                </motion.div>

                {mobileProjectPageCount > 1 && (
                  <div className="mt-6 flex flex-col items-center gap-2 text-xs font-semibold text-slate-500 dark:text-white/80 md:hidden">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMobileProjectPage((page) => Math.max(0, page - 1))}
                        disabled={mobileProjectPage === 0}
                        className="inline-flex items-center gap-2 px-1 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <FaChevronLeft className="text-[10px]" />
                        <span>Anterior</span>
                      </button>
                      <span className="text-slate-300 dark:text-white/30">|</span>
                      <button
                        type="button"
                        onClick={() => setMobileProjectPage((page) => Math.min(mobileProjectPageCount - 1, page + 1))}
                        disabled={mobileProjectPage === mobileProjectPageCount - 1}
                        className="inline-flex items-center gap-2 px-1 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <span>Próximo</span>
                        <FaChevronRight className="text-[10px]" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs font-bold tabular-nums">
                      {Array.from({ length: mobileProjectPageCount }, (_, page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setMobileProjectPage(page)}
                          aria-label={`Ir para página ${page + 1} de projetos`}
                          aria-current={mobileProjectPage === page ? "page" : undefined}
                          className={mobileProjectPage === page ? "text-cyan-600 underline decoration-cyan-400 underline-offset-4 dark:text-cyan-100" : "text-slate-400 dark:text-white/55"}
                        >
                          {page + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      <AnimatePresence>

        {/* Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            projects={displayProjects}
            onProjectChange={(project) => {
              navigate(`/projetos/${project.id}`, {
                replace: true,
                state: location.state,
              });
            }}
            onClose={closePreviewProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;

