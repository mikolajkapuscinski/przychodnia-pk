import React, { useState } from "react";
import { DoctorLabel } from "./DoctorLabel";
import { type Specialization } from "@prisma/client";
import { DoctorAvailability } from "./DoctorAvailability";
import { DatePicker } from "./DatePicker";

interface VisitOfferProps {
  doctorId: string;
  firstName: string;
  lastName: string;
  specialization: Specialization[];
  opinion: { rating: number; count: number };
}

export const VisitOffer = (p: VisitOfferProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl rounded-2xl bg-default-white">
      <div className="w-3/5 px-6 pt-6">
        <DoctorLabel
          firstName={p.firstName}
          lastName={p.lastName}
          specialization={p.specialization || []}
          opinion={p.opinion}
        />
      </div>
      <div className="w-2/5 flex-col py-6 pr-6">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <DoctorAvailability selectedDate={selectedDate} doctorId={p.doctorId} />
      </div>
    </div>
  );
};
