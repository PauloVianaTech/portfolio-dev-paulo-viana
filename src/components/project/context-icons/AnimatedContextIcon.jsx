import { motion } from "framer-motion";

import {
  FaGithub,
  FaFileAlt,
  FaChartLine,
  FaRocket,
  FaLightbulb,
  FaBriefcase,
  FaStar,
  FaCloud,
  FaCodeBranch,
  FaBolt,
} from "react-icons/fa";

import {
  FaLaptopCode,
} from "react-icons/fa6";


const AnimatedContextIcon = ({ context }) => {
  if (context === "Study Project") {
    return (
      <div className="relative h-10 w-10 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-xl bg-violet-400/15 blur-md"
          animate={{
            opacity: [0.2, 0.7, 0.2],
            scale: [0.9, 1.14, 0.9],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative h-10 w-10 flex items-center justify-center">
          {/* brilho/scan da tela */}
          <motion.span
            className="
            absolute
            z-0
            h-5 w-5
            rounded-md
            bg-violet-300/20
            blur-[2px]
          "
            animate={{
              opacity: [0.2, 0.75, 0.2],
              scale: [0.9, 1.08, 0.9],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* caractere esquerdo */}
          <motion.span
            className="
            absolute
            z-20
            left-[-8px]
            top-3
            -translate-y-1/2
            text-[12px]
            font-black
            text-violet-100/80
            drop-shadow-[0_0_6px_rgba(196,181,253,0.9)]
            pointer-events-none
          "
            animate={{
              x: [2, -2, 2],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {"</>"}
          </motion.span>

          {/* caractere direito */}
          <motion.span
            className="
            absolute
            z-20
            right-[-6px]
            top-2.5
            -translate-y-1/2
            text-[12px]
            font-black
            text-violet-200/75
            drop-shadow-[0_0_6px_rgba(196,181,253,0.85)]
            pointer-events-none
          "
            animate={{
              x: [-2, 2, -2],
              opacity: [0.3, 0.95, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.35,
            }}
          >
            {"{..}"}
          </motion.span>

          {/* caractere inferior */}
          <motion.span
            className="
            absolute
            z-20
            bottom-[-1px]
            left-2
            -translate-x-1/2
            text-[10px]
            font-black
            text-violet-50/70
            drop-shadow-[0_0_6px_rgba(196,181,253,0.8)]
            pointer-events-none
          "
            animate={{
              y: [0, 3, 0],
              opacity: [0.25, 0.9, 0.25],
              scale: [0.75, 0.95, 0.75],
            }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          >
            0101
          </motion.span>

          {/* laptop */}
          <motion.span
            className="
            relative z-30
            text-violet-100
            text-[20px]
            drop-shadow-[0_0_12px_rgba(196,181,253,0.8)]
          "
            animate={{
              y: [0, -1, 0],
              rotate: [0, -2, 2, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaLaptopCode />
          </motion.span>
        </div>
      </div>
    );
  }

  if (context === "Client Project") {
    return (
      <div className="relative h-10 w-10 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-xl bg-emerald-400/15 blur-md"
          animate={{
            opacity: [0.25, 0.65, 0.25],
            scale: [0.9, 1.12, 0.9],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* documento - esquerda */}
        <motion.span
          className="
          absolute
          left-[-2px]
          top-4          -translate-y-1/2
          z-20
          text-[12px]
          text-emerald-100/85
          drop-shadow-[0_0_7px_rgba(110,231,183,0.8)]
          pointer-events-none
        "
          animate={{
            x: [2, -2, 2],
            opacity: [0.35, 1, 0.35],
            scale: [0.85, 1.05, 0.85],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaFileAlt />
        </motion.span>

        {/* check - direita */}
        <motion.span
          className="
          absolute
          right-[-4px]
          top-2.5
          -translate-y-1/2
          z-20
          text-[12px]
          font-black
          text-emerald-100/90
          drop-shadow-[0_0_7px_rgba(110,231,183,0.9)]
          pointer-events-none
        "
          animate={{
            x: [-2, 2, -2],
            opacity: [0.2, 1, 0.2],
            scale: [0.75, 1.12, 0.75],
            rotate: [-6, 0, -6],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.35,
          }}
        >
          ✓
        </motion.span>

        {/* gráfico - embaixo */}
        <motion.span
          className="
          absolute
          bottom-[-2px]
          left-3.5
          -translate-x-1/2
          z-20
          text-[12px]
          text-emerald-100/85
          drop-shadow-[0_0_7px_rgba(110,231,183,0.8)]
          pointer-events-none
        "
          animate={{
            y: [0, 3, 0],
            opacity: [0.35, 1, 0.35],
            scale: [0.85, 1.08, 0.85],
          }}
          transition={{
            duration: 1.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        >
          <FaChartLine />
        </motion.span>

        {/* maleta */}
        <motion.span
          className="
    relative z-10
    text-emerald-100
    text-[17px]
    drop-shadow-[0_0_12px_rgba(110,231,183,0.75)]
  "
          animate={{
            y: [0, -1, 0],
            rotate: [0, -2, 2, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaBriefcase />
        </motion.span>
      </div>
    );
  }

  if (context === "Personal Project") {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-xl bg-cyan-400/15 blur-md"
        animate={{
          opacity: [0.25, 0.75, 0.25],
          scale: [0.9, 1.18, 0.9],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* estrela - direita */}
      <motion.span
        className="
          absolute
          right-[-3px]
          top-2
          -translate-y-1/2
          z-20
          text-[12px]
          text-cyan-100/85
          drop-shadow-[0_0_7px_rgba(103,232,249,0.85)]
          pointer-events-none
        "
        animate={{
          x: [-2, 2, -2],
          opacity: [0.35, 1, 0.35],
          scale: [0.75, 1.1, 0.75],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaStar />
      </motion.span>

      {/* rastro - embaixo */}
<div
  className="
    absolute
    bottom-[-4px]
    left-3.5
    -translate-x-1/2
    z-20
    h-4
    w-6
    pointer-events-none
  "
>
  {/* chama principal */}
  <motion.span
    className="
      absolute
      right-0
      top-1
      -translate-x-1/2
      h-[7px]
      w-[16px]
      rounded-full
      bg-cyan-300/65
      blur-[1px]
      shadow-[0_0_10px_rgba(103,232,249,0.9)]
    "
    animate={{
      scaleX: [0.55, 1.15, 0.55],
      scaleY: [0.75, 1.15, 0.75],
      opacity: [0.2, 0.95, 0.2],
    }}
    transition={{
      duration: 1.15,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* partícula esquerda */}
  <motion.span
    className="
      absolute
      left-[8px]
      top-[2px]
      h-1
      w-1
      rounded-full
      bg-cyan-100
      shadow-[0_0_7px_rgba(103,232,249,0.9)]
    "
    animate={{
      y: [0, 4, 0],
      x: [0, -2, 0],
      opacity: [0.85, 0.15, 0.85],
      scale: [1, 0.55, 1],
    }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* partícula direita */}
  <motion.span
    className="
      absolute
      right-[3px]
      top-[1px]
      h-1
      w-1
      rounded-full
      bg-cyan-200
      shadow-[0_0_7px_rgba(103,232,249,0.9)]
    "
    animate={{
      y: [0, 5, 0],
      x: [0, 2, 0],
      opacity: [0.7, 0.1, 0.7],
      scale: [0.9, 0.45, 0.9],
    }}
    transition={{
      duration: 1.3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.25,
    }}
  />
</div>

      {/* nuvem - esquerda */}
      <motion.span
        className="
          absolute
          left-[-4px]
          top-3
          -translate-y-1/2
          z-20
          text-[12px]
          text-cyan-100/80
          drop-shadow-[0_0_7px_rgba(103,232,249,0.75)]
          pointer-events-none
        "
        animate={{
          x: [-2, 2, -2],
          opacity: [0.25, 0.85, 0.25],
          scale: [0.8, 1.05, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      >
        <FaCloud />
      </motion.span>

      {/* foguete */}
      <motion.span
        className="
          relative z-10
          text-cyan-100
          text-[18px]
          drop-shadow-[0_0_12px_rgba(103,232,249,0.8)]
        "
        animate={{
          y: [2, -3, 2],
          x: [-1, 1, -1],
          rotate: [-12, -4, -12],
        }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaRocket />
      </motion.span>
    </div>
  );
}

if (context === "Open Source") {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-xl bg-white/10 blur-md"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.9, 1.12, 0.9],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* branch - esquerda */}
      <motion.span
        className="
          absolute
          left-[-3px]
          top-4
          -translate-y-1/2
          z-20
          text-[12px]
          text-slate-100/85
          drop-shadow-[0_0_7px_rgba(226,232,240,0.8)]
          pointer-events-none
        "
        animate={{
          x: [2, -2, 2],
          opacity: [0.35, 1, 0.35],
          scale: [0.8, 1.06, 0.8],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 1.9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaCodeBranch />
      </motion.span>

      {/* conexão - embaixo */}
      <div
        className="
          absolute
          bottom-[-2px]
          left-3.5
          -translate-x-1/2
          z-20
          h-3
          w-5
          pointer-events-none
        "
      >
        <motion.span
          className="
            absolute
            left-1.5
            top-1/2
            h-1.5
            w-1.5
            rounded-full
            bg-slate-100
            shadow-[0_0_8px_rgba(226,232,240,0.85)]
          "
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        <motion.span
          className="
            absolute
            right-[-6px]
            top-1/2
            h-1.5
            w-1.5
            rounded-full
            bg-slate-100
            shadow-[0_0_8px_rgba(226,232,240,0.85)]
          "
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1.15, 0.8, 1.15],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        <motion.span
          className="
            absolute
            left-[6px]
            right-[-6px]
            top-[8px]
            h-[2px]
            rounded-full
            bg-slate-100/70
            shadow-[0_0_8px_rgba(226,232,240,0.7)]
          "
          animate={{
            opacity: [0.25, 0.85, 0.25],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* código - direita */}
      <motion.span
        className="
          absolute
          right-[-9px]
          top-3
          -translate-y-1/2
          z-20
          text-[12px]
          font-black
          text-slate-100/85
          drop-shadow-[0_0_7px_rgba(226,232,240,0.8)]
          pointer-events-none
        "
        animate={{
          x: [-2, 2, -2],
          opacity: [0.25, 0.95, 0.25],
          scale: [0.8, 1.05, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.65,
        }}
      >
        {"</>"}
      </motion.span>

      {/* github */}
      <motion.span
        className="
          relative z-10
          text-slate-100
          text-[19px]
          drop-shadow-[0_0_12px_rgba(226,232,240,0.75)]
        "
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -4, 4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaGithub />
      </motion.span>
    </div>
  );
}

  if (context === "Concept") {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full bg-amber-300/20 blur-md"
        animate={{
          opacity: [0.15, 0.9, 0.15],
          scale: [0.75, 1.25, 0.75],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* faísca - esquerda */}
      <motion.span
        className="
          absolute
          left-[-3px]
          top-4
          -translate-y-1/2
          z-20
          text-[13px]
          font-black
          text-amber-100/90
          drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]
          pointer-events-none
        "
        animate={{
          x: [2, -2, 2],
          opacity: [0.25, 1, 0.25],
          scale: [0.7, 1.12, 0.7],
          rotate: [0, 18, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.span>

      {/* raio - embaixo */}
      <motion.span
        className="
          absolute
          bottom-[-3px]
          left-3.5
          -translate-x-1/2
          z-20
          text-[12px]
          text-amber-100/90
          drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]
          pointer-events-none
        "
        animate={{
          y: [0, 3, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.75, 1.1, 0.75],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.35,
        }}
      >
        <FaBolt />
      </motion.span>

      {/* faísca - direita */}
      <motion.span
        className="
          absolute
          right-[-4px]
          top-1
          -translate-y-1/2
          z-20
          text-[13px]
          font-black
          text-amber-100/90
          drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]
          pointer-events-none
        "
        animate={{
          x: [-2, 2, -2],
          opacity: [0.25, 1, 0.25],
          scale: [0.7, 1.12, 0.7],
          rotate: [0, 18, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.span>

      {/* lâmpada */}
      <motion.span
        className="
          relative z-10
          text-amber-100
          text-[18px]
          drop-shadow-[0_0_14px_rgba(252,211,77,0.9)]
        "
        animate={{
          opacity: [0.55, 1, 0.55],
          scale: [0.96, 1.12, 0.96],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaLightbulb />
      </motion.span>
    </div>
  );
}

  return null;
};
export default AnimatedContextIcon;