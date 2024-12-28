import { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

import { DatePicker } from "~/features/user/create-visit/DatePicker";
import { DoctorsVisitCard } from "./DoctorsVisitCard";
import { CustomDialog } from "~/components/CustomDialog";
import { Visit } from "../Visit";

type VisitsSectionProps = unknown;

export const VisitsSection: React.FC<VisitsSectionProps> = (
  p: VisitsSectionProps,
) => {
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

  const visits = [
    {
      isSoon: true,
      title: "MRI: right thigh, knee and shin",
      firstName: "Boa",
      lastName: "Dusiciel",
      pesel: "02322203534",
      email: "tajger.bonzo@interia.pl",
      phoneNumber: "456 123 222",
      sex: "MALE",
      birthday: "1985-05-12",
      createdAt: "2023-01-01",
      image: "/patient.png",
      appointmentSchedule: [
        "2023-12-15 10:00 AM - Check-up",
        "2023-12-20 2:00 PM - Follow-up",
      ],
      medicalHistory: [
        { date: "2023-01-15", description: "Diagnosed with flu." },
        { date: "2022-12-10", description: "Regular check-up." },
      ],
      bloodType: "O+",
      allergies: ["Peanuts", "Dust"],
    },
    {
      isSoon: false,
      title: "Consultation: surgery preparation",
      firstName: "Jan",
      lastName: "Długosz",
      pesel: "02322203534",
      email: "jandlugi@gmail.pl",
      phoneNumber: "456 123 222",
      sex: "MALE",
      birthday: "1985-05-12",
      createdAt: "2023-01-01",
      image: "/patient.png",
      appointmentSchedule: [
        "2023-12-15 10:00 AM - Check-up",
        "2023-12-20 2:00 PM - Follow-up",
      ],
      medicalHistory: [
        { date: "2023-01-15", description: "Diagnosed with flu." },
        { date: "2022-12-10", description: "Regular check-up." },
      ],
      bloodType: "O+",
      allergies: ["Peanuts", "Dust"],
    },
  ];

  return (
    <div className="">
      <SectionTitle results={1}>My Visits</SectionTitle>
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      ></DatePicker>
      <div className="grid-colsw-1 grid place-items-center items-stretch gap-x-2 gap-y-3">
        {visits.map((visit, index) => (
          <DoctorsVisitCard
            key={index}
            {...visit}
            onViewVisit={() => openVisit(visit)}
          ></DoctorsVisitCard>
        ))}

        {selectedVisit && (
          <CustomDialog isOpen={isVisitOpen} onClose={closeVisit}>
            <Visit {...selectedVisit}></Visit>
          </CustomDialog>
        )}
      </div>
    </div>
  );
};
