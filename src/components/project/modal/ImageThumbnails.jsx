import { useRef } from "react";

const ImageThumbnails = ({
  images,
  projectTitle,
  currentImage,
  setCurrentImage,
  variant = "modal",
  leadingLabel,
}) => {
  const dragStateRef = useRef(null);

  if (images.length <= 1) return null;

  const beginMouseDrag = (event) => {
    if (event.pointerType !== "mouse") return;

    dragStateRef.current = {
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
  };

  const moveMouseDrag = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || event.pointerType !== "mouse") return;

    event.currentTarget.scrollLeft = dragState.startScrollLeft - (event.clientX - dragState.startX);
  };

  const endMouseDrag = (event) => {
    dragStateRef.current = null;
  };

  const wrapperClass =
    variant === "fullscreen" || variant === "carousel"
      ? "mt-1 w-[90vw] max-w-[90vw]"
      : "absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-full max-w-[90%] flex justify-center";

  return (
    <div className={wrapperClass}>
      <div
        className="
          image-thumbnails-scroll flex w-full flex-nowrap gap-2 overflow-x-auto overflow-y-visible
          py-1 pb-2 px-1 touch-pan-x overscroll-x-contain cursor-grab select-none active:cursor-grabbing
          scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent
        "
        onWheel={(event) => {
          if (event.deltaY && !event.deltaX) {
            event.currentTarget.scrollLeft += event.deltaY;
            event.preventDefault();
          }
          event.stopPropagation();
        }}
        onTouchMove={(event) => event.stopPropagation()}
        onPointerDown={beginMouseDrag}
        onPointerMove={moveMouseDrag}
        onPointerUp={endMouseDrag}
        onPointerCancel={endMouseDrag}
      >
        <div className={`flex w-max min-w-full shrink-0 flex-nowrap gap-2 ${variant === "fullscreen" || variant === "carousel" ? "justify-center" : ""}`}>
          {leadingLabel && (
            <span className="flex h-10 shrink-0 items-center text-[10px] font-semibold tabular-nums text-cyan-100/80 md:h-11">
              {leadingLabel}
            </span>
          )}

          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              className={`w-14 h-10 md:w-16 md:h-11 shrink-0 rounded-lg border transition-all duration-300 p-0.5 ${
                currentImage === index
                  ? "border-cyan-300 bg-cyan-400/25 shadow-[0_0_16px_rgba(34,211,238,0.7)] scale-[1.04]"
                  : "border-white/20 bg-black/20 opacity-70 hover:opacity-100 hover:border-cyan-300/40"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={img}
                  alt={`${projectTitle} preview ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 scale-100"
                />

                <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/10">
                  {index + 1}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageThumbnails;
