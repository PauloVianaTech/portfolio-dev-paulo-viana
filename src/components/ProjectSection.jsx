import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";

import { useNavbar } from "../contexts/NavbarContext";
import { projectsData } from "../data/projectsData";

import ProjectCard from "./project/cards/ProjectCard";
import ProjectDetailModal from "./project/modal/ProjectDetailModal";
import LineShadowText from "./project/ui/LineShadowText";

import "./project/styles/projectSection.css";

////////////////////////////////////////
// Sessão de projetos
////////////////////////////////////////
function ProjectSection() {
  const getInitialTab = () => {
    const hash = window.location.hash
      .replace("#", "")
      .toLowerCase();
    if (hash === "design") return "Design";
    if (hash === "trading") return "Trading";
    return "Development";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [previewProject, setPreviewProject] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();

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

  // Faz com que quando eu abra o modal na versão mobile e toque ou arraste para voltar,
  //   ele apenas feche o modal ao invés de voltar para a pag antes do portfólio
  useEffect(() => {

    const handlePopState = () => {
      if (previewProject) {
        setPreviewProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };

  }, [previewProject]);

  const tabs = [

    { id: 'Development', label: 'Development', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },

    { id: 'Design', label: 'Design', icon: <LuBadge className="text-[1.5em] mb-1" /> },

    { id: 'Trading', label: 'Trading Automation', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  const filteredProjects = projectsData.filter((project) => {
    return project.category === activeTab;
  });

  return (
    <section id="project" className="pt-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="font-bold font-moderniz leading-none">

          <span className="
            block
            text-xl md:text-2xl
            tracking-[0.25em]
            uppercase
            dark:text-[#00ffdc]
            text-cyan-600
          ">
            <LineShadowText shadowColor="#00b3a4">
              PORTFOLIO
            </LineShadowText>
          </span>

          <span className="
            block
            mt-1
            text-4xl md:text-6xl
            dark:text-white
            text-slate-800
          ">
            <LineShadowText shadowColor="#bbbbbb">
              Selected Work
            </LineShadowText>
          </span>

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
              <motion.a
                key={tab.id}
                href={`#${tab.id.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
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
              </motion.a>
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

              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((p, i) => (
                      <ProjectCard
                        key={p.id || i}
                        project={p}
                        onClick={(project) => {
                          window.history.pushState(
                            { modal: true },
                            ""
                          );

                          setPreviewProject(project);
                        }}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-slate-400 py-12">
                      Nenhum projeto encontrado.
                    </div>
                  )}

                </div>
              </>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>

        {/* Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            projects={filteredProjects}
            onProjectChange={setPreviewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;
