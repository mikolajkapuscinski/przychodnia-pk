import React from "react";
import { PatientInfoCard } from "./PatientInfoCard";

interface PatientBasicInformationCardProps {
  sex: string;
  birthday?: string;
  phoneNumber?: string;
  email: string;
}

const PatientBasicInformationCard: React.FC<
  PatientBasicInformationCardProps
> = (p) => {
  return (
    <div className="h-full rounded-2xl border border-default-gray p-5">
      <h2 className="text-lg font-bold">Basic Information</h2>
      <div className="">
        <PatientInfoCard icon="/sex.png" title="Sex" value={p.sex} />
        {p.birthday && (
          <PatientInfoCard
            icon="/callendar.png"
            title="Birthday"
            value={p.birthday}
          />
        )}
        {p.phoneNumber && (
          <PatientInfoCard
            icon="/phone-call.png"
            title="Phone"
            value={p.phoneNumber}
          />
        )}
        <PatientInfoCard icon="/email.png" title="Email" value={p.email} />
      </div>
    </div>
  );
};

export default PatientBasicInformationCard;
