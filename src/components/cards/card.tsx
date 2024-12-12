export interface CardProps extends React.HTMLAttributes<HTMLBaseElement> {
  title: string;
  className?: string;
}

export const Card: React.FC<CardProps> = (p: CardProps) => {
  return (
    <div
      className={`group relative w-full cursor-pointer rounded-xl border-2 border-backgound bg-default-white p-6 shadow-lg ${p.className}`}
    >
      <h3 className="p-0 text-lg font-bold group-hover:text-aquamarine group-hover:underline">
        {p.title}
      </h3>
      <div className="text-xs">{p.children}</div>

    </div>
  );
};
