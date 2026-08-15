// PÁGINA PRINCIPAL
// Junta todas as seções da landing page.

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaDownload, FaBriefcase, FaCube } from 'react-icons/fa';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact';
import AppliedStack from '../components/AppliedStack';
import ProjectsSpatialIntro from '../components/ProjectsSpatialIntro';
import { useTheme } from '../contexts/ThemeContext';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const Lanyard = lazy(() => import('../components/Lanyard/Lanyard'));

const Home = () => {
    const { theme } = useTheme();

    const [is3dEnabled, setIs3dEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 1024;
            return !isMobile && !isSmallScreen;
        }
        return true;
    });
    const [shouldLoadLanyard, setShouldLoadLanyard] = useState(false);

    useEffect(() => {
        if (!is3dEnabled) return undefined;

        const loadLanyard = () => setShouldLoadLanyard(true);
        const idleId = window.requestIdleCallback
            ? window.requestIdleCallback(loadLanyard, { timeout: 1800 })
            : window.setTimeout(loadLanyard, 900);

        return () => {
            if (window.cancelIdleCallback && window.requestIdleCallback) {
                window.cancelIdleCallback(idleId);
            } else {
                window.clearTimeout(idleId);
            }
        };
    }, [is3dEnabled]);

    const toggle3dAssets = () => {
        setIs3dEnabled(prev => !prev);
    };

    return (
        <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
        >
            <button
                onClick={toggle3dAssets}
                title={`Toggle 3D Assets (${is3dEnabled ? 'On' : 'Off'})`}
                className={`fixed top-24 right-4 z-50 hidden rounded-full border p-3 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 lg:block
          ${is3dEnabled
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_2px_#00ffdc80]'
                        : 'dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400 bg-white border-slate-200 text-slate-600 shadow-sm'
                    }`}
            >
                <FaCube className="h-5 w-5" />
            </button>

            <section id="home" className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-8 pt-20 pb-16 md:flex-row lg:pt-0 lg:pb-20">
                <div className="flex-1 dark:text-white text-slate-800 space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start">
                    <MotionDiv initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                        <AnimatedGradientTextDemo />
                    </MotionDiv>
                    <MotionH1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-3xl md:text-4xl font-display font-bold leading-tight select-none main-heading"
                        style={{
                            color: theme === 'dark' ? "#00ffdc" : "#0f172a",
                            textShadow: theme === 'dark'
                                ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc"
                                : "none"
                        }}
                    >
                        Paulo Viana
                        <span className="block mt-2 text-2xl md:text-3xl leading-tight">Desenvolvedor Full Stack</span>
                    </MotionH1>
                    <MotionDiv initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#40f2ffff", "#4079ff", "#40fffcff", "#4079ff", "#40f9ffff"]} animationSpeed={3} className="custom-class font-cascadia font-bold" />
                    </MotionDiv>
                    <MotionDiv initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                        <TextGenerateEffect words={'Desenvolvimento e automação para criar soluções digitais eficientes, intuitivas e bem construídas.'} />
                    </MotionDiv>
                    
                    <MotionDiv initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }} className="flex flex-row gap-4 mt-8">
                        <a href="https://github.com/PauloVianaTech" target="_blank" rel="noopener noreferrer" aria-label="Perfil no GitHub" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]">
                            <FaGithub className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                        </a>
                        <a href="https://www.instagram.com/paulovianatech" target="_blank" rel="noopener noreferrer" aria-label="Perfil no Instagram" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]">
                            <FaInstagram className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                        </a>
                        <a href="https://www.linkedin.com/in/paulo-camilo-viana" target="_blank" rel="noopener noreferrer" aria-label="Perfil no LinkedIn" className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-[0_0_24px_2px_#00ffdc]">
                            <FaLinkedin className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                        </a>
                    </MotionDiv>
                </div>

                {/* Render Lanyard conditionally */}
                <div className="hidden lg:flex flex-1 justify-center h-[600px] w-full order-first lg:order-none">
                    {is3dEnabled && shouldLoadLanyard && (
                        <Suspense fallback={<div className="h-full w-full" aria-hidden="true" />}>
                            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} fov={18} transparent={true} />
                        </Suspense>
                    )}
                </div>
            </section>

            <section
                id="about"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative" }}
            >
                <div data-micro-pin-content>
                <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
                        <VelocityScroll defaultVelocity={3} numRows={1} className="max-w-full">
                            <span className="font-display font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffdc" : "#0891b2", textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                SOBRE <span style={{ color: theme === 'dark' ? "#fff" : "#0891b2" }}>MIM</span>
                            </span>
                        </VelocityScroll>
                        <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${theme === 'dark' ? 'from-[#060010]' : 'from-slate-50'}`}></div>
                        <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l ${theme === 'dark' ? 'from-[#060010]' : 'from-slate-50'}`}></div>
                        <VelocityScroll defaultVelocity={-3} numRows={1} className="max-w-full">
                            <span className="font-display font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#00ffdc" : "#0891b2", textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: theme === 'dark' ? 'none' : 'none', opacity: theme === 'dark' ? 1 : 0.3 }}>
                                SOBRE <span style={{ color: theme === 'dark' ? "#fff" : "#0891b2" }}>MIM</span>
                            </span>
                        </VelocityScroll>
                    </div>
                    
                </MotionDiv>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="dark:text-white text-slate-800 text-center md:text-left px-4 md:px-8 transition-all duration-700 md:w-2/3"
                    >                        
                        <h3 className="text-4xl font-bold dark:text-white text-slate-900 my-2 font-display" style={{ textShadow: theme === 'dark' ? "2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc" : "none" }}>Paulo Viana</h3>
                        <p className="dark:text-white/80 text-slate-600 leading-relaxed mt-4 font-cascadia text-justify">
                            Desenvolvo interfaces, automações e soluções digitais unindo conhecimentos em tecnologia, design e inovação. Busco transformar ideias e problemas em experiências funcionais e intuitivas, explorando diferentes tecnologias para construir soluções cada vez melhores.
                        </p>
                        <div className="my-6 dark:bg-slate-900/50 bg-slate-50 border-l-4 dark:border-[#00ffdc] border-cyan-600 p-4 rounded-r-lg italic dark:text-white/70 text-slate-700 font-cascadia dark:shadow-none shadow-md">
                            "Entre código, criatividade e inovação, construo soluções."
                        </div>
                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder as="a" href="/cv.pdf" download duration={3000} borderRadius="0.75rem" className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]">
                                <FaDownload /> Baixar currículo
                            </ButtonMovingBorder>
                            <ButtonMovingBorder as="a" href="#projects" duration={3000} borderRadius="0.75rem" className="dark:bg-slate-900/[0.8] bg-white border dark:border-slate-800 border-slate-200 dark:text-white text-slate-800 font-semibold flex items-center justify-center gap-2 transition-all duration-300 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-[0_0_24px_8px_#40ffaa]">
                                <FaBriefcase /> Ver projetos
                            </ButtonMovingBorder>
                        </div>
                    </MotionDiv>
                </div>
                </div>
            </section>

            <AppliedStack />
            <ProjectsSpatialIntro progressVariable="--projects-spatial-progress" />

            <section
                id="projects"
                className="relative z-30 pb-18"
                style={{ marginTop: 'var(--projects-rise-offset, 0px)' }}
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-12 z-20 h-14 overflow-visible">
                    <div className="absolute left-1/2 top-1/2 h-[2.5px] w-2/3 max-w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#22d3ee_25%,#3b82f6_50%,#34d399_75%,transparent_100%)] bg-[length:250%_100%] animate-primaryFlow [clip-path:polygon(0_30%,50%_0,100%_30%,100%_70%,50%_100%,0_70%)]" />
                    <div className="absolute left-1/2 top-1/2 h-3 w-2/3 max-w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#22d3ee_25%,#3b82f6_50%,#34d399_75%,transparent_100%)] bg-[length:250%_100%] opacity-35 blur-md animate-primaryFlow [clip-path:polygon(0_30%,50%_0,100%_30%,100%_70%,50%_100%,0_70%)] dark:opacity-40" />
                </div>
                <ProjectSection />
            </section>

            <section id="contact" className="py-20 pb-16">
                <Contact />
            </section>

            <footer className="py-12 pb-16 text-center text-gray-400 dark:bg-gradient-to-t dark:from-slate-900/50 dark:to-transparent bg-gradient-to-t from-slate-100/50 to-transparent">
                <div className="text-sm">© {new Date().getFullYear()} Paulo Camilo da Silva Viana. Todos os direitos reservados.</div>
                <div className="text-xs mt-2">Desenvolvido com React, Tailwind CSS e Framer Motion.</div>
            </footer>
        </MotionDiv>
    );
};

export default Home;

