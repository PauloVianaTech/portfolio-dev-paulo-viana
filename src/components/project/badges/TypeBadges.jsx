import { FaNodeJs, FaTools, FaWindowMaximize, FaVideo, FaPencilRuler, FaChartLine } from "react-icons/fa";
import { FaCartShopping, FaChartPie, FaUser, FaPalette, FaInstagram, FaRobot } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { PiCodeBold } from "react-icons/pi";

const typeIcons = {
    "Frontend": <PiCodeBold />,
    "Backend": <FaNodeJs />,
    "Full Stack": <FaTools />,
    "E-commerce": <FaCartShopping />,
    "API": <SiExpress />,
    "Landing Page": <FaWindowMaximize />,
    "Dashboard": <FaChartPie />,
    "Portfolio": <FaUser />,
    "Identidade Visual": <FaPalette />,
    "Design": <FaPalette />,
    "UI/UX": <FaPencilRuler />,
    "UI Design": <FaPencilRuler />,
    "Motion Design": <FaVideo />,
    "Social Media": <FaInstagram />,
    "Trading Indicator": <FaChartLine />,
    "Trading Automation": <FaRobot />,
    "Automation": <FaRobot />,
};

const typeStyles = {

    Development: `
    border-cyan-300/25
    bg-cyan-300/10
    text-cyan-100
    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
`,

    Design: `
    border-pink-400/20
    bg-pink-400/10
    text-pink-200
`,

    Trading: `
    border-emerald-400/20
    bg-emerald-400/10
    text-emerald-200
`,

};

const TypeBadges = ({ project, limit, variant = "default" }) => {
    const isCard = variant === "card";
    const types = project.types || [];
    const visibleTypes = limit ? types.slice(0, limit) : types;
    const hiddenCount = limit && types.length > limit ? types.length - limit : 0;

    if (!types.length) return null;

    return (
        <div
            className={`
                flex flex-wrap
                ${isCard
                ? "justify-start gap-1 max-h-[64px] overflow-hidden"
                : "gap-x-1.5 gap-y-1"
                }
            `}
        >
            {visibleTypes.map((type, index) => (
                <span
                    key={`${type}-${index}`}
                    className={`
                        inline-flex items-center
                        rounded-full
                        font-semibold
                        border
                        backdrop-blur-md
                        whitespace-nowrap
                        overflow-hidden
                        ${isCard
                            ? "gap-1 px-1.5 py-1 text-[10px] sm:text-[12px] md:text-[12px] leading-none max-w-[92px] sm:max-w-[112px] md:max-w-[128px] shrink-0"
                            : "gap-2 px-3 py-1 text-xs"
                        }
                        ${typeStyles[project.category] || typeStyles.Development}
                    `}
                >
                    <span
                        className={`
                            shrink-0
                            ${isCard
                                ? "text-[10px] [&_svg]:w-[10px] [&_svg]:h-[10px]"
                                : "text-sm"
                            }
                         `}
                    >
                        {typeIcons[type]}
                    </span>

                    <span className={isCard ? "truncate min-w-0" : ""}>
                        {type}
                    </span>
                </span>
            ))}

            {hiddenCount > 0 && (
                <span
                    className={`
                        inline-flex items-center rounded-full font-bold border border-white/15 bg-white/10 text-slate-200 backdrop-blur-md shrink-0
                        ${isCard
                            ? "px-1.5 py-1 text-[8px] sm:text-[9px] leading-none"
                            : "px-3 py-1 text-xs"
                        }
    `}
                >
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};

export default TypeBadges;