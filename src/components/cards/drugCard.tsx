import { Card, CardProps } from "./card";

export const DrugCard: React.FC<CardProps> = (p: CardProps) => {
  return (
    <Card title={p.title}>
      {p.children}
      <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-br-xl rounded-tl-xl bg-orange p-1 group-hover:bg-default-black">
        <img
          className="h-5 w-5 duration-300 group-hover:translate-x-1"
          src="/right-arrow.png"
          alt=""
        ></img>
      </div>
    </Card>
  );
};
