import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectBottomNavigation = ({
  current,
  total,
  projectIndexes,
  onPrev,
  onNext,
  onSelect,
}) => {
  return (
    <div
      className="
        absolute
        left-1/2
        bottom-4
        z-40
        w-[min(90vw,560px)]
        -translate-x-1/2
        text-white
      "
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="
          mb-0
          flex items-center justify-center gap-3
          text-xs font-semibold
          md:hidden
        "
      >
        <button
          type="button"
          onClick={onPrev}
          className="
            inline-flex items-center gap-2
            px-1 py-1
            text-white/90
            transition-colors duration-300
            hover:text-cyan-100
            active:text-cyan-200
          "
        >
          <FaChevronLeft className="text-[10px]" />
          <span>Anterior</span>
        </button>

        <span className="text-white/35">|</span>

        <button
          type="button"
          onClick={onNext}
          className="
            inline-flex items-center gap-2
            px-1 py-1
            text-white/90
            transition-colors duration-300
            hover:text-cyan-100
            active:text-cyan-200
          "
        >
          <span>Proximo</span>
          <FaChevronRight className="text-[10px]" />
        </button>
      </div>

      <div
        className="
          -mt-2
          flex items-center justify-center gap-3
          overflow-x-auto          
          px-2 pb-0 
          text-xs font-bold
          tabular-nums
          scrollbar-thin
          scrollbar-thumb-white/20
          scrollbar-track-transparent
          md:text-sm
          md:-translate-y-5
        "
        aria-label="Ir para projeto especifico"
      >
        {projectIndexes.map((item, index) => {
          const isActive = item.label === current;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Ir para projeto ${item.label} de ${total}`}
              aria-current={isActive ? "true" : undefined}
              className={`
                min-w-4
                px-0.5 py-4
                transition-all duration-300
                active:scale-95
                ${
                  isActive
                    ? "text-cyan-100 underline decoration-cyan-200 underline-offset-4"
                    : "text-white/70 hover:text-white"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectBottomNavigation;
