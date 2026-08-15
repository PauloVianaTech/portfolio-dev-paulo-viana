import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { techIcons } from './project/config/techIcons';

const gridItems = [
  { id: 'html', icon: techIcons.HTML5 },
  { id: 'css', icon: techIcons.CSS3 },
  { id: 'javascript', icon: techIcons.JavaScript },
  { id: 'typescript', icon: techIcons.TypeScript },
  { id: 'react', icon: techIcons.React },
  { id: 'next', icon: techIcons['Next.js'] },
  { id: 'tailwind', icon: techIcons['Tailwind CSS'] },
  { id: 'node', icon: techIcons['Node.js'] },
  { id: 'express', icon: techIcons.Express },
  { id: 'mongodb', icon: techIcons.MongoDB },
  { id: 'react-featured', icon: techIcons.React, featured: true },
  { id: 'postgresql', icon: techIcons.PostgreSQL },
  { id: 'supabase', icon: techIcons.Supabase },
  { id: 'vite', icon: techIcons.Vite },
  { id: 'github', icon: techIcons.GitHub },
  { id: 'vercel', icon: techIcons.Vercel },
  { id: 'python', icon: techIcons.Python },
  { id: 'html-alt', icon: techIcons.HTML },
  { id: 'node-alt', icon: techIcons.Node },
  { id: 'git', icon: techIcons.Git },

  { id: 'openai', icon: techIcons.OpenAI },
  { id: 'chatgpt', icon: techIcons.ChatGPT },
  { id: 'claude', icon: techIcons.Claude },
  { id: 'anthropic', icon: techIcons.Anthropic },
  { id: 'gemini', icon: techIcons.Gemini },
  { id: 'perplexity', icon: techIcons.Perplexity },
  { id: 'ollama', icon: techIcons.Ollama },
  { id: 'git', icon: techIcons.Git },
  { id: 'kimi', icon: techIcons.Kimi },
  { id: 'suno', icon: techIcons.Suno },
  { id: 'runway', icon: techIcons.Runway },
  { id: 'WordPress', icon: techIcons.WordPress },
  { id: 'lovable', icon: techIcons.Lovable },
  { id: 'framer', icon: techIcons.Framer },
  { id: 'openai-alt', icon: techIcons.OpenAI },
  { id: 'gemini-alt', icon: techIcons.Gemini },
  { id: 'claude-alt', icon: techIcons.Claude },
  { id: 'ollama-alt', icon: techIcons.Ollama },
  { id: 'perplexity-alt', icon: techIcons.Perplexity },
  { id: 'framer-alt', icon: techIcons.Framer },

  { id: 'figma', icon: techIcons.Figma },
  { id: 'affinity', icon: techIcons.Affinity },
  { id: 'after-effects', icon: techIcons['After Effects'] },
  { id: 'canva', icon: techIcons.Canva },
  { id: 'capcut', icon: techIcons.CapCut },
  { id: 'davinci', icon: techIcons['DaVinci Resolve'] },
  { id: 'illustrator', icon: techIcons.Illustrator },
  { id: 'indesign', icon: techIcons.InDesign },
  { id: 'photoshop', icon: techIcons.Photoshop },
  { id: 'premiere', icon: techIcons.Premiere },
];

const ranges = [
  [0.4, 0.5], [0.2, 0.3], [0.52, 0.62], [0.5, 0.6],
  [0.45, 0.55], [0.1, 0.2], [0.9, 1], [0.3, 0.4],
  [0.8, 0.9], [0.7, 0.8], [0, 0.5], [0.52, 0.62],
  [0.15, 0.25], [0.07, 0.17], [0.75, 0.85], [0.03, 0.13],
  [0.87, 0.97], [0.42, 0.52], [0.57, 0.67], [0.37, 0.47],
  [0.12, 0.22], [0.08, 0.18], [0.84, 0.94], [0.33, 0.43],
  [0.48, 0.58], [0.13, 0.23], [0.78, 0.88], [0.62, 0.72],
  [0.31, 0.41], [0.08, 0.18], [0.04, 0.14], [0.74, 0.84],
  [0.61, 0.71], [0.26, 0.36], [0.63, 0.73], [0.11, 0.21],
  [0.89, 0.99], [0.33, 0.43], [0.88, 0.98], [0.22, 0.32],
  [0.16, 0.26], [0.26, 0.36], [0.66, 0.76], [0.03, 0.13],
  [0.44, 0.54], [0.11, 0.21], [0.23, 0.33], [0.39, 0.49],
  [0.59, 0.69], [0.06, 0.16],
];

