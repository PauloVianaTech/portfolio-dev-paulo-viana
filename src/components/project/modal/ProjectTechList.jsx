import { techIcons } from "../config/techIcons";

const ProjectTechList = ({ tech = [] }) => {
  if (!tech.length) return null;

  return (
    <div
      className="
        flex flex-wrap gap-2
        max-h-[80px] md:max-h-[96px]
        overflow-y-auto
        overscroll-contain
        touch-pan-y
        [-webkit-overflow-scrolling:touch]
        pr-2
        scrollbar-thin
        scrollbar-thumb-cyan-500/30
        scrollbar-track-transparent
      "
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      {tech.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="
            flex items-center gap-1 md:gap-2
            text-[11px] md:text-xs
            font-medium
            px-2 md:px-3
            py-1 md:py-1.5
            rounded-xl
            dark:bg-slate-800/80 bg-slate-100
            dark:text-white text-slate-800
            border dark:border-slate-700 border-slate-300
            transition-all duration-300
            hover:scale-105
          "
        >
          {techIcons?.[item] && (
            <span className="text-sm md:text-base [&_svg]:w-4 [&_svg]:h-4 md:[&_svg]:w-5 md:[&_svg]:h-5 [&_img]:w-4 [&_img]:h-4 md:[&_img]:w-5 md:[&_img]:h-5">
              {techIcons?.[item]}
            </span>
          )}

          <span>{item}</span>
        </span>
      ))}
    </div>
  );
};

export default ProjectTechList;
