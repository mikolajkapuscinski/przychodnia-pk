import { DoctorLabel } from "~/features/user/create-visit/DoctorLabel";
import { Card } from "./card";
import { Line } from "../forms/Line";
import { VisitDetails } from "../dashboard/visitDetails";
import { StatusAlert } from "../dashboard/StatusAlert";
import { api } from "~/utils/api";
import { doc } from "prettier";

interface VisitCardProps extends React.HTMLAttributes<HTMLBaseElement> {
  title: string;
  className?: string;
  date: Date;
  status: string;
  doctorId: string;
}

export const VisitCard: React.FC<VisitCardProps> = (p: VisitCardProps) => {
  const doctorData = api.user.findDoctorById.useQuery({
    doctorId: p.doctorId,
  }).data;

  return (
    <Card
      className={`relative rounded-l-none border-l-0 before:absolute before:left-0 before:top-0 before:h-[calc(100%+4px)] before:w-1 before:-translate-y-[2px] before:bg-aquamarine before:content-[''] ${p.className}`}
      title={p.title}
    >
      <div className="flex items-center gap-3">
        <StatusAlert>{p.status}</StatusAlert>
        <VisitDetails date={p.date} />
      </div>
      {p.children}
      <Line />
      <div className="flex h-20">
        <DoctorLabel
          firstName={doctorData?.firstName ?? ""}
          lastName={doctorData?.lastName ?? ""}
          specialization={doctorData?.specialization}
        />
      </div>
    </Card>
  );
};
