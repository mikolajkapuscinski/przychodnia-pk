export const Logo: React.FC<{ opacity?: string }> = ({ opacity }) => {
  return (
    <img className={`opacity-${opacity} h-16`} src="/logo.png" alt="LOGO" />
  );
};
