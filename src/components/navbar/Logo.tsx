export const Logo: React.FC<{ opacity?: string }> = ({ opacity }) => {
  return (
    <img className={`opacity-${opacity}`} src="/logo.png" alt="LOGO" />
  );
};
