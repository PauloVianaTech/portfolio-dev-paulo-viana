import {
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaFileAlt,
  FaFigma,
  FaChartLine,
  FaBookOpen,
  FaDownload,
} from "react-icons/fa";

export const buttonIcons = {
  demo: (
    <FaExternalLinkAlt className="
      text-xl md:text-2xl
      drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]
      shrink-0
    " />
  ),

  github: (
    <FaGithub className="
      text-2xl md:text-2xl
      text-cyan-100
      drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
      shrink-0
    " />
  ),

  figma: (
    <FaFigma className="
      text-xl md:text-2xl
      text-pink-200
      drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]
      shrink-0
    " />
  ),

  video: (
    <FaPlay className="
      text-lg md:text-xl
      text-red-200
      drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]
      shrink-0
    " />
  ),

  docs: (
    <FaFileAlt className="
      text-lg md:text-xl
      text-emerald-200
      drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]
      shrink-0
    " />
  ),

  strategy: (
    <FaChartLine className="
      text-lg md:text-xl
      text-orange-200
      drop-shadow-[0_0_12px_rgba(251,146,60,0.7)]
      shrink-0
    " />
  ),

  article: (
    <FaBookOpen className="
      text-lg md:text-xl
      text-violet-200
      drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]
      shrink-0
    " />
  ),

  download: (
    <FaDownload className="
      text-lg md:text-xl
      text-cyan-100
      drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
      shrink-0
    " />
  ),

};

export const buttonStyles = {
  primary: `
    relative overflow-hidden

    flex items-center justify-center
    gap-3

    px-6 py-4
    rounded-2xl

    font-bold
    text-white
    text-lg md:text-xl

    whitespace-nowrap

    bg-gradient-to-r
    from-cyan-400
    via-blue-500
    to-emerald-400

    bg-[length:250%_250%]
    animate-primaryFlow

    shadow-[0_0_25px_rgba(34,211,238,0.30)]

    hover:shadow-[0_0_40px_rgba(34,211,238,0.50)]

    transition-all duration-500

    hover:scale-[1.03]
    active:scale-[0.98]

    before:absolute
    before:inset-0
    before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)]
    before:translate-x-[-120%]

    hover:before:translate-x-[120%]

    before:transition-transform
    before:duration-1000
  `,

  secondary: `
    relative overflow-hidden

    flex items-center justify-center
    gap-2 md:gap-3

    px-5 md:px-6
    py-4

    rounded-2xl

    font-bold
    text-white
    text-lg md:text-xl

    whitespace-nowrap

    border border-white/20

    bg-gradient-to-br
    from-white/10
    via-cyan-400/15
    to-blue-500/15

    backdrop-blur-xl

    bg-[length:250%_250%]
    animate-holographic

    shadow-[0_0_25px_rgba(34,211,238,0.18)]

    hover:shadow-[0_0_35px_rgba(34,211,238,0.28)]

    hover:border-cyan-300/40

    transition-all duration-500

    hover:scale-[1.03]
    active:scale-[0.98]

    before:absolute
    before:inset-0
    before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)]

    before:translate-x-[-120%]

    hover:before:translate-x-[120%]

    before:transition-transform
    before:duration-1000
  `,

};