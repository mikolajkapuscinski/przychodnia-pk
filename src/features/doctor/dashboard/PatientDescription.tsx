import React from "react";
import { Line } from "~/components/forms/Line";
import { PatientInfoCard } from "../../../components/cards/PatientInfoCard";
import PatientBasicInformationCard from "~/components/cards/PatientBasicInformationCard";
import PatientMedicalInformationCard from "~/components/cards/PatientMedicalInformationCard";
import PatientMedicalHistory from "~/components/cards/PatientMedicalHistoryCard";

interface PatientDescriptionProps {
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phoneNumber?: string;
  sex: string;
  birthday?: string;
  createdAt: string;
  address?: string;
  image?: string;
  appointmentSchedule: string[];
  medicalHistory: { date: string; description: string }[];
  bloodType: string;
  allergies: string[];
}

export const PatientDescription: React.FC<PatientDescriptionProps> = (p) => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-default-white p-6">
      {/* Info */}
      <div className="flex items-center">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src={p.image || "/patient.png"}
          alt={`${p.firstName} ${p.lastName}`}
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">
            {p.firstName} {p.lastName}
          </h1>
          <p className="text-gray-500">PESEL: {p.pesel}</p>
        </div>
      </div>

      <Line />

      <div className="flex gap-6">
        <div className="form-group mt-2 flex-grow-[1]">
          <PatientBasicInformationCard
            sex={p.sex}
            birthday={p.birthday}
            phoneNumber={p.phoneNumber}
            email={p.email}
          />
        </div>

        <div className="form-group mt-2 flex-grow-[1]">
          <PatientMedicalInformationCard
            bloodType={p.bloodType}
            allergies={p.allergies}
          />
        </div>
      </div>

      <div className="form-group mt-7">
        <PatientMedicalHistory medicalHistory={p.medicalHistory} />
      </div>
    </div>
  );
};

export default PatientDescription;
