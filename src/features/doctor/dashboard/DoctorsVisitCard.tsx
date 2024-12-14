import { Card } from "~/components/cards/card";
import { SoonAlert } from "~/components/dashboard/soonAlert";
import { VisitDetails } from "~/components/dashboard/visitDetails";
import { Line } from "~/components/forms/Line";
import { DoctorLabel } from "~/features/user/create-visit/DoctorLabel";
import { PatientBlock } from "./PatientBlock";
import { string } from "zod";

interface DoctorsVisitCardProps extends React.HTMLAttributes<HTMLBaseElement> {
  title: string;
  className?: string;
  isSoon: boolean;
  firstName: string;
  lastName: string;
  pesel: string;
}

export const DoctorsVisitCard: React.FC<DoctorsVisitCardProps> = (
  p: DoctorsVisitCardProps,
) => {
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
      <div className="-m-3 flex h-20">
        <PatientBlock
          className="shadow-none"
          pesel={p.pesel}
          onViewHistory={function (): void {
            throw new Error("Function not implemented.");
          }}
          firstName={p.firstName}
          lastName={p.lastName}
        />
      </div>
    </Card>
  );
};
