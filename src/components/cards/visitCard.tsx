import { DoctorLabel } from "~/features/user/create-visit/DoctorLabel";
import { Card } from "./card";
import { Line } from "../forms/Line";
import { VisitDetails } from "../dashboard/visitDetails";
import { SoonAlert } from "../dashboard/soonAlert";

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
      <div className="flex items-center gap-3">
        <SoonAlert className={`${p.isSoon ? "flex" : "hidden"}`}></SoonAlert>
        <VisitDetails date={new Date()} />
      </div>
      {p.children}
      <Line />
      <div className="flex h-20">
        <DoctorLabel
          firstName={"Dariusz"}
          lastName={"Dorota"}
          specialization={[{ id: "1", name: "embedded developer" }]}
          opinion={{ rating: 0, count: 0 }}
        />
      </div>
    </Card>
  );
};
