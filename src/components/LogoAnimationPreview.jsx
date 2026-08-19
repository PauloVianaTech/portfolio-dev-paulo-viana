import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const pieceGroups = [
  [{ type: "polygon", points: "90.87 66.33 90.87 200.98 60.87 230.81 60.87 66.33 90.87 66.33" }],
  // Estas duas formas compõem uma única seta para cima no monograma.
  // Elas recebem o mesmo movimento e não se separam durante a animação.
  [
    { type: "path", d: "M135.87,21.33v105.89c-10.47,10.5-20.67,20.69-30,29.98V51.33l30-30Z" },
    { type: "path", d: "M135.87,21.33H29.98C19.48,31.8,9.29,42,0,51.33h105.87l30-30Z" },
  ],
  [
    { type: "path", d: "M175.88,51.33v35.67c-8.13,8.2-16.57,16.69-25.01,25.16V21.33h25v30Z" },
    { type: "path", d: "M261.92.13l-21.05,21.2s-16,16.22-38.46,38.9c-6.69,6.76-13.96,14.09-21.54,21.74-1.65,1.66-3.31,3.34-4.99,5.03v-35.67L220.74,6.48l6.48-6.48,34.7.13Z" },
  ],
];

const animationOptions = [
  {
    id: "technical",
    title: "01 — Montagem técnica",
    description: "As peças entram pelos eixos naturais do monograma e fecham com precisão.",
    initial: (index) => ([
      { opacity: 0, y: 50 }, { opacity: 0, y: 42 }, { opacity: 0, x: -60 },
      { opacity: 0, y: 38 }, { opacity: 0, x: 76 },
    ][index]),
    animate: { opacity: 1, x: 0, y: 0 },
    transition: (index) => ({ duration: 0.55, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }),
    glow: "from-cyan-300/0 via-cyan-200/45 to-cyan-300/0",
  },
  {
    id: "core",
    title: "02 — Núcleo expandido",
    description: "Todas as estruturas nascem do centro, expandindo como um símbolo sendo energizado.",
    initial: () => ({ opacity: 0, scale: 0.15, x: 4, y: 4 }),
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    transition: (index) => ({ type: "spring", stiffness: 210, damping: 18, delay: index * 0.08 }),
    glow: "from-violet-300/0 via-cyan-200/40 to-violet-300/0",
  },
  {
    id: "kinetic",
    title: "03 — Entrada cinética",
    description: "Cada peça atravessa a marca com velocidade e desacelera no encaixe final.",
    initial: (index) => ([
      { opacity: 0, y: 95, rotate: -4 }, { opacity: 0, y: -82, rotate: 4 }, { opacity: 0, x: -110 },
      { opacity: 0, y: 78, rotate: 5 }, { opacity: 0, x: 120, rotate: -5 },
    ][index]),
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    transition: (index) => ({ type: "spring", stiffness: 150, damping: 17, delay: 0.04 + index * 0.1 }),
    glow: "from-blue-300/0 via-cyan-100/50 to-blue-300/0",
  },
  {
    id: "scan",
    title: "04 — Varredura luminosa",
    description: "O símbolo se revela em ondas curtas, como uma leitura técnica passando pela superfície.",
    initial: (index) => ({ opacity: 0, x: -34, clipPath: "inset(0 100% 0 0)" }),
    animate: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
    transition: (index) => ({ duration: 0.42, delay: 0.08 + index * 0.1, ease: [0.65, 0, 0.35, 1] }),
    glow: "from-emerald-300/0 via-cyan-100/55 to-emerald-300/0",
  },
  {
    id: "impact",
    title: "05 — Impacto e assentamento",
    description: "O logo entra inteiro, ganha peso visual e estabiliza com um pulso final discreto.",
    initial: () => ({ opacity: 0, scale: 1.24, y: -12, filter: "blur(9px)" }),
    animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    transition: (index) => ({ duration: 0.64, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }),
    glow: "from-fuchsia-300/0 via-cyan-100/45 to-fuchsia-300/0",
  },
];

const LogoShape = ({ option, animationRun, reduceMotion }) => (
  <motion.svg
    key={animationRun}
    viewBox="0 0 261.92 230.81"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
    className="relative z-10 h-[76%] w-[76%] drop-shadow-[0_0_18px_rgba(103,232,249,0.2)]"
    role="img"
    aria-label={`Logo Paulo Viana — ${option.title}`}
  >
    {pieceGroups.map((group, index) => (
        <motion.g
          key={`${option.id}-${index}`}
          variants={{
            hidden: reduceMotion ? { opacity: 1 } : option.initial(index),
            visible: reduceMotion
              ? { opacity: 1 }
              : { ...option.animate, transition: option.transition(index) },
          }}
        >
          {group.map((piece, pieceIndex) => {
            const Component = piece.type === "polygon" ? "polygon" : "path";
            return <Component key={pieceIndex} {...piece} fill="currentColor" />;
          })}
        </motion.g>
    ))}
  </motion.svg>
);

const AnimationCard = ({ option, reduceMotion }) => {
  const [animationRun, setAnimationRun] = useState(0);

  return (
    <article className="flex min-h-[25rem] flex-col rounded-[1.75rem] border border-cyan-300/15 bg-slate-950/65 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm">
      <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-50">{option.title}</h3>
      <p className="mt-2 min-h-11 text-xs leading-relaxed text-slate-400">{option.description}</p>

      <div className="relative mt-5 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/45 md:h-56">
        <motion.div
          key={`glow-${animationRun}`}
          aria-hidden="true"
          className={`absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r ${option.glow} blur-2xl`}
          initial={{ x: -180, opacity: 0 }}
          whileInView={{ x: 310, opacity: [0, 0.65, 0] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.82, delay: reduceMotion ? 0 : 0.96, ease: "easeInOut" }}
        />
        <LogoShape option={option} animationRun={animationRun} reduceMotion={reduceMotion} />
      </div>

      <button
        type="button"
        onClick={() => setAnimationRun((run) => run + 1)}
        className="mt-5 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition-colors hover:border-cyan-200/65 hover:bg-cyan-300/20"
      >
        Reiniciar esta animação
      </button>
    </article>
  );
};

const LogoAnimationPreview = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28" aria-label="Prévia da animação do monograma PV">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.1),transparent_42%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/65">Prévia temporária</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">Cinco estudos para o monograma PV</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">Todos utilizam as cinco formas do novo SVG. Compare o ritmo, a origem e o peso de cada entrada.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {animationOptions.map((option) => (
            <AnimationCard key={option.id} option={option} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoAnimationPreview;