const transitionRectangles = [
  { id: 'rect-1', left: '12%', top: '16%', width: 'clamp(9rem, 18vmin, 14rem)', start: 0.45, end: 0.58, fromCenter: true, timing: 'icons' },
  { id: 'rect-2', left: '76%', top: '17%', width: 'clamp(10rem, 20vmin, 15rem)', start: 0.51, end: 0.65, fromCenter: true, timing: 'icons' },
  { id: 'rect-3', left: '17%', top: '42%', width: 'clamp(8rem, 16vmin, 12rem)', start: 0.56, end: 0.69, fromCenter: true, timing: 'icons' },
  { id: 'rect-4', left: '81%', top: '43%', width: 'clamp(10.5rem, 21vmin, 16rem)', start: 0.61, end: 0.75, fromCenter: true, timing: 'icons' },
  // Os seis finais saem do centro: três para a esquerda e três para a direita,
  // ocupando zonas superior, central e inferior da viewport.
  { id: 'rect-5', left: '15%', top: '18%', width: 'clamp(9.5rem, 19vmin, 14rem)', start: 0.66, end: 0.79, fromCenter: true, timing: 'icons' },
  { id: 'rect-6', left: '83%', top: '25%', width: 'clamp(8.5rem, 17vmin, 13rem)', start: 0.71, end: 0.84, fromCenter: true, timing: 'icons' },
  { id: 'rect-7', left: '17%', top: '51%', width: 'clamp(8rem, 16vmin, 12rem)', start: 0.7, end: 0.86, fromCenter: true, timing: 'icons' },
  { id: 'rect-8', left: '80%', top: '48%', width: 'clamp(10rem, 20vmin, 15rem)', start: 0.76, end: 0.89, fromCenter: true, timing: 'icons' },
  { id: 'rect-9', left: '15%', top: '81%', width: 'clamp(8.5rem, 17vmin, 13rem)', start: 0.8, end: 0.93, fromCenter: true, timing: 'icons' },
  { id: 'rect-10', left: '85%', top: '78%', width: 'clamp(9rem, 18vmin, 14rem)', start: 0.82, end: 0.93, fromCenter: true, timing: 'icons' },
];

// Linha do tempo da transição. Estes valores são deliberadamente centralizados:
// qualquer ajuste de duração passa a ter um único ponto de referência.
const CLIP_TIMELINE_PORTION = 0.72;
const PROJECTS_TIMELINE_PORTION = 1 - CLIP_TIMELINE_PORTION;
const CLIP_COMPLETION_THRESHOLD = 0.995;
const clamp01 = (value) => Math.min(1, Math.max(0, value));

const getTimedProgress = (progress, start, end) => (
  clamp01((progress - start) / Math.max(0.001, end - start))
);

const getTransitionProgress = (clipProgress, projectsViewportProgress) => {
  if (clipProgress < CLIP_COMPLETION_THRESHOLD) {
    return clipProgress * CLIP_TIMELINE_PORTION;
  }

  return CLIP_TIMELINE_PORTION + projectsViewportProgress * PROJECTS_TIMELINE_PORTION;
};

const getPortalState = (clipProgress) => {
  const progress = clamp01((clipProgress - 0.1) / 0.86);
  const opacity = clamp01(progress / 0.16) * clamp01((1 - progress) / 0.1);

  return { progress, opacity };
};

const getElementVisibility = (progress) => (
  clamp01(progress / 0.14) * clamp01((1 - progress) / 0.08)
);

