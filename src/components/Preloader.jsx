import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const logoGroups = [
  [{ type: 'polygon', points: '90.87 66.33 90.87 200.98 60.87 230.81 60.87 66.33 90.87 66.33' }],
  [
    { type: 'path', d: 'M135.87,21.33v105.89c-10.47,10.5-20.67,20.69-30,29.98V51.33l30-30Z' },
    { type: 'path', d: 'M135.87,21.33H29.98C19.48,31.8,9.29,42,0,51.33h105.87l30-30Z' },
  ],
  [
    { type: 'path', d: 'M175.88,51.33v35.67c-8.13,8.2-16.57,16.69-25.01,25.16V21.33h25v30Z' },
    { type: 'path', d: 'M261.92.13l-21.05,21.2s-16,16.22-38.46,38.9c-6.69,6.76-13.96,14.09-21.54,21.74-1.65,1.66-3.31,3.34-4.99,5.03v-35.67L220.74,6.48l6.48-6.48,34.7.13Z' },
  ],
];

const particles = Array.from({ length: 120 }, (_, index) => {
  const angle = index * 2.399963229728653;
  const radius = 20 + ((index * 31) % 76);

  return {
    id: index,
    left: 50 + Math.cos(angle) * radius,
    top: 50 + Math.sin(angle) * radius,
    driftX: Math.cos(angle) * (18 + (index % 7) * 8),
    driftY: Math.sin(angle) * (16 + (index % 5) * 10),
    size: index % 9 === 0 ? 4 : index % 4 === 0 ? 2 : 1,
    delay: (index % 18) * 0.035,
    color: index % 2 === 0 ? 'bg-cyan-100' : 'bg-[#4079ff]',
  };
});

const logoOrigins = [
  { x: -48, y: 72, rotate: -3 },
  { x: -76, y: -52, rotate: 2 },
  { x: 46, y: 66, rotate: -2 },
  { x: 92, y: -40, rotate: 3 },
];

const Preloader = ({ onFinished }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 3900);
    const finishTimer = window.setTimeout(onFinished, 4450);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <motion.div
      animate={isExiting ? { opacity: 0, filter: 'blur(8px)' } : { opacity: 1 }}
      transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#060010] text-cyan-50"
      aria-label="Carregando portfólio"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_20%),radial-gradient(circle_at_50%_55%,rgba(64,121,255,0.14),transparent_62%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(125,211,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className={`absolute rounded-full ${particle.color} shadow-[0_0_12px_rgba(103,232,249,0.9)]`}
            style={{ width: particle.size, height: particle.size }}
            initial={{ opacity: 0, left: `${particle.left}%`, top: `${particle.top}%`, x: particle.driftX * 0.45, y: particle.driftY * 0.45, scale: 0.2 }}
            animate={{
              opacity: [0, particle.size > 2 ? 0.95 : 0.68, 0.12],
              left: [`${particle.left}%`, '50%'],
              top: [`${particle.top}%`, 'calc(50% - 2rem)'],
              x: [particle.driftX * 0.45, 0],
              y: [particle.driftY * 0.45, 0],
              scale: [0.2, particle.size > 2 ? 1.6 : 1, 0.35],
            }}
            transition={{ duration: 1.6, delay: particle.delay, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <div className="relative flex -translate-y-8 flex-col items-center">
        <div className="relative grid h-80 w-80 place-items-center sm:h-96 sm:w-96">
          <motion.svg
            viewBox="0 0 261.92 230.81"
            className="relative z-10 h-52 w-56 translate-y-12 sm:h-64 sm:w-72"
            role="img"
            aria-label="Monograma Paulo Viana"
          >
            {logoGroups.map((group, index) => (
              <motion.g
                key={index}
                initial={{ opacity: 0, ...logoOrigins[index] }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 145, damping: 17, delay: 0.82 + index * 0.1 }}
              >
                {group.map((shape, shapeIndex) => {
                  const Shape = shape.type;
                  return <Shape key={shapeIndex} {...shape} fill="currentColor" className="text-[#ffffff]" />;
                })}
              </motion.g>
            ))}
          </motion.svg>

          <motion.div
            aria-hidden="true"
            className="absolute h-28 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/75 to-transparent blur-xl"
            initial={{ opacity: 0, x: -170 }}
            animate={{ opacity: [0, 0.9, 0], x: [-170, 170] }}
            transition={{ duration: 0.76, delay: 1.55, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.82 }}
          className="mt-4 text-center"
        >
          <p className="font-display text-3xl font-bold tracking-[0.22em] text-white sm:text-4xl">PAULO VIANA</p>
          <p className="mt-3 font-cascadia text-sm font-semibold tracking-[0.18em] text-cyan-200/65 sm:text-base">PAULOVIANATECH.VERCEL.APP</p>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="mt-7 h-px w-40 overflow-hidden bg-cyan-100/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.95 }}
        >
          <motion.span
            className="block h-full bg-gradient-to-r from-cyan-300 via-white to-cyan-300"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.2, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
