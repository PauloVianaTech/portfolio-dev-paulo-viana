import React, { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiFramer } from 'react-icons/si';
import { ArrowDown, Code2, Layers3, Sparkles } from 'lucide-react';
import { techIcons } from './project/config/techIcons';
import LineShadowText from './project/UI/LineShadowText';
import StackWordStream from './StackWordStream';

gsap.registerPlugin(ScrollTrigger);

const stackItems = [
  {
    number: '01',
    kicker: 'FRONTEND',
    title: 'Frontend',
    outcome: 'Interfaces responsivas com movimento, clareza e boa experiência.',
    tools: [
      { name: 'JavaScript', icon: techIcons.JavaScript },
      { name: 'React', icon: techIcons.React },
      { name: 'Tailwind CSS', icon: techIcons['Tailwind CSS'] },
      { name: 'Vite', icon: techIcons.Vite },
      { name: 'Figma', icon: techIcons.Figma },
      { name: 'Framer Motion', icon: <SiFramer className="text-pink-300" /> },
    ],
    accent: 'from-cyan-400 via-sky-500 to-violet-500',
    numberAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    thumbnailAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    glow: 'dark:bg-cyan-400/15 bg-cyan-300/30',
  },
  {
    number: '02',
    kicker: 'BACKEND E DADOS',
    title: 'Backend e Dados',
    mobileNavLabel: ['Backend', 'Dados'],
    outcome: 'Sistemas conectados, persistentes e preparados para integrações.',
    tools: [
      { name: 'Node.js', icon: techIcons['Node.js'] },
      { name: 'Express', icon: techIcons.Express },
      { name: 'PostgreSQL', icon: techIcons.PostgreSQL },
      { name: 'Supabase', icon: techIcons.Supabase },
      { name: 'GitHub', icon: techIcons.GitHub },
      { name: 'Vercel', icon: techIcons.Vercel },
    ],
    accent: 'from-emerald-400 via-cyan-500 to-blue-500',
    glow: 'dark:bg-emerald-400/15 bg-emerald-300/30',
  },
  {
    number: '03',
    kicker: 'DESIGN DIGITAL',
    title: 'Design Digital',
    mobileNavLabel: ['Design', 'Digital'],
    outcome: 'Hierarquia, identidade e acabamento visual para produtos digitais.',
    tools: [
      { name: 'Illustrator', icon: techIcons.Illustrator },
      { name: 'Photoshop', icon: techIcons.Photoshop },
      { name: 'Figma', icon: techIcons.Figma },
      { name: 'Canva', icon: techIcons.Canva },
      { name: 'CapCut', icon: techIcons.CapCut },
      { name: 'OBS Studio', icon: techIcons['OBS Studio'] },
    ],
    accent: 'from-pink-400 via-violet-500 to-cyan-400',
    numberAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    thumbnailAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    glow: 'dark:bg-pink-400/15 bg-pink-300/30',
  },
  {
    number: '04',
    kicker: 'TRADING TECH',
    title: 'Trading Tech',
    mobileNavLabel: ['Trading', 'Tech'],
    outcome: 'Indicadores, alertas e automações para análise operacional.',
    tools: [
      { name: 'Profit Pro', icon: techIcons['Profit Pro'] },
      { name: 'MetaTrader 5', icon: techIcons['MetaTrader 5'] },
      { name: 'NTSL', icon: techIcons.NTSL },
      { name: 'MQL5', icon: techIcons.MQL5 },
    ],
    accent: 'from-blue-400 via-cyan-400 to-emerald-400',
    glow: 'dark:bg-blue-400/15 bg-blue-300/30',
  },
  {
    number: '05',
    kicker: 'NA PRÁTICA',
    title: 'Projetos na prática',
    navLabel: 'Projetos',
    outcome: 'A próxima seção mostra essas capacidades aplicadas em trabalhos reais e estudos.',
    tools: [
      { name: 'Aplicação real', icon: <Layers3 className="text-cyan-300" /> },
      { name: 'Processo', icon: <Sparkles className="text-yellow-300" /> },
      { name: 'Código', icon: <Code2 className="text-sky-300" /> },
      { name: 'Resultado', icon: <ArrowDown className="text-emerald-300" /> },
    ],
    accent: 'from-violet-400 via-pink-400 to-emerald-400',
    numberAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    thumbnailAccent: 'from-cyan-400 via-sky-500 to-emerald-400',
    glow: 'dark:bg-violet-400/15 bg-violet-300/30',
  },
];

