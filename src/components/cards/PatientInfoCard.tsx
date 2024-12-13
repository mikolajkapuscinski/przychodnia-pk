import React from "react";

interface PatientInfoCardProps {
  icon: any;
  title: string;
  value: string;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="flex items-start space-x-3 rounded-lg bg-gray-50 py-2">
      <div className="text-gray-600">
        <img src={icon} className="mt-1 w-4"></img>
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};
