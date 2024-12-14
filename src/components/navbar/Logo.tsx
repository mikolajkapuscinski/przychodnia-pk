export const Logo: React.FC<{ opacity?: string; height?: number }> = ({
  opacity,
  height = 16,
}) => {
  return (
    <img
      className={`opacity-${opacity} h-${height}`}
      src="/logo.png"
      alt="LOGO"
    />
  );
};
