import { DatePicker } from "../create-visit/DatePicker";
import { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { VisitCard } from "~/components/cards/visitCard";
import { api } from "~/utils/api";
import { date } from "zod";

export const VisitSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const visits = api.user.getPatientVisits.useQuery().data;

  return (
    <div className="px-12 py-4">
      <SectionTitle results={visits?.length}>Your visits</SectionTitle>
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      ></DatePicker>
      <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
        {visits
          ?.filter((v) => v.date.getDate() === selectedDate.getDate())
          .map((v) => 
            <VisitCard
              status={v.status}
              title={v.title}
              date={v.date}
              doctorId={v.doctorId}
            ></VisitCard>
          )}
      </div>
    </div>
  );
};
