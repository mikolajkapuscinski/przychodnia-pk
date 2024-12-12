import { Card, CardProps } from "./card";

export const AilmentCard: React.FC<CardProps> = (p: CardProps) => {
  return (
    <Card
      className={` ${p.className}`}
      title={p.title}
    >
      {p.children}
    </Card>
  );
};
