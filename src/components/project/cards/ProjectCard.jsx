import { FaExternalLinkAlt } from "react-icons/fa";

import ContextBadge from "../badges/ContextBadge";
import TypeBadges from "../badges/TypeBadges";
import { techIcons } from "../config/techIcons";

////////////////////////////////////////
// Card inicial
////////////////////////////////////////
const ProjectCard = ({ project, onClick, isMobileFocused = null }) => {
    const mobileFocusClass = isMobileFocused === null
        ? ""
        : isMobileFocused
            ? "max-md:scale-[1.01] max-md:ring-1 max-md:ring-cyan-300/40"
            : "";

    return (
        <button
            type="button"
            onClick={() => onClick(project)}
            className={`
                group relative h-64 sm:h-72
                w-full text-left
                rounded-2xl overflow-hidden
                border border-white/10 hover:border-cyan-300/60
                shadow-lg hover:shadow-xl dark:shadow-none
                dark:hover:shadow-[0_0_45px_rgba(34,211,238,0.28)]
                transition-all duration-300
                hover:-translate-y-1.5 hover:scale-[1.015]
                cursor-pointer
                ${mobileFocusClass}
            `}
        >
            <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 dark:group-hover:from-black/80 group-hover:via-cyan-950/40 transition-all duration-700 ease-out"></div>

            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <div className="-m-3 flex translate-y-0 flex-col gap-2 rounded-2xl bg-black/25 p-2 backdrop-blur-[2px] transition-all duration-500 group-hover:-translate-y-1">
                    <div className="flex w-full items-center gap-1 sm:gap-2">
                        <div className="flex w-[30%] shrink-0 justify-start sm:w-[28%]">
                            <ContextBadge context={project.context} />
                        </div>

                        <div className="flex min-h-[36px] min-w-0 flex-1 items-center">
                            <TypeBadges project={project} limit={3} variant="card" />
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-black tracking-tight text-white transition-all duration-500 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.45)] dark:group-hover:text-cyan-300">
                            {project.title}
                        </h3>

                        <span className="shrink-0 rotate-[-10deg] scale-75 rounded-full bg-white/10 p-2 opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100">
                            <FaExternalLinkAlt className="text-white" />
                        </span>
                    </div>

                    <p className="line-clamp-2 mt-0 text-sm leading-relaxed text-slate-200 opacity-80 transition-all duration-500 group-hover:text-white group-hover:opacity-100 dark:text-slate-300">
                        {project.description}
                    </p>
                </div>

                <div className="-m-3 translate-y-0 rounded-2xl bg-black/25 p-2 backdrop-blur-[2px] transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:bg-black/40">
                    <div className="flex flex-wrap gap-2">
                        {(project.tech || []).slice(0, 4).map((t, i) => (
                            <span
                                key={i}
                                title={t}
                                className="flex items-center justify-center rounded-xl border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/30 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                            >
                                <span className="text-sm [&_img]:h-4 [&_img]:w-4 [&_svg]:h-4 [&_svg]:w-4">
                                    {techIcons?.[t] || (
                                        <span className="text-[10px] leading-none">
                                            {t}
                                        </span>
                                    )}
                                </span>
                            </span>
                        ))}

                        {(project.tech || []).length > 4 && (
                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-2 text-xs font-bold leading-none text-slate-300">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 pointer-events-none"></div>
        </button>
    );
};

export default ProjectCard;
