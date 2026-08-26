import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaWordpress,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiVercel,
  SiMongodb,
  SiExpress,
  SiElementor,
  SiPostgresql,
  SiTypescript,
  SiSupabase,
  SiVite,
  SiOpenai,
  SiClaude,
  SiAnthropic,
  SiGooglegemini,
  SiPerplexity,
  SiOllama,
  SiSuno,
  SiFramer,
  SiNestjs,
} from "react-icons/si";

import affinityIcon from "../assets/tech-icons/affinity.svg";
import afterEffectsIcon from "../assets/tech-icons/after-Effects.svg";
import blackArrowNelogicaIcon from "../assets/tech-icons/blackarrow-nelogica.svg";
import canvaIcon from "../assets/tech-icons/canva.svg";
import capcutIcon from "../assets/tech-icons/capcut.svg";
import davinciResolveIcon from "../assets/tech-icons/davinci-resolve.svg";
import illustratorIcon from "../assets/tech-icons/illustrator.svg";
import indesignIcon from "../assets/tech-icons/indesign.svg";
import metatrader5Icon from "../assets/tech-icons/metatrader5.svg";
import mql5Icon from "../assets/tech-icons/mql5.svg";
import nelogicaIcon from "../assets/tech-icons/nelogica.svg";
import obsStudioIcon from "../assets/tech-icons/obs-studio.svg";
import photoshopIcon from "../assets/tech-icons/photoshop.svg";
import premiereIcon from "../assets/tech-icons/premiere.svg";
import profitProNelogicaIcon from "../assets/tech-icons/profit-pro-nelogica.svg";
import cursorIcon from "simple-icons/icons/cursor.svg";
import deepseekIcon from "simple-icons/icons/deepseek.svg";
import kimiIcon from "simple-icons/icons/kimi.svg";

const SvgTechIcon = ({ src }) => (
  <span className="inline-flex h-[1em] w-[1em] shrink-0 items-center justify-center align-[-0.125em]">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="block h-[0.95em] w-[0.95em] object-contain"
    />
  </span>
);

// Duas cópias recortadas preservam as cores azul/amarela do símbolo do Python
// sem depender de CSS mask externo, que pode falhar em alguns navegadores.
const PythonIcon = () => (
  <span className="relative inline-block h-[1em] w-[1em] shrink-0 overflow-hidden align-[-0.125em]" aria-hidden="true">
    <FaPython className="absolute inset-0 h-full w-full text-[#3776AB]" />
    <span className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(42% 0, 100% 0, 100% 100%, 58% 100%)" }}>
      <FaPython className="absolute inset-0 h-full w-full text-[#FFD43B]" />
    </span>
  </span>
);

// O catálogo vetorial instalado ainda não inclui as marcas de Runway e Lovable.
const BrandMonogram = ({ label, className = "" }) => (
  <span className={`inline-flex h-[1em] w-[1em] items-center justify-center rounded-[0.22em] border border-current text-[0.58em] font-black leading-none ${className}`}>
    {label}
  </span>
);

const developmentTechIcons = {
  HTML5: <FaHtml5 className="text-base text-[#E34F26]" />,
  HTML: <FaHtml5 className="text-base text-[#E34F26]" />,

  CSS3: <FaCss3Alt className="text-base text-[#1572B6]" />,
  CSS: <FaCss3Alt className="text-base text-[#1572B6]" />,

  JavaScript: <FaJsSquare className="text-base text-[#F7DF1E]" />,
  TypeScript: <SiTypescript className="text-base text-[#3178C6]" />,

  React: <FaReact className="text-base text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="text-base text-white" />,

  TailwindCSS: <SiTailwindcss className="text-base text-[#06B6D4]" />,
  "Tailwind CSS": <SiTailwindcss className="text-base text-[#06B6D4]" />,

  "Node.js": <FaNodeJs className="text-base text-[#5FA04E]" />,
  Node: <FaNodeJs className="text-base text-[#5FA04E]" />,
  NestJS: <SiNestjs className="text-base text-[#E0234E]" />,
  "Nest.js": <SiNestjs className="text-base text-[#E0234E]" />,

  Express: <SiExpress className="text-base text-gray-300" />,
  MongoDB: <SiMongodb className="text-base text-[#47A248]" />,
  PostgreSQL: <SiPostgresql className="text-base text-[#4169E1]" />,
  Supabase: <SiSupabase className="text-base text-[#3FCF8E]" />,
  Vite: <SiVite className="text-base text-[#646CFF]" />,

  "Git & GitHub": <FaGitAlt className="text-base text-[#F05032]" />,
  GitHub: <FaGithub className="text-base text-[#181717] dark:text-[#F0F6FC]" />,
  Git: <FaGitAlt className="text-base text-[#F05032]" />,

  Vercel: <SiVercel className="text-base text-[#181717] dark:text-white" />,
  Python: <PythonIcon />,
  WordPress: <FaWordpress className="text-base text-[#21759B]" />,
  Elementor: <SiElementor className="text-base text-[#92003B]" />,
};