const MotionSection = motion.section;
const MotionDiv = motion.div;
// Após o slide 2, cada miniatura adicional à esquerda ocupa 64px + 24px de gap.
// Isso preserva a mesma distância entre o conteúdo ativo e a última barra esquerda.
const cardOffsets = [
  'lg:ml-[9vw]',
  'lg:ml-[calc(9vw+88px)]',
  'lg:ml-[calc(9vw+176px)]',
  'lg:ml-[calc(9vw+264px)]',
  'lg:ml-[calc(9vw+352px)]',
];

function AppliedStack() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const panelRefs = useRef([]);
  const stackSceneRef = useRef(null);
  const desktopRailLayerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const wordStreamRef = useRef(null);
  const stackDividerRef = useRef(null);
  const stackIntroParallaxRef = useRef(null);
  const transitionPortalRef = useRef(null);
  const transitionFrameRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const matchMedia = gsap.matchMedia();

    const setupHorizontalScroll = ({
      startX = 0,
      endExtra = 1,
      holdStart = 0,
      holdEnd = 0,
      transitionDistance = 0,
      framesStartDistance = 0,
      framesEndDistance = 0,
      iconsStartDistance = 0,
      iconsEndDistance = 0,
      projectsRiseDistance = 0,
      scrub = 1.1,
      start = 'top top',
    }) => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.stack-panel', track);
        const getStartX = () => (typeof startX === 'function' ? startX() : startX);
        document.documentElement.style.setProperty('--projects-rise-offset', `-${projectsRiseDistance * 100}vh`);
        const getViewportWidth = () => section.getBoundingClientRect().width || window.innerWidth;
        const getDistance = () => Math.max(0, (panels.length - 1) * getViewportWidth());
        const getHoldDistance = () => window.innerHeight * holdStart;
        const getEndHoldDistance = () => window.innerHeight * holdEnd;
        const getTransitionDistance = () => window.innerHeight * transitionDistance;
        const getIconsStartDistance = () => window.innerHeight * iconsStartDistance;
        const getIconsEndDistance = () => window.innerHeight * iconsEndDistance;
        const getTotalDistance = () => getDistance() + getHoldDistance() + getEndHoldDistance() + getTransitionDistance() + window.innerHeight * endExtra;
        const getAnimatedProgress = (progress) => {
          const scrollDistance = progress * getTotalDistance();
          return Math.min(1, Math.max(0, (scrollDistance - getHoldDistance()) / Math.max(1, getDistance())));
        };
        const getTransitionProgress = (progress) => {
          const scrollDistance = progress * getTotalDistance();
          const transitionStart = getHoldDistance() + getDistance() + getEndHoldDistance();
          return Math.min(1, Math.max(0, (scrollDistance - transitionStart) / Math.max(1, getTransitionDistance())));
        };
        const getIconsProgress = (progress) => {
          const scrollDistance = progress * getTotalDistance();
          const transitionStart = getHoldDistance() + getDistance() + getEndHoldDistance();
          const iconsStart = transitionStart + getIconsStartDistance();
          const iconsDuration = Math.max(1, getIconsEndDistance() - getIconsStartDistance());
          return Math.min(1, Math.max(0, (scrollDistance - iconsStart) / iconsDuration));
        };
        const getScrollProgressForSlide = (index) => {
          const slideDistance = getHoldDistance() + (index / Math.max(1, panels.length - 1)) * getDistance();
          return slideDistance / Math.max(1, getTotalDistance());
        };
        // Base da próxima transição: uma única variável, contínua e limitada ao
        // trecho final de Stacks. Ainda não aplica nenhum efeito visual.
        // Mantém movimento perceptível até o fim da distância de saída, sem a longa
        // desaceleração final que fazia o clip aparentar 100% antes do fim do pin.
        const setTrackProgress = (progress) => {
          gsap.set(track, {
            x: getStartX() - getDistance() * progress,
          });

          if (wordStreamRef.current) {
            gsap.set(wordStreamRef.current, {
              x: -getDistance() * progress,
            });
          }
        };
        const clearProjectsTransitionStyles = () => {
          gsap.set(stackSceneRef.current, {
            clearProps: 'clipPath,opacity,scale,filter,transformOrigin',
          });
          gsap.set([desktopRailLayerRef.current, mobileNavRef.current].filter(Boolean), {
            clearProps: 'opacity,y,pointerEvents',
          });
          gsap.set(stackDividerRef.current, { autoAlpha: 1 });
          gsap.set(transitionPortalRef.current, { autoAlpha: 0, clearProps: 'width,height' });
          gsap.set(transitionFrameRefs.current.filter(Boolean), { autoAlpha: 0, clearProps: 'width,height' });
        };

        const setClosingFrames = (progress) => {
          const transitionPosition = progress * transitionDistance;
          const closingProgress = Math.min(
            1,
            Math.max(0, (transitionPosition - framesStartDistance) / Math.max(0.001, framesEndDistance - framesStartDistance)),
          );
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          gsap.set(stackSceneRef.current, {
            clipPath: `inset(${closingProgress * 50}vh ${closingProgress * 50}vw ${closingProgress * 50}vh ${closingProgress * 50}vw)`,
            autoAlpha: 1 - closingProgress,
          });

          if (transitionPortalRef.current) {
            gsap.set(transitionPortalRef.current, {
              autoAlpha: closingProgress > 0 && closingProgress < 1 ? 0.92 * (1 - closingProgress) : 0,
              width: Math.max(36, viewportWidth * (1 - closingProgress * 0.94)),
              height: Math.max(28, viewportHeight * (1 - closingProgress * 0.92)),
            });
          }

          transitionFrameRefs.current.forEach((frame, index) => {
            if (!frame) return;
            const frameProgress = Math.min(1, Math.max(0, (closingProgress - index * 0.1) / 0.9));
            gsap.set(frame, {
              autoAlpha: frameProgress > 0 && frameProgress < 1 ? 0.85 * (1 - frameProgress) : 0,
              width: Math.max(36, viewportWidth * (1 - frameProgress * 0.94)),
              height: Math.max(28, viewportHeight * (1 - frameProgress * 0.92)),
            });
          });
        };

        // A transição visual acompanha o scroll com uma interpolação curta. Isso remove
        // os pequenos degraus de wheel/touchpad sem introduzir atraso perceptível.
        gsap.set(track, {
          width: () => `${panels.length * getViewportWidth()}px`,
        });

        gsap.set(panels, {
          width: () => getViewportWidth(),
          minWidth: () => getViewportWidth(),
          flexBasis: () => getViewportWidth(),
        });

        gsap.set(track, {
          x: getStartX,
        });
        // Mantém o estado base: a transição Stacks → Projects está temporariamente desativada.
        clearProjectsTransitionStyles();

        // Handoff visual: depois que o pin principal termina, mantém a cena de
        // Stacks fixa enquanto Projects percorre a viewport de baixo para cima.
        // Assim o último slide não é percebido voltando ao fluxo vertical.
        const scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start,
          end: () => `+=${getTotalDistance()}`,
          scrub,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const animatedProgress = getAnimatedProgress(self.progress);
            const transitionProgress = getTransitionProgress(self.progress);
            const iconsProgress = getIconsProgress(self.progress);

            setTrackProgress(animatedProgress);
            setClosingFrames(transitionProgress);
            document.documentElement.style.setProperty('--projects-spatial-progress', iconsProgress.toFixed(4));
            window.dispatchEvent(new Event('projects-spatial-progress'));

            const nextIndex = Math.min(
              panels.length - 1,
              Math.max(0, Math.round(animatedProgress * (panels.length - 1))),
            );

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
          onRefresh: (self) => {
            setTrackProgress(getAnimatedProgress(self.progress));
            setClosingFrames(getTransitionProgress(self.progress));
            document.documentElement.style.setProperty('--projects-spatial-progress', getIconsProgress(self.progress).toFixed(4));
          },
        });

        scrollTrigger.scrollProgressForSlide = getScrollProgressForSlide;
        scrollTriggerRef.current = scrollTrigger;
        window.setTimeout(() => ScrollTrigger.refresh(), 100);
      }, section);

      return () => {
        scrollTriggerRef.current = null;
        ctx.revert();
      };
    };

    matchMedia.add('(min-width: 1024px)', () => {
      return setupHorizontalScroll({
        startX: 0,
        endExtra: 0,
        holdStart: 0,      
        holdEnd: 0.45,
        transitionDistance: 2.5,
        // Molduras: início e fim dentro da área de transição (em vh).
        framesStartDistance: 0,
        framesEndDistance: 1.25,
        // Ícones e retângulos: início e fim dentro da área de transição (em vh).
        iconsStartDistance: 0.5,
        iconsEndDistance: 2.5,
        // Faz Projects começar a subir antes do fim da transição (em vh), ou seja é transitionDistanc - projectsRiseDistanc  
        projectsRiseDistance: 0.7,
        // Prepara o pin-spacer antes do topo de Stacks ficar visível, evitando
        // a troca brusca entre fluxo normal e seção fixa.
        scrub: 2.5,
      });
    });

    matchMedia.add('(max-width: 1023px)', () => {
      return setupHorizontalScroll({
        startX: 0,
        endExtra: 0,
        holdStart: 0,      
        holdEnd: 0.25,
        transitionDistance: 2,
        framesStartDistance: 0,
        framesEndDistance: 0.8,
        iconsStartDistance: 0.5,
        iconsEndDistance: 2,
        projectsRiseDistance: 0.6,
        scrub: 1.5,
        start: () => {
          const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 72;
          // A linha divisória fica 36px abaixo do início de Stacks.
          // Usamos seu eixo como referência visual do pin, preservando a navbar.
          return 'top 52px';//`top ${Math.ceil(headerHeight)}px`;
        },
      });
    });

    // O parallax do título termina antes do pin de Stacks. No desktop a
    // trajetória é menor para preservar a distância do header.
    const entryParallaxContext = gsap.context(() => {
      if (!stackIntroParallaxRef.current) return;

      const isDesktop = window.innerWidth >= 1024;

      gsap.fromTo(
        stackIntroParallaxRef.current,
        { y: isDesktop ? 36 : 72 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: isDesktop ? 'top 86%' : 'top 82%',
            end: isDesktop ? 'top 38%' : 'top 22%',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    // Em navegadores móveis, a barra de endereço altera a viewport visual enquanto
    // o pin está ativo. O ScrollTrigger precisa recalcular o pin-spacer depois que
    // essa alteração termina para não deixar uma faixa vazia no rodapé.
    const visualViewport = window.visualViewport;
    let viewportRefreshTimer;
    const refreshAfterViewportChange = () => {
      if (window.innerWidth >= 1024) return;

      window.clearTimeout(viewportRefreshTimer);
      viewportRefreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    };

    visualViewport?.addEventListener('resize', refreshAfterViewportChange);

    return () => {
      window.clearTimeout(viewportRefreshTimer);
      visualViewport?.removeEventListener('resize', refreshAfterViewportChange);
      entryParallaxContext.revert();
      matchMedia.revert();
    };
  }, []);

  const handleSelectStackItem = (index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);

    const trigger = scrollTriggerRef.current;
    if (trigger) {
      const progress = typeof trigger.scrollProgressForSlide === 'function'
        ? trigger.scrollProgressForSlide(index)
        : index / Math.max(1, stackItems.length - 1);
      const targetY = trigger.start + (trigger.end - trigger.start) * progress;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      return;
    }

    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <MotionSection
      ref={sectionRef}
      id="stack"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
      className="relative z-0 min-h-[calc(100dvh-36px)] w-full overflow-hidden bg-transparent pb-10 pt-16 lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:h-screen lg:min-h-0 lg:w-screen lg:py-0"
    >
      <div ref={stackDividerRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-2 z-20 h-14 overflow-visible">
        <div className="absolute left-1/2 top-1/2 h-[2.5px] w-2/3 max-w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#22d3ee_25%,#3b82f6_50%,#34d399_75%,transparent_100%)] bg-[length:250%_100%] animate-primaryFlow [clip-path:polygon(0_30%,50%_0,100%_30%,100%_70%,50%_100%,0_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-3 w-2/3 max-w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#22d3ee_25%,#3b82f6_50%,#34d399_75%,transparent_100%)] bg-[length:250%_100%] opacity-35 blur-md animate-primaryFlow [clip-path:polygon(0_30%,50%_0,100%_30%,100%_70%,50%_100%,0_70%)] dark:opacity-40" />
      </div>
      <div ref={stackSceneRef} className="relative flex h-full flex-col justify-center overflow-hidden">
        <div ref={desktopRailLayerRef} className="contents">
          <StackThumbnailRail
            entries={stackItems
              .map((item, index) => ({ item, index }))
              .filter((entry) => entry.index < activeIndex)}
            side="left"
            onSelect={handleSelectStackItem}
          />
          <StackThumbnailRail
            entries={stackItems
              .map((item, index) => ({ item, index }))
              .filter((entry) => entry.index > activeIndex)}
            side="right"
            onSelect={handleSelectStackItem}
          />
        </div>
        <div ref={stackIntroParallaxRef} className="mx-auto w-full max-w-7xl px-6 text-center md:px-8 lg:absolute lg:left-1/2 lg:top-24 lg:z-20 lg:-translate-x-1/2">
          <h2 className="font-display font-bold leading-none">
            <span className="block text-xl uppercase tracking-[0.25em] text-cyan-600 dark:text-[#00ffdc] md:text-2xl">
              <LineShadowText shadowColor="#00b3a4">
                TECNOLOGIAS
              </LineShadowText>
            </span>

            <span className="mt-1 block text-3xl leading-tight text-slate-800 dark:text-white sm:text-4xl md:text-5xl">
              <LineShadowText shadowColor="#bbbbbb">
                APLICADAS COMO FERRAMENTAS
              </LineShadowText>
            </span>
          </h2>
        </div>

        <div ref={trackRef} className="mt-0 flex gap-0 overflow-visible pb-0 lg:mt-0 lg:will-change-transform">
          {stackItems.map((item, index) => (
            <MotionDiv
              key={item.title}
              ref={(element) => {
                panelRefs.current[index] = element;
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: 'easeOut' }}
              className="stack-panel relative flex min-h-[50vh] w-screen min-w-[100vw] shrink-0 items-start px-5 pt-2 md:px-8 lg:min-h-screen lg:w-screen lg:min-w-[100vw] lg:items-center lg:px-[7vw] lg:pb-24 lg:pt-40"
            >
              <div className={`absolute right-[-12%] top-[18%] h-72 w-72 rounded-full blur-3xl ${item.glow}`} />
              <div className={`absolute bottom-[12%] left-[8%] h-28 w-28 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-2xl`} />

              <div className="relative w-full max-w-7xl">
                <div className={`relative w-full max-w-[680px] bg-transparent px-1 py-2 md:px-8 md:py-8 lg:px-9 lg:py-8 ${cardOffsets[index] || 'lg:ml-0'}`}>
                    <div className="flex items-center gap-5">
                      <span className={`bg-gradient-to-r ${item.numberAccent || item.accent} bg-clip-text font-display text-3xl font-black uppercase leading-tight tracking-wide text-transparent md:text-5xl`}>
                        {item.number}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/60 via-emerald-300/30 to-transparent" />
                    </div>

                    <p className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-wide dark:text-white text-slate-950 md:text-5xl">
                      {item.kicker}
                    </p>
                    <p className="mt-3 max-w-2xl font-cascadia text-sm leading-relaxed dark:text-slate-300 text-slate-600 md:text-lg">
                      {item.outcome}
                    </p>

                    <div className={`mt-4 grid max-w-xl grid-cols-2 gap-2 text-left sm:grid-cols-2 md:mt-8 md:gap-3 ${item.tools.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
                  {item.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-white/10 dark:bg-[#08111f]/80 bg-white/75 px-2 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] md:min-h-[66px] md:gap-3 md:rounded-xl md:px-3 md:py-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/30 text-xl text-white [&_img]:h-5 [&_img]:w-5 [&_svg]:h-5 [&_svg]:w-5 md:h-11 md:w-11 md:rounded-lg md:text-2xl md:[&_img]:h-7 md:[&_img]:w-7 md:[&_svg]:h-7 md:[&_svg]:w-7">
                        {tool.icon}
                      </span>
                      <span className="font-cascadia text-[11px] font-semibold leading-tight dark:text-white text-slate-800 md:text-sm">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        <MobileStackNav
          ref={mobileNavRef}
          items={stackItems}
          activeIndex={activeIndex}
          onSelect={handleSelectStackItem}
        />
        <StackWordStream ref={wordStreamRef} />
      </div>
      <div
        ref={transitionPortalRef}
        aria-hidden="true"
        className="projects-transition-portal pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0"
      />
      {[0, 1, 2].map((frame) => (
        <div
          key={frame}
          ref={(element) => { transitionFrameRefs.current[frame] = element; }}
          aria-hidden="true"
          className={`projects-transition-frame projects-transition-frame--${frame + 1} pointer-events-none absolute left-1/2 top-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 opacity-0`}
        />
      ))}
    </MotionSection>
  );
}

function StackThumbnailRail({ entries, side, onSelect }) {
  const isLeft = side === 'left';

  if (!entries.length) return null;

  return (
    <div
      className={`pointer-events-none absolute top-[63%] z-30 hidden -translate-y-1/2 items-center lg:flex ${
        isLeft ? 'left-[5vw] justify-start' : 'right-[4vw] justify-end'
      }`}
    >
      <div className="relative flex items-center gap-6 isolate">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-y-4 -left-4 -right-4 -z-10 rounded-[2.25rem] border border-white/25 bg-white/[0.30] backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] dark:bg-slate-950/20 ${
            isLeft
              ? 'shadow-[0_0_40px_rgba(52,211,153,0.12)]'
              : 'shadow-[0_0_40px_rgba(34,211,238,0.12)]'
          }`}
        />
        <AnimatePresence initial={false}>
          {entries.map(({ item, index }) => (
            <StackThumbnail
              key={`${side}-${item.number}`}
              item={item}
              side={side}
              onClick={() => onSelect(index)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const MobileStackNav = React.forwardRef(function MobileStackNav({ items, activeIndex, onSelect }, ref) {
  return (
    <div ref={ref} className="relative z-30 mx-auto -mt-10 flex w-full max-w-[calc(100vw-1.5rem)] justify-center gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={`mobile-${item.number}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`relative flex h-14 min-w-14 flex-col justify-between overflow-hidden rounded-lg border px-2 py-2 text-left shadow-lg backdrop-blur-md transition-colors duration-300 ${
              isActive
                ? 'border-cyan-300/70 bg-[#08111f]/95 text-white shadow-[0_0_18px_rgba(34,211,238,0.22)]'
                : 'border-white/10 bg-[#08111f]/70 text-white/70'
            }`}
            aria-label={`Ir para ${item.title}`}
          >
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.thumbnailAccent || item.accent}`} />
            <span className="font-display text-sm font-black leading-none">
              {item.number}
            </span>
            <span className="font-cascadia text-[9px] font-bold uppercase leading-[1.05] tracking-[0.03em]">
              {(item.mobileNavLabel || [item.navLabel || item.title]).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
});

function StackThumbnail({ item, side, onClick }) {
  const isLeft = side === 'left';

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      onClick={onClick}
      className={`pointer-events-auto group relative flex h-[min(54vh,390px)] w-16 flex-col items-center overflow-hidden rounded-xl border px-2 pb-5 pt-6 text-white shadow-[0_0_28px_rgba(34,211,238,0.14)] backdrop-blur-md transition-colors duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_36px_rgba(34,211,238,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:bg-[#08111f]/85 bg-slate-900/85 ${
        isLeft ? 'border-emerald-300/20' : 'border-cyan-300/20'
      }`}
      aria-label={`Ir para ${item.title}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.thumbnailAccent || item.accent}`} />
      <span className="font-display text-3xl font-black leading-none text-white">
        {item.number}
      </span>
      <span
        className="mt-7 flex-1 font-cascadia text-lg font-bold uppercase leading-none tracking-[0.12em] text-white/95"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {item.navLabel || item.title}
      </span>
    </motion.button>
  );
}

export default AppliedStack;
