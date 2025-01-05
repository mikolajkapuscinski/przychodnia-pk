import React from "react";

interface PatientMedicalHistoryProps {
  medicalHistory: { date: string | Date; diseaseName: string }[];
}

const PatientMedicalHistory: React.FC<PatientMedicalHistoryProps> = (p) => {
  return (
    <div className="rounded-2xl border border-default-gray p-5">
      <h2 className="text-lg font-bold">Medical History</h2>
      {p.medicalHistory.length > 0 ? (
        <ul>
          {p.medicalHistory.map((entry, index) => (
            <li key={index} className="rounded-lg bg-gray-50 pt-4">
              <p className="font-bold">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
              </p>
              <p>{entry.diseaseName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No medical history available.</p>
      )}
    </div>
  );
};

export default PatientMedicalHistory;
