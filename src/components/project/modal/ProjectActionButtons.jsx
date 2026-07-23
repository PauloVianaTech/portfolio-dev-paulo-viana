import { buttonIcons, buttonStyles } from "../config/buttonConfig";

const ProjectActionButtons = ({ buttons = [] }) => {
  if (!buttons.length) return null;

  return (
    <div
      className={`
        mt-3 md:mt-4
        pt-3 md:pt-4
        border-t border-white/10
        grid gap-3
        shrink-0
        ${buttons.length === 1 ? "grid-cols-1" : "grid-cols-2"}
      `}
    >
      {buttons.map((button, index) => (
        <a
          key={`${button.label}-${index}`}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${buttonStyles[button.type] || buttonStyles.secondary}
            ${buttons.length === 1 ? "col-span-1" : ""}
            ${buttons.length === 3 && index === 0 ? "col-span-2" : ""}
          `}
        >
          {buttonIcons[button.icon]}
          <span>{button.label}</span>
        </a>
      ))}
    </div>
  );
};

export default ProjectActionButtons;
