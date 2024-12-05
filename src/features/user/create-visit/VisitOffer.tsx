import React, { useState } from "react";
import { DoctorLabel } from "./DoctorLabel";
import { Specialization } from "@prisma/client";
import { DoctorAvailability } from "./DoctorAvailability";
import { DatePicker } from "./DatePicker";

interface VisitOfferProps {
  firstName: string;
  lastName: string;
  specjalization: Specialization[];
  opinion: string;
}

export const VisitOffer = (p: VisitOfferProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mx-auto mt-10 flex w-full max-w-4xl rounded-2xl bg-default-white">
      <div className="flex-grow-[2] pl-4 pt-1">
        <DoctorLabel
          firstName={p.firstName}
          lastName={p.lastName}
          specjalization={p.specjalization}
          opinion={p.opinion}
        />
      </div>
      <div className="w-12 flex-grow-[3] py-6 pr-6">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <DoctorAvailability selectedDate={selectedDate} />
      </div>
    </div>
  );
};
