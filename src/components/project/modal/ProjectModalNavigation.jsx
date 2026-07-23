import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectModalNavigation = ({ direction, onClick, className = "" }) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? FaChevronLeft : FaChevronRight;
  const sizes = isPrev
    ? ["text-2xl", "text-lg", "text-sm"]
    : ["text-sm", "text-lg", "text-2xl"];

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Projeto anterior" : "Proximo projeto"}
      className={`
        absolute
        top-1/2 -translate-y-1/2
        z-40
        min-h-20 w-20
        flex-col items-center justify-center
        gap-1.5
        text-white
        opacity-75
        drop-shadow-[0_0_16px_rgba(0,0,0,0.7)]
        transition-all duration-300
        hover:opacity-100
        hover:text-cyan-100
        hover:scale-110
        active:scale-95
        ${className}
      `}
    >
      <span className="flex items-center justify-center -space-x-2">
        {sizes.map((size, index) => (
          <Icon
            key={`${direction}-${size}-${index}`}
            className={`${size} shrink-0`}
          />
        ))}
      </span>

      <span className="text-[10px] font-black uppercase tracking-[0.18em]">
        {isPrev ? "Anterior" : "Proximo"}
      </span>
    </button>
  );
};

export default ProjectModalNavigation;
