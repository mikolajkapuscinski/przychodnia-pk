import { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

import { DatePicker } from "~/features/user/create-visit/DatePicker";
import { DoctorsVisitCard } from "./DoctorsVisitCard";

interface VisitsSectionProps {}

export const VisitsSection: React.FC<VisitsSectionProps> = (
  p: VisitsSectionProps,
) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="">
        <SectionTitle results={1}>My Visits</SectionTitle>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        ></DatePicker>
        <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
          <DoctorsVisitCard
            isSoon={true}
            title="MRI: right thigh, knee and shin"
          ></DoctorsVisitCard>
          <DoctorsVisitCard
            isSoon={false}
            title="Consultation: surgery preparation"
          ></DoctorsVisitCard>
          <DoctorsVisitCard
            isSoon={false}
            title="Consultation: physical rehabilitation before & after surgery"
          ></DoctorsVisitCard>
        </div>
      </div>
    </>
  );
};