function ProjectsSpatialIntro({ progressVariable = '--projects-spatial-progress' }) {
  const layerRef = useRef(null);
  const portalRef = useRef(null);
  const frameRefs = useRef([]);
  const lensRef = useRef(null);
  const rectangleRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    if (!items.length) return undefined;

    let frameId = null;

    const updateItems = () => {
      const clipProgress = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(progressVariable),
      ) || 0;
      const progress = clipProgress;
      const layerOpacity = getElementVisibility(progress);
      const { progress: portalProgress, opacity: portalOpacity } = getPortalState(clipProgress);

      if (layerRef.current) {
        gsap.set(layerRef.current, {
          autoAlpha: progress > 0.01 && progress < 0.995 ? layerOpacity : 0,
        });
      }

      if (portalRef.current) {
        const portalWidth = Math.max(72, window.innerWidth * (1 - portalProgress * 0.94));
        const portalHeight = Math.max(64, window.innerHeight * (1 - portalProgress * 0.9));

        gsap.set(portalRef.current, {
          autoAlpha: clipProgress > 0.11 && clipProgress < 0.985 ? portalOpacity : 0,
          width: portalWidth,
          height: portalHeight,
          scaleX: 1,
          scaleY: 1,
        });
      }

      frameRefs.current.forEach((frame, index) => {
        if (!frame) return;
        const delay = [0.02, 0.13, 0.24][index] || 0;
        const frameProgress = getTimedProgress(portalProgress, delay, 1);
        const frameWidth = Math.max(72, window.innerWidth * (1 - frameProgress * 0.94));
        const frameHeight = Math.max(64, window.innerHeight * (1 - frameProgress * 0.9));
        const frameOpacity = portalOpacity * clamp01(frameProgress / 0.12);

        gsap.set(frame, {
          autoAlpha: clipProgress > delay + 0.11 && clipProgress < 0.985 ? frameOpacity : 0,
          width: frameWidth,
          height: frameHeight,
          scaleX: 1,
          scaleY: 1,
        });
      });

      if (lensRef.current) {
        gsap.set(lensRef.current, {
          autoAlpha: clipProgress > 0.12 && clipProgress < 0.985 ? portalOpacity : 0,
          '--lens-strength': portalProgress.toFixed(3),
        });
      }

      rectangleRefs.current.forEach((rectangle, index) => {
        if (!rectangle) return;
        const { start, end, left, top, fromCenter, timing } = transitionRectangles[index];
        const animationProgress = timing === 'icons' ? progress : clipProgress;
        const rawProgress = getTimedProgress(animationProgress, start, end);
        const distanceFromMiddle = Math.abs(rawProgress - 0.5) * 2;
        const opacity = (1 - distanceFromMiddle) * layerOpacity;
        const blur = distanceFromMiddle * 5;
        const targetLeft = Number.parseFloat(left);
        const targetTop = Number.parseFloat(top);
        const startX = fromCenter ? (50 - targetLeft) * window.innerWidth / 100 : 0;
        const startY = fromCenter ? (50 - targetTop) * window.innerHeight / 100 : 0;
        const sizeMultiplier = window.innerWidth < 1024 ? 0.7 : 1;

        gsap.set(rectangle, {
          autoAlpha: opacity,
          xPercent: -50,
          yPercent: -50,
          x: gsap.utils.interpolate(startX, 0, rawProgress),
          scale: gsap.utils.interpolate(0.84, 1.89, rawProgress) * sizeMultiplier,
          y: gsap.utils.interpolate(startY + 20, -18, rawProgress),
          rotate: gsap.utils.interpolate(index % 2 ? 4 : -4, index % 2 ? -3 : 3, rawProgress),
          filter: `blur(${blur}px)`,
        });
      });

      items.forEach((item, index) => {
        const [start, end] = ranges[index] || [0, 1];
        const rawProgress = getTimedProgress(progress, start, end);
        const midDistance = Math.abs(rawProgress - 0.5) * 2;
        const opacity = (1 - midDistance) * layerOpacity;
        const blur = midDistance * 5;
        const z = gsap.utils.interpolate(-1000, 1000, rawProgress);

        gsap.set(item, {
          z,
          opacity,
          filter: `blur(${blur}px)`,
        });
      });
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateItems();
      });
    };

    gsap.set(items, {
      opacity: 0,
      z: -1000,
      filter: 'blur(5px)',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });

    if (layerRef.current) {
      gsap.set(layerRef.current, { autoAlpha: 0 });
    }

    window.addEventListener('projects-spatial-progress', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('projects-spatial-progress', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-0"
    >
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {transitionRectangles.map((rectangle, index) => (
          <div
            key={rectangle.id}
            ref={(element) => { rectangleRefs.current[index] = element; }}
            className="projects-transition-rectangle absolute opacity-0"
            style={{ left: rectangle.left, top: rectangle.top, width: rectangle.width }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 grid h-dvh grid-cols-4 grid-rows-4 place-items-center overflow-hidden [perspective:1000px] [transform-style:preserve-3d]">
        {gridItems.map((item, index) => {
          const isSpecial = item.featured;
          const gridPosition = isSpecial ? 'col-start-2 col-span-2 row-start-2 row-span-2' : '';

          return (
            <div
              key={item.id}
              ref={(element) => { itemRefs.current[index] = element; }}
              className={`relative flex items-center justify-center whitespace-nowrap text-center font-display font-light text-slate-800 opacity-0 will-change-[transform,opacity,filter] [transform-style:preserve-3d] dark:text-white ${gridPosition}`}
            >
              {isSpecial ? (
                <span className="relative z-10 flex h-[18vmin] w-[18vmin] items-center justify-center [&>span]:!h-full [&>span]:!w-full [&_img]:!h-full [&_img]:!w-full [&_svg]:!h-full [&_svg]:!w-full">
                  {item.icon}
                </span>
              ) : (
                <span className="relative z-10 flex h-[9vmin] w-[9vmin] items-center justify-center [&>span]:!h-full [&>span]:!w-full [&_img]:!h-full [&_img]:!w-full [&_svg]:!h-full [&_svg]:!w-full">
                  {item.icon}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsSpatialIntro;
