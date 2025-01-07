export interface CardProps extends React.HTMLAttributes<HTMLBaseElement> {
  title: string;
  className?: string;
  onClick?: () => void;
  children?: any; 
}

export const Card: React.FC<CardProps> = (p: CardProps) => {
  return (
    <div
      onClick={p.onClick}
      className={`group relative w-full cursor-pointer rounded-xl border-2 border-default-white bg-default-white p-6 shadow-lg hover:border-light-brown ${p.className}`}
    >
      <h3 className="p-0 text-lg font-bold">{p.title}</h3>
      <div className="text-xs">{p.children}</div>
    </div>
  );
};
