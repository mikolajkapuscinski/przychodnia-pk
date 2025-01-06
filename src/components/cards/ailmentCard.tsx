import { Card, type CardProps } from "./card";

type AilmentCardProps = CardProps;

export const AilmentCard: React.FC<AilmentCardProps> = (
  p: AilmentCardProps,
) => {
  return (
    <Card className={` ${p.className}`} title={p.title}>
      <div className="text-light-brown">
      </div>
      {p.children}
    </Card>
  );
};
