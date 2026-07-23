const ImageCaption = ({ currentImage, caption, variant = "modal" }) => {
  if (!caption) return null;

  const className =
    variant === "fullscreen"
      ? "mt-2 max-w-[90vw] rounded-xl bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 text-white text-xs md:text-sm shadow-lg text-center"
      : "absolute left-4 bottom-16 md:bottom-20 z-20 max-w-[85%] rounded-xl bg-black/55 backdrop-blur-md border border-white/10 px-2 py-1 text-white text-xs md:text-sm shadow-lg";

  return (
    <div className={className}>
      <span className="font-bold">{currentImage + 1}</span>
      <span> - {caption}</span>
    </div>
  );
};

export default ImageCaption;
