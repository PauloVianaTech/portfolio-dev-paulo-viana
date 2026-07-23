import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryArrow = ({ direction, onClick, variant = "modal" }) => {
  const isLeft = direction === "left";
  const Icon = isLeft ? FaChevronLeft : FaChevronRight;

  const buttonPosition = isLeft ? "left-0" : "right-0";
  const iconPosition =
    variant === "fullscreen"
      ? isLeft
        ? "left-2 md:left-3"
        : "right-2 md:right-3"
      : isLeft
        ? "left-3"
        : "right-3";

  const opacity = variant === "fullscreen" ? "opacity-50" : "opacity-70";
  const width = variant === "fullscreen" ? "w-14 md:w-16" : "w-12 md:w-14";

  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? "Imagem anterior" : "Proxima imagem"}
      className={`
        absolute ${buttonPosition}
        top-1/2 -translate-y-1/2
        h-1/2
        ${width}
        z-20
        group
      `}
    >
      <div
        className={`
          absolute ${iconPosition}
          top-1/2 -translate-y-1/2
          bg-black/30 backdrop-blur-md
          border border-white/10
          text-white
          p-2 md:p-3
          rounded-xl
          ${opacity}
          group-hover:opacity-100
          group-hover:bg-black/55
          transition-all duration-300
        `}
      >
        <Icon className="text-lg md:text-xl" />
      </div>
    </button>
  );
};

export default GalleryArrow;
