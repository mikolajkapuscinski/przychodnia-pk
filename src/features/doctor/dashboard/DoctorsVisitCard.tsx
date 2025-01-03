import { Card } from "~/components/cards/card";
import { SoonAlert } from "~/components/dashboard/soonAlert";
import { VisitDetails } from "~/components/dashboard/visitDetails";
import { Line } from "~/components/forms/Line";
import { PatientBlock } from "./PatientBlock";

interface DoctorsVisitCardProps {
  title: string;
  className?: string;
  isSoon: boolean;
  firstName: string;
  lastName: string;
  pesel: string;
  visitDate: Date;
  onViewVisit: () => void;
}

export const DoctorsVisitCard: React.FC<DoctorsVisitCardProps> = (
  p: DoctorsVisitCardProps,
) => {
  const cardColor = p.isSoon ? "aquamarine" : "default-gray";

  return (
    <Card
      onClick={p.onViewVisit}
      className={`relative rounded-l-none border-l-0 before:absolute before:left-0 before:top-0 before:h-[calc(100%+4px)] before:w-1 before:-translate-y-[2px] before:bg-aquamarine before:content-[''] ${p.className}`}
      title={p.title}
    >
      <div className="flex items-center gap-3">
        <SoonAlert className={`${p.isSoon ? "flex" : "hidden"}`}></SoonAlert>
        <VisitDetails date={p.visitDate} />
      </div>
      <Line />
      <div className="-m-3 flex h-20">
        <PatientBlock
          className="shadow-none"
          pesel={p.pesel}
          firstName={p.firstName}
          lastName={p.lastName}
        />
      </div>
    </Card>
  );
};
