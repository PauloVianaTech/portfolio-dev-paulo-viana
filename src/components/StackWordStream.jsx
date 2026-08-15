import React from 'react';
import { techIcons } from './project/config/techIcons';

const iconGroups = [
  [
    { icon: techIcons.HTML5, left: '9%', bottom: '8%', size: 'text-3xl' },
    { icon: techIcons.CSS3, left: '32%', bottom: '38%', size: 'text-2xl' },
    { icon: techIcons.TypeScript, left: '63%', bottom: '14%', size: 'text-4xl' },
    { icon: techIcons['Next.js'], left: '85%', bottom: '42%', size: 'text-3xl' },
  ],
  [
    { icon: techIcons.MongoDB, left: '12%', bottom: '42%', size: 'text-3xl' },
    { icon: techIcons.Python, left: '39%', bottom: '13%', size: 'text-4xl' },
    { icon: techIcons.OpenAI, left: '67%', bottom: '35%', size: 'text-3xl' },
    { icon: techIcons.GitHub, left: '88%', bottom: '9%', size: 'text-2xl' },
  ],
  [
    { icon: techIcons.Canva, left: '11%', bottom: '15%', size: 'text-4xl' },
    { icon: techIcons['After Effects'], left: '36%', bottom: '42%', size: 'text-3xl' },
    { icon: techIcons.Premiere, left: '65%', bottom: '10%', size: 'text-3xl' },
    { icon: techIcons['DaVinci Resolve'], left: '87%', bottom: '38%', size: 'text-4xl' },
  ],
  [
    { icon: techIcons.BlackArrow, left: '16%', bottom: '40%', size: 'text-4xl' },
    { icon: techIcons.Nelogica, left: '43%', bottom: '15%', size: 'text-3xl' },
    { icon: techIcons.metatrader5, left: '72%', bottom: '36%', size: 'text-3xl' },
    { icon: techIcons.Ollama, left: '89%', bottom: '12%', size: 'text-2xl' },
  ],
  [
    { icon: techIcons.Framer, left: '10%', bottom: '11%', size: 'text-3xl' },
    { icon: techIcons.Gemini, left: '34%', bottom: '42%', size: 'text-4xl' },
    { icon: techIcons.ChatGPT, left: '65%', bottom: '14%', size: 'text-2xl' },
    { icon: techIcons.Claude, left: '87%', bottom: '38%', size: 'text-3xl' },
  ],
];

const connectionCounts = [3, 4, 3];
const floatVariations = [
  { distance: 4, duration: 2.4, delay: -0.4 },
  { distance: 6, duration: 2.9, delay: -1.2 },
  { distance: 3, duration: 2.6, delay: -2.1 },
  { distance: 5, duration: 3.1, delay: -0.8 },
];

const getIconPoint = ({ left, bottom }) => ({
  x: Number.parseFloat(left),
  y: 100 - Number.parseFloat(bottom),
});

const createWavePath = (from, to, variation, waveShift = 0) => {
  const dx = to.x - from.x;
  const amplitude = (variation % 2 === 0 ? 1 : -1) * (5 + variation * 2.5 + waveShift);

  return [
    `M ${from.x} ${from.y}`,
    `C ${from.x + dx * 0.28} ${from.y + amplitude},`,
    `${from.x + dx * 0.7} ${to.y - amplitude},`,
    `${to.x} ${to.y}`,
  ].join(' ');
};

const WavePathAnimation = ({ from, to, variation }) => {
  const basePath = createWavePath(from, to, variation);
  const upperWave = createWavePath(from, to, variation, 10.5 + variation * 10);
  const lowerWave = createWavePath(from, to, variation, -10.5 - variation * 20);

  return (
    <animate
      attributeName="d"
      values={`${basePath};${upperWave};${lowerWave};${basePath}`}
      dur={`${1.8 + variation * 0.275}s`}
      begin={`${-variation * 0.325}s`}
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.33;0.66;1"
      keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
    />
  );
};

const renderConnections = (from, to, lineCount, keyPrefix) => (
  Array.from({ length: lineCount }, (_, variation) => (
    <g key={`${keyPrefix}-${variation}`}>
      <path
        d={createWavePath(from, to, variation)}
        fill="none"
        stroke="rgba(103, 232, 249, 0.16)"
        strokeWidth="0.42"
        vectorEffect="non-scaling-stroke"
      >
        <WavePathAnimation from={from} to={to} variation={variation} />
      </path>
      <path
        d={createWavePath(from, to, variation)}
        fill="none"
        stroke="rgba(165, 243, 252, 0.54)"
        strokeWidth="0.55"
        strokeDasharray="2 4"
        vectorEffect="non-scaling-stroke"
        className="stack-link-flow"
        style={{
          animationDelay: `${-variation * 0.45}s`,
          animationDuration: `${2.5 + variation * 0.35}s`,
        }}
      >
        <WavePathAnimation from={from} to={to} variation={variation} />
      </path>
    </g>
  ))
);

const StackWordStream = React.forwardRef(function StackWordStream(_, ref) {
  return (
    <div className="pointer-events-none relative -mt-4 h-28 w-full overflow-hidden sm:h-32 lg:absolute lg:inset-x-0 lg:bottom-[3vh] lg:mt-0 lg:h-[10vh]">
      <div ref={ref} className="flex h-full will-change-transform">
        {iconGroups.map((icons, groupIndex) => {
          const nextIcons = iconGroups[groupIndex + 1];

          return (
            <div
              key={groupIndex}
              className="relative h-full w-screen min-w-[100vw]"
            >
              <svg
                aria-hidden="true"
                className="absolute inset-y-0 left-0 h-full w-[200%] overflow-visible"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
              >
                {icons.slice(0, -1).flatMap((icon, index) => (
                  renderConnections(
                    getIconPoint(icon),
                    getIconPoint(icons[index + 1]),
                    connectionCounts[index] || 2,
                    `internal-${groupIndex}-${index}`,
                  )
                ))}
                {nextIcons && renderConnections(
                  getIconPoint(icons[icons.length - 1]),
                  { ...getIconPoint(nextIcons[0]), x: getIconPoint(nextIcons[0]).x + 100 },
                  2,
                  `bridge-${groupIndex}`,
                )}
              </svg>
              {icons.map((item, iconIndex) => {
                const float = floatVariations[(groupIndex * icons.length + iconIndex) % floatVariations.length];

                return (
                  <span
                    key={iconIndex}
                    style={{
                      left: item.left,
                      bottom: item.bottom,
                      '--stack-float-distance': `${float.distance}px`,
                      '--stack-float-duration': `${float.duration}s`,
                      '--stack-float-delay': `${float.delay}s`,
                    }}
                    className="stack-icon-float absolute flex h-[26px] w-[26px] items-center justify-center text-white/80 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)] [&>span]:!h-full [&>span]:!w-full [&_img]:!h-full [&_img]:!w-full [&_svg]:!h-full [&_svg]:!w-full sm:h-[29px] sm:w-[29px] lg:h-8 lg:w-8"
                  >
                    {item.icon}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default StackWordStream;
