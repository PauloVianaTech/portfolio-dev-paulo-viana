////////////////////////////////////////
// HELPERS COMPONENTS ANIMATIONS
////////////////////////////////////////
const LineShadowText = ({
  children,
  className = "",
  shadowColor = "#00e5ff",
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `
          1px 1px 0 ${shadowColor},
          2px 2px 0 rgba(0,0,0,0.25),
          0 0 18px ${shadowColor}
        `,
      }}
    >
      {children}
    </span>
  );
};

export default LineShadowText;