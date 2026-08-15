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

// O catálogo vetorial instalado ainda não inclui as marcas de Runway e Lovable.
const BrandMonogram = ({ label, className = "" }) => (
  <span className={`inline-flex h-[1em] w-[1em] items-center justify-center rounded-[0.22em] border border-current text-[0.58em] font-black leading-none ${className}`}>
    {label}
  </span>
);

const developmentTechIcons = {
  HTML5: <FaHtml5 className="text-base text-orange-500" />,
  HTML: <FaHtml5 className="text-base text-orange-500" />,

  CSS3: <FaCss3Alt className="text-base text-blue-500" />,
  CSS: <FaCss3Alt className="text-base text-blue-500" />,

  JavaScript: <FaJsSquare className="text-base text-yellow-400" />,
  TypeScript: <SiTypescript className="text-base text-blue-400" />,

  React: <FaReact className="text-base text-cyan-400" />,
  "Next.js": <SiNextdotjs className="text-base text-white" />,

  TailwindCSS: <SiTailwindcss className="text-base text-cyan-300" />,
  "Tailwind CSS": <SiTailwindcss className="text-base text-cyan-300" />,

  "Node.js": <FaNodeJs className="text-base text-green-500" />,
  Node: <FaNodeJs className="text-base text-green-500" />,

  Express: <SiExpress className="text-base text-gray-300" />,
  MongoDB: <SiMongodb className="text-base text-green-400" />,
  PostgreSQL: <SiPostgresql className="text-base text-sky-400" />,
  Supabase: <SiSupabase className="text-base text-emerald-400" />,
  Vite: <SiVite className="text-base text-violet-400" />,

  "Git & GitHub": <FaGitAlt className="text-base text-orange-500" />,
  GitHub: <FaGithub className="text-base text-white" />,
  Git: <FaGitAlt className="text-base text-orange-500" />,

  Vercel: <SiVercel className="text-base text-white" />,
  Python: <FaPython className="text-base text-yellow-300" />,
  WordPress: <FaWordpress className="text-base text-sky-300" />,
  Elementor: <SiElementor className="text-base text-pink-400" />,
};

const AItechIcons = {
  OpenAI: <SiOpenai className="text-base text-emerald-300" />,
  ChatGPT: <SiOpenai className="text-base text-emerald-200" />,

  Claude: <SiClaude className="text-base text-orange-300" />,
  Anthropic: <SiAnthropic className="text-base text-orange-200" />,

  Gemini: <SiGooglegemini className="text-base text-sky-300" />,
  Perplexity: <SiPerplexity className="text-base text-cyan-300" />,

  Ollama: <SiOllama className="text-base text-slate-100" />,
  DeepSeek: <SvgTechIcon src={deepseekIcon} />,
  Kimi: <SvgTechIcon src={kimiIcon} />,
  Suno: <SiSuno className="text-base text-rose-300" />,
  Runway: <BrandMonogram label="R" className="text-pink-300" />,
  Cursor: <SvgTechIcon src={cursorIcon} />,
  Lovable: <BrandMonogram label="L" className="text-fuchsia-300" />,
  Framer: <SiFramer className="text-base text-pink-300" />,
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
