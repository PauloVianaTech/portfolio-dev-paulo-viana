// COMPONENTE PRINCIPAL
// Controla a estrutura geral do portfólio.
// Aqui normalmente entram páginas, providers e estilos globais.

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { useTheme } from './contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function App() {
  const { theme } = useTheme();
  const location = useLocation();
  const isHomeRoute = location.pathname === '/' || location.pathname.startsWith('/projetos/');

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    let ticker;

    const destroyLenis = () => {
      if (!lenis) return;
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenis = undefined;
      ticker = undefined;
    };

    const syncScrollEngine = () => {
      destroyLenis();

      if (reducedMotionQuery.matches) return;

      const isDesktop = desktopQuery.matches;

      lenis = new Lenis({
        autoRaf: false,
        lerp: isDesktop ? 0.09 : 0.12,
        smoothWheel: isDesktop,
        syncTouch: !isDesktop,
        syncTouchLerp: 0.08,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
      });

      lenis.on('scroll', ScrollTrigger.update);
      ticker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const stopLenis = () => lenis?.stop();
    const startLenis = () => lenis?.start();
    const scrollLenisTo = (event) => {
      const top = Number(event.detail?.top);
      if (Number.isFinite(top)) {
        lenis?.scrollTo(top, { immediate: true, force: true });
      }
    };

    syncScrollEngine();
    desktopQuery.addEventListener('change', syncScrollEngine);
    reducedMotionQuery.addEventListener('change', syncScrollEngine);
    window.addEventListener('portfolio:lenis-stop', stopLenis);
    window.addEventListener('portfolio:lenis-start', startLenis);
    window.addEventListener('portfolio:lenis-scroll-to', scrollLenisTo);

    return () => {
      desktopQuery.removeEventListener('change', syncScrollEngine);
      reducedMotionQuery.removeEventListener('change', syncScrollEngine);
      window.removeEventListener('portfolio:lenis-stop', stopLenis);
      window.removeEventListener('portfolio:lenis-start', startLenis);
      window.removeEventListener('portfolio:lenis-scroll-to', scrollLenisTo);
      destroyLenis();
    };
  }, []);

  return (
    <NavbarProvider>
      <div className="relative min-h-dvh overflow-x-hidden dark:bg-[#060010] bg-slate-50 transition-colors duration-500">
        {/* Global Background Animation */}
        <div className="fixed inset-0 z-0">
          <Squares
            speed={0.2}
            squareSize={35}
            direction="diagonal"
            borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.05)"}
            hoverFillColor={theme === 'dark' ? "rgba(31, 137, 187, 0.53)" : "rgba(8, 145, 178, 0.1)"}
            gradientColorStart={theme === 'dark' ? "#000428" : "#f1f5f9"}
            gradientColorEnd={theme === 'dark' ? "#002545ff" : "#e2e8f0"}
          />
        </div>

        <Header />

        {/* Page Routing with Transitions */}
        <AnimatePresence mode="wait">
          {isHomeRoute ? (
            <Home key="home" />
          ) : (
            <Gallery key="gallery" />
          )}
        </AnimatePresence>

        {isHomeRoute && (
          <a
            href="#onde-me-encontrar"
            aria-label="Ir para Onde me encontrar"
            className="fixed bottom-[calc(env(safe-area-inset-bottom)+2.75rem)] right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-[#061a38]/90 text-cyan-50 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md transition-transform duration-300 active:scale-95 md:hidden"
          >
            <MessageCircle className="h-6 w-6 animate-pulse" />
          </a>
        )}

      </div>
    </NavbarProvider>
  );
}

export default App;
