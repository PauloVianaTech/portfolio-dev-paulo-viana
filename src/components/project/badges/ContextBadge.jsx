import AnimatedContextIcon from "../context-icons/AnimatedContextIcon";

const contextStyles = {
  "Study Project": `
    border-violet-300/20
    bg-violet-300/[0.07]
    text-violet-100
  `,

  "Client Project": `
    border-emerald-400/25
    bg-emerald-400/10
    text-emerald-200
  `,

  "Personal Project": `
    border-cyan-400/25
    bg-cyan-400/10
    text-cyan-200
  `,

  "Open Source": `
    border-slate-300/25
    bg-white/10
    text-slate-200
  `,

  "Concept": `
    border-amber-400/25
    bg-amber-400/10
    text-amber-200
  `,

  default: `
    border-white/10
    bg-white/[0.04]
    text-slate-200
  `,
};

//Contexto do projeto
const ContextBadge = ({ context, variant = "default" }) => {

  if (!context) return null;

  const words = context.trim().split(/\s+/);
  const hasMoreThanOneWord = words.length > 1;
  const isModal = variant === "modal";

  return (
    <span
      className={`
        ${isModal
                ? `
            w-full h-full
            rounded-tr-[28px]
            bg-[#07101F]
            border-r border-b border-[#1F4B5F]/70
            shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
            
          `
          : `
            w-[86%] sm:w-full
            rounded-xl
            border
            backdrop-blur-md
            ${contextStyles[context] || contextStyles.default}
          `
        }

        min-h-[24px]
        inline-flex flex-col items-center justify-center
        gap-0
        px-1 py-0.5
        text-[10px] md:text-[11px]
        font-bold
        uppercase tracking-[0.08em]
        text-center
        leading-tight
        whitespace-normal
        break-words
      `}
    >
      <span className="sm:hidden">
        {hasMoreThanOneWord ? (
          <>
            {words[0]}
            <br />
            {words.slice(1).join(" ")}
          </>
        ) : (
          context
        )}
      </span>

      <span className="hidden sm:inline">
        {context}
      </span>

      <span className="-mt-2 flex items-center justify-center scale-[0.8] sm:scale-100 origin-center">
        <AnimatedContextIcon context={context} />
      </span>

    </span>
  );
};

export default ContextBadge;