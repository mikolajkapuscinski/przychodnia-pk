import { Card } from "./card";

interface VisitCardProps extends React.HTMLAttributes<HTMLBaseElement> {
  title: string;
  className?: string;
  isSoon: boolean;
}

export const VisitCard: React.FC<VisitCardProps> = (p: VisitCardProps) => {
  const cardColor = p.isSoon ? "aquamarine" : "default-gray";

  return (
    <Card
      className={`relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-s-xl before:bg-${cardColor} before:content-[''] ${p.className}`}
      title={p.title}
    >
      {p.children}
    </Card>
  );
};
