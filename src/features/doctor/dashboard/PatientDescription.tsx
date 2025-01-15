import React from "react";
import { Line } from "~/components/forms/Line";
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
  image?: string;
  medicalHistory: {
    id: number;
    date: string | Date;
    diseaseName: string;
    recoveryDate: string | Date;
  }[];
  bloodType?: string;
  allergies: string[];
  closeDialog: () => void;
}

const calculateBirthdayFromPesel = (pesel: string): string => {
  const yearBase =
    Math.floor(parseInt(pesel.slice(2, 4), 10) / 20) * 100 + 1900;
  const year = yearBase + parseInt(pesel.slice(0, 2), 10);
  const month = parseInt(pesel.slice(2, 4), 10) % 20;
  const day = parseInt(pesel.slice(4, 6), 10);

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export const PatientDescription: React.FC<PatientDescriptionProps> = (p) => {
  const birthday = calculateBirthdayFromPesel(p.pesel);

  return (
    <div className="mx-auto min-w-[420px] rounded-2xl bg-default-white p-6 lg:min-w-[896px]">
      {/* Info */}
      <div className="flex items-center">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src={p.image ?? "/patient.png"}
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

      <div className="lg:flex lg:gap-6">
        <div className="form-group mt-2 flex-grow-[1]">
          <PatientBasicInformationCard
            sex={p.sex}
            birthday={birthday}
            phoneNumber={p.phoneNumber == null ? "-" : p.phoneNumber}
            email={p.email}
          />
        </div>

        <div className="form-group mt-2 flex-grow-[1]">
          <PatientMedicalInformationCard
            bloodType={p.bloodType == null ? "-" : p.bloodType}
            allergies={p.allergies}
          />
        </div>
      </div>

      <div className="form-group mt-7">
        <PatientMedicalHistory
          medicalHistory={p.medicalHistory}
          closeDialog={p.closeDialog}
        />
      </div>
    </div>
  );
};

export default PatientDescription;
