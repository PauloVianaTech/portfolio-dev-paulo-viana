import ContextBadge from "../badges/ContextBadge";
import TypeBadges from "../badges/TypeBadges";
import ProjectActionButtons from "./ProjectActionButtons";
import ProjectTechList from "./ProjectTechList";

const ProjectInfoPanel = ({ project }) => {
  return (
    <div
      className="
        relative
        w-full md:w-1/2
        min-h-0
        overflow-hidden
        [--folder-top:clamp(72px,16%,96px)]
        bg-[#0A1022]
        border-l border-white/10
        rounded-b-[28px]
        md:rounded-bl-none
        md:rounded-r-[28px]
      "
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-0 left-0 right-0
            h-[30%]
            rounded-t-[28px]
            bg-gradient-to-br
            from-[#263241]
            via-[#1B2533]
            to-[#111827]
            border-b border-[#31475A]/40
            shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]
          "
        />

        <div
          className="
            absolute
            left-0 right-0 bottom-0
            top-[var(--folder-top)]
            rounded-b-[28px]
            md:rounded-bl-none
            bg-gradient-to-b
            from-[#0A1426]
            via-[#07101F]
            to-[#040814]
            border-t border-[#1F4B5F]/70
            border-b border-[#050A16]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
          "
        />
      </div>

      <div
        className="
          absolute
          z-30
          right-0
          top-[-0.25em]
          h-[calc(var(--folder-top)+0.25em)]
          w-[70%]
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            right-0
            bottom-0
            w-full
            h-auto
            max-h-[64px]
            overflow-y-auto
            overscroll-contain
            flex
            items-start
            rounded-tr-[28px]
            rounded-tl-[28px]
            bg-gradient-to-br
            from-[#12324A]
            via-[#0B253A]
            to-[#071827]
            border border-[#2C5D73]/70
            ring-1 ring-white/5
            shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_18px_rgba(0,0,0,0.22)]
            px-3 py-2
            pr-2
            scrollbar-thin
            scrollbar-thumb-cyan-500/30
            scrollbar-track-transparent
            touch-pan-y
            pointer-events-auto
            [-webkit-overflow-scrolling:touch]
          "
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <TypeBadges project={project} />
        </div>
      </div>

      <div
        className="
          absolute
          z-20
          top-0 left-0
          w-[30%]
          h-[var(--folder-top)]
          rounded-tr-[28px]
          overflow-hidden
        "
      >
        <ContextBadge context={project.context} variant="modal" />
      </div>

      <div
        className="
          relative
          z-10
          flex flex-col
          min-h-0
          px-4 sm:px-5 md:px-6
          pb-4 sm:pb-5 md:pb-6
          pt-[calc(var(--folder-top)+16px)]
        "
      >
        <h2
          className="
            text-2xl sm:text-3xl md:text-[2rem]
            font-black tracking-tight
            dark:text-white text-slate-900
            mt-0
            mb-2
            leading-tight
            shrink-0
          "
        >
          {project.title}
        </h2>

        <p
          className="
            dark:text-slate-300 text-slate-600
            leading-6 md:leading-7
            text-base sm:text-lg md:text-lg
            max-h-[144px] md:max-h-[184px]
            overflow-y-auto
            overscroll-contain
            touch-pan-y
            [-webkit-overflow-scrolling:touch]
            pr-2
            mb-0
            scrollbar-thin
            scrollbar-thumb-cyan-500/30
            scrollbar-track-transparent
          "
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          {project.description}
        </p>

        <div className="h-3 md:h-4 shrink-0" />

        <ProjectTechList tech={project.tech} />

        <ProjectActionButtons buttons={project.buttons} />
      </div>
    </div>
  );
};

export default ProjectInfoPanel;
