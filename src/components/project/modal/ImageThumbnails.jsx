const ImageThumbnails = ({
  images,
  projectTitle,
  currentImage,
  setCurrentImage,
  variant = "modal",
}) => {
  if (images.length <= 1) return null;

  const wrapperClass =
    variant === "fullscreen"
      ? "mt-1 flex gap-2 overflow-x-auto max-w-[90vw] pb-1"
      : "absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-full max-w-[90%] flex justify-center";

  return (
    <div className={wrapperClass}>
      <div
        className="
          flex flex-nowrap gap-2 overflow-x-auto overflow-y-visible
          w-fit max-w-full py-1 pb-2 px-1
          scrollbar-thin md:scrollbar-none
          scrollbar-thumb-cyan-500/30 scrollbar-track-transparent
        "
      >
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
  );
};

export default ImageThumbnails;
