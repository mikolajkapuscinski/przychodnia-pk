import React from "react";
import { PatientInfoCard } from "./PatientInfoCard";

interface PatientMedicalInformationCardProps {
  bloodType: string;
  allergies: string[];
}

const PatientMedicalInformationCard: React.FC<
  PatientMedicalInformationCardProps
> = (p) => {
  return (
    <div className="h-full rounded-2xl border border-default-gray p-5">
      <h2 className="text-lg font-bold">Medical Information</h2>
      {/* Blood Group */}
      <PatientInfoCard
        icon="/blood.png"
        title="Blood type"
        value={p.bloodType}
      />
      {/* Allergies */}
      <div>
        <h2 className="text-lg font-bold">Allergies</h2>
        {p.allergies.length > 0 ? (
          <div>
            {p.allergies.map((allergy, index) => (
              <PatientInfoCard
                key={index}
                icon="/allergies.png"
                title={`Diagnosed 2003-12-12`}
                value={allergy}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No known allergies.</p>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalInformationCard;
