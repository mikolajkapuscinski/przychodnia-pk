import { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { DatePicker } from "~/features/user/create-visit/DatePicker";
import { DoctorsVisitCard } from "./DoctorsVisitCard";
import { CustomDialog } from "~/components/CustomDialog";
import { Visit } from "../Visit";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type VisitsSectionProps = unknown;

export const VisitsSection: React.FC<VisitsSectionProps> = (
  p: VisitsSectionProps,
) => {
  const { data: session } = useSession();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  const openVisit = (visit: any) => {
    setSelectedVisit(visit);
    setIsVisitOpen(true);
  };

  const closeVisit = () => {
    setSelectedVisit(null);
    setIsVisitOpen(false);
  };

  const visitsData = api.visit.getDoctorsVisits.useQuery({
    doctorId: session?.user.id || "",
  });

  return (
    <div>
      <SectionTitle results={visitsData.data?.length}>My Visits</SectionTitle>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <div className="grid-colsw-1 grid place-items-center items-stretch gap-x-2 gap-y-3">
        {visitsData.data?.map((visit, index) => {
          const { patient, title, date, ...visitDetails } = visit;
          const { pesel } = patient;

          const formattedDate = new Date(date).toLocaleDateString();

          return (
            <DoctorsVisitCard
              key={index}
              isSoon={false} // TODO: implement isSoon
              title={title}
              firstName={patient.firstName || ""}
              lastName={patient.lastName || ""}
              pesel={pesel}
              visitDate={new Date(date)}
              onViewVisit={() =>
                openVisit({
                  ...visitDetails,
                  patient,
                  title,
                  date: formattedDate,
                })
              }
            />
          );
        })}

        {selectedVisit && (
          <CustomDialog
            isOpen={isVisitOpen}
            onClose={closeVisit}
            className="w-1/2"
          >
            <Visit {...selectedVisit} />
          </CustomDialog>
        )}
      </div>
    </div>
  );
};
