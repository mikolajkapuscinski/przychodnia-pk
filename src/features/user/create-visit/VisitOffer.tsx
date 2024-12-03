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
        <div className="w-full flex max-w-4xl mx-auto bg-default-white rounded-2xl mt-10">
            <div className="flex-grow-[2] pl-4 pt-1">
                <DoctorLabel 
                    firstName={p.firstName}
                    lastName={p.lastName}
                    specjalization={p.specjalization}
                    opinion={p.opinion}
                />
            </div>
            <div className="flex-grow-[3] pr-6 py-6 w-12">
                <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
                <DoctorAvailability selectedDate={selectedDate} />
            </div>
        </div>
    );
};