const AItechIcons = {
  OpenAI: <SiOpenai className="text-base text-[#181717] dark:text-white" />,
  ChatGPT: <SiOpenai className="text-base text-[#181717] dark:text-white" />,
  Codex: <SiOpenai className="text-base text-[#181717] dark:text-white" />,
  "OpenAI Codex": <SiOpenai className="text-base text-[#181717] dark:text-white" />,

  Claude: <SiClaude className="text-base text-[#D97757]" />,
  Anthropic: <SiAnthropic className="text-base text-[#181717] dark:text-white" />,

  Gemini: <SiGooglegemini className="text-base text-sky-300" />,
  Perplexity: <SiPerplexity className="text-base text-cyan-300" />,

  Ollama: <SiOllama className="text-base text-slate-100" />,
  DeepSeek: <SvgTechIcon src={deepseekIcon} />,
  Kimi: <SvgTechIcon src={kimiIcon} />,
  Suno: <SiSuno className="text-base text-rose-300" />,
  Runway: <BrandMonogram label="R" className="text-pink-300" />,
  Cursor: <SvgTechIcon src={cursorIcon} />,
  Lovable: <BrandMonogram label="L" className="text-fuchsia-300" />,
  Framer: <SiFramer className="text-base text-[#0055FF]" />,
};

const designTechIcons = {
  Figma: <FaFigma className="text-base text-pink-400" />,

  Affinity: <SvgTechIcon src={affinityIcon} />,
  affinity: <SvgTechIcon src={affinityIcon} />,

  "After Effects": <SvgTechIcon src={afterEffectsIcon} />,
  "after-Effects": <SvgTechIcon src={afterEffectsIcon} />,

  Canva: <SvgTechIcon src={canvaIcon} />,
  canva: <SvgTechIcon src={canvaIcon} />,

  CapCut: <SvgTechIcon src={capcutIcon} />,
  capcut: <SvgTechIcon src={capcutIcon} />,

  "DaVinci Resolve": <SvgTechIcon src={davinciResolveIcon} />,
  "davinci-resolve": <SvgTechIcon src={davinciResolveIcon} />,

  Illustrator: <SvgTechIcon src={illustratorIcon} />,
  illustrator: <SvgTechIcon src={illustratorIcon} />,

  InDesign: <SvgTechIcon src={indesignIcon} />,
  indesign: <SvgTechIcon src={indesignIcon} />,

  Photoshop: <SvgTechIcon src={photoshopIcon} />,
  photoshop: <SvgTechIcon src={photoshopIcon} />,

  Premiere: <SvgTechIcon src={premiereIcon} />,
  premiere: <SvgTechIcon src={premiereIcon} />,

  "Premiere Pro": <SvgTechIcon src={premiereIcon} />,

  "OBS Studio": <SvgTechIcon src={obsStudioIcon} />,
  "obs-studio": <SvgTechIcon src={obsStudioIcon} />,

  Branding: <span className="text-sm font-bold text-violet-400">Br</span>,
};

const tradingTechIcons = {
  Nelogica: <SvgTechIcon src={nelogicaIcon} />,
  nelogica: <SvgTechIcon src={nelogicaIcon} />,

  "Nelogica NTSL": <SvgTechIcon src={nelogicaIcon} />,
  NTSL: <SvgTechIcon src={nelogicaIcon} />,

  "Profit Pro": <SvgTechIcon src={profitProNelogicaIcon} />,
  "profit-pro-nelogica": <SvgTechIcon src={profitProNelogicaIcon} />,
  "Profit Pro Nelogica": <SvgTechIcon src={profitProNelogicaIcon} />,

  MQL5: <SvgTechIcon src={mql5Icon} />,
  mql5: <SvgTechIcon src={mql5Icon} />,

  "MetaTrader 5": <SvgTechIcon src={metatrader5Icon} />,
  metatrader5: <SvgTechIcon src={metatrader5Icon} />,
  MT5: <SvgTechIcon src={metatrader5Icon} />,

  BlackArrow: <SvgTechIcon src={blackArrowNelogicaIcon} />,
  "blackarrow-nelogica": <SvgTechIcon src={blackArrowNelogicaIcon} />,
  "BlackArrow Nelogica": <SvgTechIcon src={blackArrowNelogicaIcon} />,
};

export const techIcons = {
  ...developmentTechIcons,
  ...AItechIcons,
  ...designTechIcons,
  ...tradingTechIcons,
};
