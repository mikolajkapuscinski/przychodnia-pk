import React, { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { PatientBlock } from "./PatientBlock";
import { CustomDialog } from "~/components/CustomDialog";
import PatientDescription from "./PatientDescription";

type PatientSectionProps = unknown;

export const PatientSection: React.FC<PatientSectionProps> = () => {
  const [isPatientDescriptionOpen, setIsPatientDescriptionOpen] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const openPatientDescription = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientDescriptionOpen(true);
  };

  const closePatientDescription = () => {
    setSelectedPatient(null);
    setIsPatientDescriptionOpen(false);
  };

  const patients = [
    {
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
    <div>
      <SectionTitle results={patients.length}>My Patients</SectionTitle>
      <div className="flex flex-col gap-y-2">
        {patients.map((patient, index) => (
          <PatientBlock
            key={index}
            {...patient}
            onViewHistory={() => openPatientDescription(patient)}
          />
        ))}
      </div>

      {selectedPatient && (
        <CustomDialog
          isOpen={isPatientDescriptionOpen}
          onClose={closePatientDescription}
        >
          <PatientDescription {...selectedPatient} />
        </CustomDialog>
      )}
    </div>
  );
};
