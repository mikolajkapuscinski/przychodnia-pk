interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Card: React.FC<CardProps> = (p: CardProps) => {
  return (
    <div className="group relative w-52 cursor-pointer rounded-xl border-2 border-backgound p-4 shadow-lg">
      <h3 className="p-0 text-lg font-bold group-hover:text-aquamarine group-hover:underline">
        {p.title}
      </h3>
      <div>{p.children}</div>
      <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-br-xl rounded-tl-xl bg-aquamarine p-1 group-hover:bg-black">
        <img
          className="h-5 w-5 duration-300 group-hover:translate-x-1"
          src="/right-arrow.png"
          alt=""
        ></img>
      </div>
    </div>
  );
};
